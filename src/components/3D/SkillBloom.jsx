import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: "Python", pos: [-3, 2, 0] },
  { name: "C Programming", pos: [3, -1, 0] },
  { name: "DBMS", pos: [0, 3, -2] },
  { name: "Data Structures", pos: [-2, -3, 1] },
  { name: "Linux", pos: [4, 3, -1] }
];

function SkillNode({ name, position }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    mesh.current.rotation.y += 0.01;
    const targetScale = hovered ? 2.8 : 1.2;
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 0.1));
  });

  return (
    <group position={position}>
      <mesh ref={mesh} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color={hovered ? "#ffffff" : "#333333"} wireframe />
      </mesh>
      {hovered && (
        <Html distanceFactor={8}>
          <div className="bg-white text-black px-4 py-1 font-mono text-[10px] font-bold uppercase border border-black whitespace-nowrap">
            {name} [cite: 28, 29, 32, 33]
          </div>
        </Html>
      )}
    </group>
  );
}

export default function SkillBloom() {
  return <group>{skills.map((s, i) => <SkillNode key={i} {...s} />)}</group>;
}