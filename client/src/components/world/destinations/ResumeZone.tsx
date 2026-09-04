import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ResumeZone: React.FC = () => {
  const vaultRef = useRef<THREE.Group>(null);
  const docRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (vaultRef.current) {
      vaultRef.current.position.y = 0.4 + Math.sin(t * 0.85) * 0.05;
      vaultRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group position={[12.0, 0, 8.0]}>
      {/* Submerged Circular Plinth */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[1.8, 2.1, 0.25, 20]} />
        <meshStandardMaterial color="#0f1116" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Floating Document Vault Artifact */}
      <group ref={vaultRef}>
        {/* Outer Carbon Frame Cage */}
        <mesh>
          <boxGeometry args={[1.4, 1.8, 0.35]} />
          <meshStandardMaterial
            color="#14171e"
            roughness={0.3}
            metalness={0.8}
            wireframe
          />
        </mesh>

        {/* Central Verified Record Tablet */}
        <mesh ref={docRef} position={[0, 0, 0]}>
          <boxGeometry args={[1.0, 1.4, 0.08]} />
          <meshStandardMaterial
            color="#222836"
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>

        {/* Crisp Bone / Off-White Line Accents on Tablet */}
        {[-0.35, 0, 0.35].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0.045]}>
            <planeGeometry args={[0.7, 0.06]} />
            <meshBasicMaterial color="#f0ece1" transparent opacity={0.7} />
          </mesh>
        ))}

        {/* Crimson Seal Badge */}
        <mesh position={[0, -0.5, 0.046]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#d6483e" />
        </mesh>
      </group>

      <pointLight position={[0, 1.4, 0.8]} color="#ff4a38" intensity={1.5} distance={4.0} />
      <pointLight position={[0, -0.2, -0.8]} color="#fff5ea" intensity={0.8} distance={3.0} />
    </group>
  );
};
