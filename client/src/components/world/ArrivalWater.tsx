import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ArrivalWater: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Subdivided plane for physical undulating wave displacement
  const [geom, originalPositions] = useMemo(() => {
    const g = new THREE.PlaneGeometry(140, 140, 64, 64);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position.array;
    const orig = new Float32Array(pos.length);
    orig.set(pos);
    return [g, orig];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * 0.72;
    const pos = meshRef.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const x = originalPositions[i];
      const z = originalPositions[i + 2];

      // Gerstner-style multi-octave crest simulation
      const w1 = Math.sin(x * 0.2 + t * 1.1) * 0.075;
      const w2 = Math.cos(z * 0.16 + t * 0.85) * 0.06;
      const w3 = Math.sin((x * 0.65 + z * 0.75) * 0.18 + t * 0.65) * 0.045;
      const w4 = Math.sin((x - z) * 0.28 + t * 1.3) * 0.03;
      // Crest steepening exponent
      const totalWave = w1 + w2 + w3 + w4;
      const crest = totalWave > 0 ? Math.pow(totalWave, 1.25) : -Math.pow(Math.abs(totalWave), 0.9);

      arr[i + 1] = originalPositions[i + 1] + crest;
    }

    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <group position={[0, -0.72, 0]}>
      {/* 1. Primary undulating reflective water surface */}
      <mesh ref={meshRef} geometry={geom}>
        <meshStandardMaterial
          color="#0a1a2f"
          roughness={0.16}
          metalness={0.42}
        />
      </mesh>

      {/* 2. Soft water plane floor for depth absorption */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[160, 160]} />
        <meshBasicMaterial color="#020408" />
      </mesh>
    </group>
  );
};
