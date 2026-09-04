import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ArrivalCore: React.FC = () => {
  const coreRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!coreRef.current) return;

    // Slow, serene harmonic floating over distant water
    coreRef.current.position.y = 0.45 + Math.sin(t * 0.4) * 0.03;
    coreRef.current.rotation.y = t * 0.09;

    // Inner core gentle breathing
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.25;
      const pulse = 0.22 + Math.sin(t * 1.5) * 0.015;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    /* Placed in distant right background (z = -9.5), well below the celestial moon and clear of the fisherman */
    <group position={[4.8, 0.45, -9.5]}>
      <group ref={coreRef}>
        {/* Single Refined Geometric Motif: Translucent Azure Crystalline Octahedron */}
        <mesh>
          <octahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial
            color="#0284c7"
            roughness={0.2}
            metalness={0.4}
            transparent
            opacity={0.42}
            flatShading
            depthWrite={false}
          />
        </mesh>

        {/* Delicate Platinum-Cyan Facet Wireframe */}
        <mesh scale={1.01}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Subtle Internal Crimson Nucleus */}
        <mesh ref={innerCoreRef} scale={0.20}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Soft, non-distracting point glow */}
        <pointLight color="#ef4444" intensity={0.8} distance={2.5} />
      </group>
    </group>
  );
};
