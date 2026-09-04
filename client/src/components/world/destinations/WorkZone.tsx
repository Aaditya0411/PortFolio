import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorld } from '@/contexts/WorldStateContext';

export const WorkZone: React.FC = () => {
  const { selectedProjectId, setSelectedProjectId, openCaseStudy } = useWorld();

  const revixRef = useRef<THREE.Group>(null);
  const bnbreezeRef = useRef<THREE.Group>(null);
  const aicteRef = useRef<THREE.Group>(null);
  const lotteryRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (revixRef.current) {
      revixRef.current.position.y = 0.3 + Math.sin(t * 0.9) * 0.06;
      revixRef.current.rotation.y = t * 0.15;
    }
    if (bnbreezeRef.current) {
      bnbreezeRef.current.position.y = 0.25 + Math.sin(t * 0.8 + 1) * 0.05;
      bnbreezeRef.current.rotation.y = t * 0.12;
    }
    if (aicteRef.current) {
      aicteRef.current.position.y = 0.35 + Math.sin(t * 1.0 + 2) * 0.06;
      aicteRef.current.rotation.y = t * 0.18;
    }
    if (lotteryRef.current) {
      lotteryRef.current.position.y = 0.3 + Math.sin(t * 1.1 + 3) * 0.07;
      lotteryRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. REVIX VCS STRUCTURE (Coordinate [3.0, 0, -22.0]) */}
      <group
        position={[3.0, 0, -22.0]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProjectId('01');
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.2, 16]} />
          <meshStandardMaterial color="#101216" roughness={0.5} metalness={0.6} />
        </mesh>
        <group ref={revixRef}>
          {/* Main Trunk Commit Bar */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.6, 0.1, 0.1]} />
            <meshStandardMaterial color="#353b49" metalness={0.8} />
          </mesh>
          {/* Commit Nodes */}
          {[-0.6, 0, 0.6].map((x, i) => (
            <mesh key={i} position={[x, 0.4, 0]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial color={i === 1 ? '#d6483e' : '#f0ece1'} metalness={0.8} />
            </mesh>
          ))}
          {/* Branching Arc */}
          <mesh position={[0, 0.8, 0.3]} rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.5, 0.025, 6, 24, Math.PI]} />
            <meshBasicMaterial color="#d6483e" />
          </mesh>
          <mesh position={[0.4, 1.1, 0.3]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshBasicMaterial color="#d6483e" />
          </mesh>
        </group>
        <pointLight position={[0, 1.2, 0]} color="#d6483e" intensity={1.2} distance={3.5} />
      </group>

      {/* 2. BNBREEZE ARCHITECTURAL PAVILION (Coordinate [8.0, 0, -24.0]) */}
      <group
        position={[8.0, 0, -24.0]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProjectId('02');
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <mesh position={[0, -0.65, 0]}>
          <boxGeometry args={[2.8, 0.2, 2.8]} />
          <meshStandardMaterial color="#11141a" roughness={0.5} metalness={0.6} />
        </mesh>
        <group ref={bnbreezeRef}>
          {/* Isometric Pavilion Base Slab */}
          <mesh position={[0, 0.2, 0]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[1.2, 0.1, 1.2]} />
            <meshStandardMaterial color="#222834" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Pavilion Columns */}
          {[-0.4, 0.4].map((x) =>
            [-0.4, 0.4].map((z, zi) => (
              <mesh key={`${x}-${zi}`} position={[x, 0.7, z]}>
                <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
                <meshStandardMaterial color="#e5ecf4" metalness={0.85} roughness={0.15} />
              </mesh>
            ))
          )}
          {/* Canopy Roof Slab */}
          <mesh position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[1.3, 0.08, 1.3]} />
            <meshStandardMaterial color="#d6483e" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
        <pointLight position={[0, 1.5, 0]} color="#fff5ea" intensity={1.1} distance={3.5} />
      </group>

      {/* 3. AICTE BLOCKCHAIN DOCUMENT INTEGRITY (Coordinate [13.0, 0, -21.0]) */}
      <group
        position={[13.0, 0, -21.0]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProjectId('03');
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.2, 16]} />
          <meshStandardMaterial color="#101318" roughness={0.5} metalness={0.6} />
        </mesh>
        <group ref={aicteRef}>
          {/* Cryptographic Document Tablet */}
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[0.9, 1.2, 0.12]} />
            <meshStandardMaterial color="#1a202c" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* SHA-256 Ledger Ring */}
          <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.75, 0.02, 6, 28]} />
            <meshBasicMaterial color="#d6483e" transparent opacity={0.7} />
          </mesh>
          {/* Verification Nodes */}
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.75, 0.7, Math.sin(angle) * 0.75]}
            >
              <boxGeometry args={[0.09, 0.09, 0.09]} />
              <meshStandardMaterial color="#f0ece1" metalness={0.9} />
            </mesh>
          ))}
        </group>
        <pointLight position={[0, 1.3, 0]} color="#ff4a38" intensity={1.3} distance={3.5} />
      </group>

      {/* 4. LOTTERY SMART CONTRACT (Coordinate [18.0, 0, -18.0]) */}
      <group
        position={[18.0, 0, -18.0]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProjectId('04');
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.2, 16]} />
          <meshStandardMaterial color="#0e1116" roughness={0.5} metalness={0.6} />
        </mesh>
        <group ref={lotteryRef}>
          {/* Ethereum-Inspired Dual Diamond */}
          <mesh position={[0, 0.85, 0]}>
            <octahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial color="#242b3b" metalness={0.85} roughness={0.2} flatShading />
          </mesh>
          {/* Wireframe Facet Highlight */}
          <mesh position={[0, 0.85, 0]} scale={1.02}>
            <octahedronGeometry args={[0.55, 0]} />
            <meshBasicMaterial color="#d6483e" wireframe transparent opacity={0.5} />
          </mesh>
          {/* Surrounding Transaction Matrix Ring */}
          <mesh position={[0, 0.85, 0]} rotation={[0.5, 0, 0]}>
            <torusGeometry args={[0.85, 0.015, 6, 24]} />
            <meshBasicMaterial color="#f0ece1" transparent opacity={0.4} />
          </mesh>
        </group>
        <pointLight position={[0, 1.4, 0]} color="#d6483e" intensity={1.3} distance={3.5} />
      </group>
    </group>
  );
};
