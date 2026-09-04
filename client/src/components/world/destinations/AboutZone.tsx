import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AboutZone: React.FC = () => {
  const monolithRef = useRef<THREE.Group>(null);
  const corePylonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (corePylonRef.current) {
      corePylonRef.current.position.y = 1.4 + Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <group position={[-12.2, 0, -6.0]}>
      {/* 1. Monolithic Architectural Basalt Stele */}
      <group ref={monolithRef}>
        {/* Main Monolith Slab */}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[1.8, 3.8, 0.45]} />
          <meshStandardMaterial color="#161920" roughness={0.35} metalness={0.7} />
        </mesh>

        {/* Vertical Center Slit Light Channel */}
        <mesh position={[0, 1.6, 0.23]}>
          <planeGeometry args={[0.08, 3.4]} />
          <meshBasicMaterial color="#d6483e" />
        </mesh>
        <pointLight position={[0, 1.8, 0.4]} color="#ff4a38" intensity={1.5} distance={3.0} />

        {/* Precision Framing Bevels */}
        <mesh position={[0.95, 1.6, 0]}>
          <boxGeometry args={[0.04, 3.8, 0.47]} />
          <meshStandardMaterial color="#323846" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.95, 1.6, 0]}>
          <boxGeometry args={[0.04, 3.8, 0.47]} />
          <meshStandardMaterial color="#323846" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* 3D Geometric Identity Seal Plate */}
        <group position={[0, 2.3, 0.25]}>
          <mesh>
            <boxGeometry args={[0.65, 0.65, 0.04]} />
            <meshStandardMaterial color="#101216" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh scale={1.02}>
            <boxGeometry args={[0.65, 0.65, 0.04]} />
            <meshBasicMaterial color="#d6483e" wireframe transparent opacity={0.6} />
          </mesh>
          {/* Inner AG Geometric Core */}
          <mesh position={[0, 0, 0.03]}>
            <octahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#f0ece1" metalness={0.7} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* 2. Submerged Reflection Basin Foundation */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[2.4, 2.8, 0.3, 16]} />
        <meshStandardMaterial color="#0d0f14" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Flanking Architectural Light Fins */}
      {[-1.8, 1.8].map((x, i) => (
        <group key={i} position={[x, 0.6, -0.4]}>
          <mesh>
            <boxGeometry args={[0.15, 2.2, 0.3]} />
            <meshStandardMaterial color="#1a1d24" metalness={0.75} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.16]}>
            <planeGeometry args={[0.03, 1.8]} />
            <meshBasicMaterial color="#f0ece1" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
