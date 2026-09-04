import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MILESTONES = [
  { year: '2024', label: 'MERN', zOffset: -2.2, height: 2.2, color: '#8d95a5' },
  { year: '2026', label: 'JPMORGAN', zOffset: 0.0, height: 3.1, color: '#d6483e' },
  { year: '2028', label: 'B.TECH', zOffset: 2.2, height: 2.6, color: '#e5ecf4' },
];

export const ExperienceZone: React.FC = () => {
  const pierRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pierRef.current) return;
    pierRef.current.position.y = Math.sin(t * 0.75) * 0.03;
  });

  return (
    <group ref={pierRef} position={[16.0, 0, -4.0]}>
      {/* Stone Nautical Pier Foundation */}
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[2.2, 0.35, 7.8]} />
        <meshStandardMaterial color="#13161c" roughness={0.65} metalness={0.4} />
      </mesh>

      {/* Pier Guide Track */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[0.06, 0.04, 7.4]} />
        <meshBasicMaterial color="#d6483e" transparent opacity={0.5} />
      </mesh>

      {/* 3 Milestone Obelisks */}
      {MILESTONES.map((m, idx) => (
        <group key={idx} position={[0, 0, m.zOffset]}>
          {/* Obelisk Body */}
          <mesh position={[0, m.height / 2 - 0.5, 0]}>
            <boxGeometry args={[0.5, m.height, 0.5]} />
            <meshStandardMaterial color="#1b1f28" roughness={0.35} metalness={0.7} />
          </mesh>

          {/* Precision Cap Pyramid */}
          <mesh position={[0, m.height - 0.25, 0]}>
            <coneGeometry args={[0.38, 0.5, 4]} />
            <meshStandardMaterial color="#2f3646" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Milestone Indicator Beam */}
          <mesh position={[0, m.height / 2 - 0.5, 0.26]}>
            <planeGeometry args={[0.04, m.height * 0.7]} />
            <meshBasicMaterial color={m.color} />
          </mesh>

          {/* Top Marker Beacon */}
          <mesh position={[0, m.height + 0.05, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={m.color} />
          </mesh>
        </group>
      ))}

      <pointLight position={[0, 2.5, 0]} color="#fff5ea" intensity={1.4} distance={6.0} />
    </group>
  );
};
