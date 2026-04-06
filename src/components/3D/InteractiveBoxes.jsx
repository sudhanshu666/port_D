import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function BoxNode({ position, color }) {
  const mesh = useRef();
  const [active, setActive] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Normal floating animation
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, active ? time * 10 : time * 0.5, 0.1);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, active ? time * 10 : time * 0.5, 0.1);
    
    // The "Boom" Scale effect
    const targetScale = active ? 3.5 : 1;
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 0.15));

    if (active && mesh.current.scale.x > 3.4) {
      setActive(false); // Reset boom after peak
    }
  });

  return (
    <mesh position={position} ref={mesh} onClick={() => setActive(true)}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial 
        color={color} 
        wireframe 
        emissive={color} 
        emissiveIntensity={active ? 5 : 0.5} 
      />
    </mesh>
  );
}

export default function InteractiveBoxes() {
  return (
    <>
      <BoxNode position={[-4, 0, 0]} color="#444444" />
      <BoxNode position={[0, 0, 0]} color="#666666" />
      <BoxNode position={[4, 0, 0]} color="#888888" />
    </>
  );
}