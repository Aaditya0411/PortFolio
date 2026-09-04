import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorld } from '@/contexts/WorldStateContext';

export const WorldFisherman: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const rodRef = useRef<THREE.Group>(null);
  const { activeDestination } = useWorld();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Gentle aquatic boat rocking
    groupRef.current.position.y = -0.42 + Math.sin(t * 1.2) * 0.025;
    groupRef.current.rotation.z = Math.sin(t * 1.0) * 0.015;
    groupRef.current.rotation.x = Math.cos(t * 0.9) * 0.012;

    // Rod tip subtle flex and sway
    if (rodRef.current) {
      rodRef.current.rotation.x = -0.15 + Math.sin(t * 1.4) * 0.03;
      rodRef.current.rotation.z = 0.2 + Math.cos(t * 1.1) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[-1.4, -0.42, 0.4]}>
      {/* 1. Stylized Skiff Hull in Graphite */}
      <group position={[0, -0.1, 0]}>
        {/* Main keel */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.9, 0.28, 0.72]} />
          <meshStandardMaterial color="#1a1c22" roughness={0.42} metalness={0.6} />
        </mesh>
        {/* Bow rake */}
        <mesh position={[0.92, 0.08, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.42, 0.24, 0.65]} />
          <meshStandardMaterial color="#20242e" roughness={0.4} metalness={0.65} />
        </mesh>
        {/* Stern transom */}
        <mesh position={[-0.92, 0.08, 0]} rotation={[0, 0, 0.35]}>
          <boxGeometry args={[0.3, 0.24, 0.68]} />
          <meshStandardMaterial color="#181a20" roughness={0.45} metalness={0.55} />
        </mesh>
        {/* Waterline glowing edge trim */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[2.0, 0.02, 0.75]} />
          <meshBasicMaterial color="#d6483e" transparent opacity={0.35} />
        </mesh>
        {/* Bow lantern */}
        <group position={[1.05, 0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.05, 0.1, 8]} />
            <meshStandardMaterial color="#333742" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshBasicMaterial color="#ff5a43" />
          </mesh>
          <pointLight color="#ff5a43" intensity={1.2} distance={2.4} />
        </group>
      </group>

      {/* 2. Seated / Braced Fisherman Silhouette */}
      <group position={[-0.1, 0.28, 0]}>
        {/* Lower body / Legs */}
        <mesh position={[0.15, -0.06, 0]}>
          <boxGeometry args={[0.42, 0.28, 0.44]} />
          <meshStandardMaterial color="#15171d" roughness={0.65} metalness={0.2} />
        </mesh>

        {/* Torso in charcoal oilskin coat with graphite sheen */}
        <mesh position={[-0.04, 0.22, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.36, 0.46, 0.4]} />
          <meshStandardMaterial color="#222630" roughness={0.48} metalness={0.35} />
        </mesh>

        {/* Collar & Neck */}
        <mesh position={[-0.02, 0.48, 0]}>
          <cylinderGeometry args={[0.11, 0.13, 0.1, 10]} />
          <meshStandardMaterial color="#1a1d24" roughness={0.5} />
        </mesh>

        {/* Head / Face */}
        <mesh position={[-0.01, 0.58, 0]}>
          <sphereGeometry args={[0.12, 14, 14]} />
          <meshStandardMaterial color="#1a1d24" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Traditional Sou'wester Hat with high-contrast rim */}
        <group position={[-0.01, 0.65, 0]}>
          {/* Hat crown */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.09, 0.14, 0.12, 14]} />
            <meshStandardMaterial color="#171920" roughness={0.45} metalness={0.3} />
          </mesh>
          {/* Wide brim */}
          <mesh position={[-0.03, -0.01, 0]} rotation={[0.05, 0, -0.15]}>
            <cylinderGeometry args={[0.24, 0.25, 0.025, 16]} />
            <meshStandardMaterial color="#1e222b" roughness={0.4} metalness={0.4} />
          </mesh>
          {/* Silver/Off-white rim trim line for crisp rim lighting */}
          <mesh position={[-0.03, -0.01, 0]} rotation={[0.05, 0, -0.15]}>
            <ringGeometry args={[0.24, 0.255, 18]} />
            <meshBasicMaterial color="#e5ecf4" transparent opacity={0.85} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Arms holding the fishing rod */}
        {/* Right arm forward */}
        <mesh position={[0.2, 0.26, 0.18]} rotation={[0.4, 0.2, -0.5]}>
          <boxGeometry args={[0.1, 0.34, 0.1]} />
          <meshStandardMaterial color="#20242e" roughness={0.5} />
        </mesh>
        {/* Left arm stabilizing */}
        <mesh position={[0.06, 0.22, -0.18]} rotation={[-0.3, -0.2, -0.3]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#1c2028" roughness={0.5} />
        </mesh>

        {/* 3. High-Contrast Graphite Fishing Rod */}
        <group ref={rodRef} position={[0.3, 0.38, 0.12]} rotation={[-0.15, 0, 0.2]}>
          {/* Handle / Grip */}
          <mesh position={[-0.15, -0.12, 0]} rotation={[0, 0, -0.9]}>
            <cylinderGeometry args={[0.022, 0.026, 0.35, 8]} />
            <meshStandardMaterial color="#121418" roughness={0.8} />
          </mesh>

          {/* Baitcaster Reel */}
          <group position={[-0.05, 0.02, 0.04]}>
            <mesh>
              <boxGeometry args={[0.07, 0.06, 0.08]} />
              <meshStandardMaterial color="#4a5264" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* Crimson Spool Accent */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.06, 10]} />
              <meshBasicMaterial color="#d6483e" />
            </mesh>
          </group>

          {/* Long Graphite Rod Blank */}
          <mesh position={[0.8, 0.95, 0]} rotation={[0, 0, -0.9]}>
            <cylinderGeometry args={[0.008, 0.022, 2.5, 8]} />
            <meshStandardMaterial color="#505868" metalness={0.55} roughness={0.28} />
          </mesh>

          {/* Guide Rings along rod */}
          {[0.3, 0.8, 1.3, 1.8].map((dist, i) => (
            <mesh
              key={i}
              position={[dist * 0.62, dist * 0.74, 0]}
              rotation={[0, 0, -0.9]}
            >
              <torusGeometry args={[0.02 - i * 0.002, 0.004, 6, 12]} />
              <meshStandardMaterial color="#e5ecf4" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}

          {/* Glowing Rod Tip Beacon */}
          <group position={[1.58, 1.88, 0]}>
            <mesh>
              <sphereGeometry args={[0.03, 10, 10]} />
              <meshBasicMaterial color="#ff4a3a" />
            </mesh>
            <pointLight color="#ff4a3a" intensity={0.6} distance={1.2} />
          </group>
        </group>
      </group>
    </group>
  );
};
