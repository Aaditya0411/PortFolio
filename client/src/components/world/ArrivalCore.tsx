import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ArrivalCore: React.FC = () => {
  const coreRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const stardustRef = useRef<THREE.Points>(null);
  const shardsGroup = useRef<THREE.Group>(null);

  // Stardust motes orbiting the quantum core
  const [stardustGeo] = useMemo(() => {
    const count = 54;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const angle = (i / count) * Math.PI * 2;
      const r = 1.05 + Math.random() * 0.8;
      positions[idx] = Math.cos(angle) * r;
      positions[idx + 1] = (Math.random() - 0.5) * 1.4;
      positions[idx + 2] = Math.sin(angle) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return [geo];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!coreRef.current) return;

    // Harmonic floating bob and gentle precession
    coreRef.current.position.y = 0.65 + Math.sin(t * 0.75) * 0.08;
    coreRef.current.rotation.y = t * 0.16;
    coreRef.current.rotation.z = Math.sin(t * 0.4) * 0.04;

    // Inner hyper-core harmonic pulsation
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.45;
      innerCoreRef.current.rotation.x = t * 0.3;
      const pulse = 0.34 + Math.sin(t * 2.2) * 0.04;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.2;
    if (ring2Ref.current) ring2Ref.current.rotation.x = -t * 0.15;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.12;

    if (shardsGroup.current) {
      shardsGroup.current.rotation.y = t * 0.28;
      shardsGroup.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }

    if (stardustRef.current) {
      stardustRef.current.rotation.y = -t * 0.22;
      stardustRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group position={[2.1, 0.65, -1.2]}>
      <group ref={coreRef}>
        {/* 1. Translucent Precision Multi-Faceted Azure Crystal Shell */}
        <mesh>
          <octahedronGeometry args={[0.78, 0]} />
          <meshStandardMaterial
            color="#0284c7"
            roughness={0.08}
            metalness={0.3}
            transparent
            opacity={0.62}
            flatShading
            depthWrite={false}
          />
        </mesh>

        {/* 2. Polished Platinum & Cyan Facet Wireframe Cage */}
        <mesh scale={1.012}>
          <octahedronGeometry args={[0.78, 0]} />
          <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.68} />
        </mesh>

        {/* 3. Internal Pulsating Crimson Hyper-Core Singularity */}
        <mesh ref={innerCoreRef} scale={0.34}>
          <octahedronGeometry args={[0.78, 0]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Radiant Heart Point Light: Projects internal red glow outward through facets */}
        <pointLight color="#ef4444" intensity={3.8} distance={5.5} />

        {/* 4. Orbiting Miniature Crystal Shards */}
        <group ref={shardsGroup}>
          {[0, 1, 2, 3].map((i) => {
            const angle = (i / 4) * Math.PI * 2;
            const dist = 1.35;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * dist, Math.sin(angle * 2) * 0.3, Math.sin(angle) * dist]}
                scale={0.12}
                rotation={[i, i * 1.5, 0]}
              >
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.8} />
              </mesh>
            );
          })}
        </group>

        {/* 5. Gyroscopic Meridian Rings */}
        {/* Equatorial Precision Ring with Chrome Finish */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.18, 0.016, 8, 48]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.94} roughness={0.12} />
        </mesh>

        {/* Inclined Celestial Meridian Ring */}
        <mesh ref={ring2Ref} rotation={[0.55, 0.75, 0]}>
          <torusGeometry args={[1.34, 0.014, 8, 48]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.18} />
        </mesh>

        {/* Outer Glowing Cyan Ring */}
        <mesh ref={ring3Ref} rotation={[-0.4, 0.3, 0.5]}>
          <torusGeometry args={[1.52, 0.008, 6, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
        </mesh>

        {/* 6. Orbiting Stardust Motes */}
        <points ref={stardustRef} geometry={stardustGeo}>
          <pointsMaterial
            size={0.048}
            color="#38bdf8"
            transparent
            opacity={0.88}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      {/* Vertical Zenith Light Beam */}
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.018, 0.1, 10, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.14} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};
