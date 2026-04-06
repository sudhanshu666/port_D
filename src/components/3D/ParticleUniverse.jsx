import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  varying float vDistance;

  void main() {
    vec3 pos = position;
    
    // SMOOTH FORWARD MOVEMENT
    pos.z += uScroll * 0.15; 

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

    // SMOOTH REPULSION (Particles move out from mouse/touch)
    float dist = distance(modelPosition.xy, uMouse);
    float radius = 5.0;
    if (dist < radius) {
      float force = (radius - dist) / radius;
      // Exponential push for smoother "move out" effect
      vec2 dir = normalize(modelPosition.xy - uMouse);
      modelPosition.xy += dir * pow(force, 2.0) * 4.0;
    }

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = 45.0 * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
    vDistance = viewPosition.z;
  }
`;

const fragmentShader = `
  varying float vDistance;
  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - step(0.5, strength);
    
    // Soft fade as particles fly past the camera
    float alpha = smoothstep(10.0, -15.0, vDistance) * strength;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.6); 
  }
`;

export default function ParticleUniverse({ isProjectOpen }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  const smoothScroll = useRef(0);

  const particlesPosition = useMemo(() => {
    return new THREE.TorusGeometry(16, 4.5, 40, 200).attributes.position.array;
  }, []);

  const uniforms = useMemo(() => ({
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
  }), []);

  useFrame((state) => {
    const { mouse, clock } = state;
    
    // LERP: Catch up to scroll smoothly (0.05 factor for 60fps glide)
    const targetScroll = window.scrollY;
    smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, targetScroll, 0.05);
    
    const zoomSpeed = isProjectOpen ? 3.0 : 1.0;
    meshRef.current.material.uniforms.uScroll.value = smoothScroll.current * zoomSpeed;

    // Smooth Mouse movement
    const targetMouseX = (mouse.x * viewport.width) / 2;
    const targetMouseY = (mouse.y * viewport.height) / 2;
    meshRef.current.material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
      meshRef.current.material.uniforms.uMouse.value.x, targetMouseX, 0.1
    );
    meshRef.current.material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
      meshRef.current.material.uniforms.uMouse.value.y, targetMouseY, 0.1
    );

    // Constant 360 rotation
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={meshRef} position={[0, 0, -18]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesPosition.length / 3} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial 
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader} 
        uniforms={uniforms} 
        transparent 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}