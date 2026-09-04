import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ContactZone: React.FC = () => {
  const beaconRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pulseRef.current) {
      const s = 1.0 + Math.sin(t * 2.5) * 0.15;
      pulseRef.current.scale.set(s, s, s);
    }
    if (beaconRef.current) {
      beaconRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group position={[0.0, 0, 12.0]}>
      {/* Heavy Hexagonal Tower Base */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1.4, 1.9, 2.2, 6]} />
        <meshStandardMaterial color="#111318" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Mid Mast Spire */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 2.0, 6]} />
        <meshStandardMaterial color="#1a1e28" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Top Antenna Assembly */}
      <group ref={beaconRef} position={[0, 3.4, 0]}>
        {/* Revolving Dish Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.5, 0.02, 6, 24]} />
          <meshStandardMaterial color="#d6483e" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Pulsing Beacon Emitter Core */}
        <mesh ref={pulseRef}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshBasicMaterial color="#ff4438" />
        </mesh>
      </group>

      {/* Vertical Signal Beam extending upward */}
      <mesh position={[0, 7.5, 0]}>
        <cylinderGeometry args={[0.02, 0.04, 8.0, 8]} />
        <meshBasicMaterial color="#ff4a3a" transparent opacity={0.35} />
      </mesh>

      {/* 3 Surrounding Communication Terminal Pods */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
        <group
          key={i}
          position={[Math.cos(angle) * 2.5, -0.2, Math.sin(angle) * 2.5]}
        >
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.25, 0.3, 0.7, 8]} />
            <meshStandardMaterial color="#181c24" metalness={0.75} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.72, 0]}>
            <boxGeometry args={[0.15, 0.04, 0.15]} />
            <meshBasicMaterial color="#d6483e" />
          </mesh>
        </group>
      ))}

      <pointLight position={[0, 3.8, 0]} color="#ff4438" intensity={2.2} distance={8.0} />
    </group>
  );
};
