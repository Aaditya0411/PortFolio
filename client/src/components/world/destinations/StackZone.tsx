import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STACK_COLUMNS = [
  { label: 'LANG', pos: [-3.2, 0, 1.2], height: 2.8, color: '#d6483e' },
  { label: 'FRAME', pos: [-2.0, 0, -0.8], height: 3.4, color: '#e5ecf4' },
  { label: 'LIB', pos: [-0.8, 0, 1.8], height: 2.5, color: '#8d95a5' },
  { label: 'DB', pos: [0.4, 0, -0.4], height: 3.1, color: '#d6483e' },
  { label: 'WEB3', pos: [1.6, 0, 1.4], height: 3.6, color: '#f0ece1' },
  { label: 'CLOUD', pos: [2.8, 0, -0.6], height: 2.9, color: '#8d95a5' },
  { label: 'CORE', pos: [4.0, 0, 0.8], height: 3.2, color: '#d6483e' },
];

export const StackZone: React.FC = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!gridRef.current) return;
    // Gentle spatial breathing
    gridRef.current.position.y = Math.sin(t * 0.7) * 0.04;
  });

  return (
    <group ref={gridRef} position={[-8.0, 0, -22.0]}>
      {/* Central Base Foundation Grid */}
      <mesh position={[0.4, -0.7, 0.5]}>
        <boxGeometry args={[9.5, 0.2, 5.5]} />
        <meshStandardMaterial color="#0c0e12" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Foundation grid border */}
      <mesh position={[0.4, -0.58, 0.5]}>
        <boxGeometry args={[9.7, 0.04, 5.7]} />
        <meshBasicMaterial color="#d6483e" wireframe transparent opacity={0.25} />
      </mesh>

      {/* 7 Architectural Tech Monoliths */}
      {STACK_COLUMNS.map((col, idx) => (
        <group key={idx} position={col.pos as [number, number, number]}>
          {/* Main Monolith Body */}
          <mesh position={[0, col.height / 2 - 0.6, 0]}>
            <boxGeometry args={[0.55, col.height, 0.55]} />
            <meshStandardMaterial
              color="#171a22"
              roughness={0.35}
              metalness={0.7}
            />
          </mesh>

          {/* Precision Top Cap */}
          <mesh position={[0, col.height - 0.58, 0]}>
            <boxGeometry args={[0.62, 0.08, 0.62]} />
            <meshStandardMaterial color="#2d3340" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Vertical Glowing Circuit Trace */}
          <mesh position={[0, col.height / 2 - 0.6, 0.285]}>
            <planeGeometry args={[0.04, col.height * 0.82]} />
            <meshBasicMaterial color={col.color} transparent opacity={0.8} />
          </mesh>

          {/* Top Marker Node */}
          <mesh position={[0, col.height - 0.5, 0]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color={col.color} />
          </mesh>
        </group>
      ))}

      {/* Local Ambient Accent Lighting */}
      <pointLight position={[0.4, 2.5, 0.5]} color="#d6483e" intensity={1.8} distance={7.0} />
      <pointLight position={[-2.5, 2.0, 1.0]} color="#fff5ea" intensity={1.0} distance={5.0} />
    </group>
  );
};
