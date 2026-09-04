import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const OriginZone: React.FC = () => {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!coreRef.current) return;

    // Slow organic float and rotation
    coreRef.current.position.y = 0.25 + Math.sin(t * 0.9) * 0.08;
    coreRef.current.rotation.y = t * 0.25;

    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.35;
    if (ring2Ref.current) ring2Ref.current.rotation.x = -t * 0.28;
  });

  return (
    <group position={[0.6, 0.2, -0.8]}>
      <group ref={coreRef}>
        {/* Central Crystalline Precision Octahedron Core */}
        <mesh>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#1d212a"
            roughness={0.25}
            metalness={0.85}
            flatShading
          />
        </mesh>

        {/* Silver Edge Trim Overlay */}
        <mesh scale={1.01}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial color="#e5ecf4" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Internal Glowing Crimson Nucleus */}
        <mesh scale={0.24}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial color="#ff4438" />
        </mesh>
        <pointLight color="#ff4438" intensity={2.0} distance={3.5} />

        {/* Equatorial Structural Ring */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.82, 0.015, 6, 32]} />
          <meshStandardMaterial color="#4f586c" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Inclined Meridian Ring */}
        <mesh ref={ring2Ref} rotation={[0.4, 0.8, 0]}>
          <torusGeometry args={[0.95, 0.012, 6, 32]} />
          <meshStandardMaterial color="#353b49" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* 4 Technical Node Pins */}
        {[
          [0.9, 0, 0],
          [-0.9, 0, 0],
          [0, 0, 0.9],
          [0, 0, -0.9],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <mesh>
              <boxGeometry args={[0.06, 0.06, 0.06]} />
              <meshStandardMaterial color="#e5ecf4" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.06, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
              <meshBasicMaterial color="#ff4438" transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Floating navigation buoys around estuary */}
      {[-2.2, 2.8].map((x, i) => (
        <group key={i} position={[x, -0.6, i === 0 ? 1.8 : -2.5]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.14, 0.35, 8]} />
            <meshStandardMaterial color="#20242e" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#d6483e" />
          </mesh>
          <pointLight color="#d6483e" intensity={0.4} distance={1.5} />
        </group>
      ))}
    </group>
  );
};
