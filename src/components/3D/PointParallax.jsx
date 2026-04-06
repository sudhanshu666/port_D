import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

export default function PointParallax() {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  // Create 1000 random points
  const particles = useMemo(() => {
    const temp = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 15; // X
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      temp[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
    }
    return temp;
  }, []);

  useFrame((state) => {
    // Subtle float animation
    const t = state.clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.y = t;
    meshRef.current.rotation.x = t * 0.5;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particles.length / 3} 
          array={particles} 
          itemSize={3} 
        />
      </bufferGeometry>
      {/* Black particles for the white background */}
      <pointsMaterial 
        size={0.05} 
        color="#000000" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
      />
    </points>
  );
}