import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ArrivalAtmosphere: React.FC = () => {
  const mist1Ref = useRef<THREE.Mesh>(null);
  const mist2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate 140 atmospheric bioluminescent firefly particles drifting over the estuary
  const [particleGeo, originalY] = useMemo(() => {
    const count = 140;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const origY = new Float32Array(count);

    const amber = new THREE.Color('#f59e0b');
    const cyan = new THREE.Color('#38bdf8');
    const white = new THREE.Color('#e0e8f8');

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Spread across x [-14, 14], y [-0.4, 3.5], z [-16, 6]
      positions[idx] = (Math.random() - 0.5) * 28;
      const y = -0.3 + Math.random() * 3.8;
      positions[idx + 1] = y;
      origY[i] = y;
      positions[idx + 2] = -16 + Math.random() * 22;

      // Color variation
      const rand = Math.random();
      const col = rand > 0.6 ? amber : rand > 0.25 ? cyan : white;
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return [geo, origY];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mist1Ref.current) {
      mist1Ref.current.position.x = Math.sin(t * 0.12) * 2.2;
      mist1Ref.current.rotation.z = t * 0.015;
    }
    if (mist2Ref.current) {
      mist2Ref.current.position.z = Math.cos(t * 0.1) * 1.8;
      mist2Ref.current.rotation.z = -t * 0.012;
    }

    // Organic harmonic floating of atmospheric motes
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < originalY.length; i++) {
        const idx = i * 3;
        arr[idx + 1] = originalY[i] + Math.sin(t * 0.8 + i * 0.4) * 0.18;
        arr[idx] += Math.sin(t * 0.3 + i) * 0.002;
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Low-lying Atmospheric Ground Mist Layers */}
      <mesh ref={mist1Ref} position={[0, -0.45, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="#0e1726"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={mist2Ref} position={[-2, -0.38, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          color="#08101d"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Floating Atmospheric Bioluminescent Firefly Motes */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 3. Celestial Starfield in the Deep Night Sky */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              useMemo(() => {
                const count = 180;
                const pos = new Float32Array(count * 3);
                for (let i = 0; i < count; i++) {
                  pos[i * 3] = (Math.random() - 0.5) * 45;
                  pos[i * 3 + 1] = 1.0 + Math.random() * 18;
                  pos[i * 3 + 2] = -22 - Math.random() * 12;
                }
                return pos;
              }, []),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#dbeafe"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4. Horizon Twilight Atmosphere Gradient Band */}
      <mesh position={[0, -0.1, -24]}>
        <planeGeometry args={[140, 4.0]} />
        <meshBasicMaterial color="#081322" transparent opacity={0.85} />
      </mesh>

      {/* 5. Celestial Moon Disc & Luminous Corona Bloom */}
      <group position={[4.6, 4.2, -22]}>
        {/* Sharp Luminous Moon Sphere */}
        <mesh>
          <sphereGeometry args={[1.35, 32, 32]} />
          <meshBasicMaterial color="#f0f7ff" />
        </mesh>
        {/* Inner Soft Blue Corona Halo */}
        <mesh scale={1.3}>
          <sphereGeometry args={[1.35, 24, 24]} />
          <meshBasicMaterial color="#93c5fd" transparent opacity={0.32} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Outer Radiant Atmospheric Bloom */}
        <mesh scale={2.4}>
          <sphereGeometry args={[1.35, 24, 24]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.14} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
};
