import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Helper to create soft circular point texture so particles are organic embers/stars, not square pixels
function createSoftCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 31);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.7)');
    grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.15)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 31, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Helper to create ethereal radial corona glow for celestial moon
function createCoronaGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 127);
    grad.addColorStop(0, 'rgba(125, 211, 252, 0.55)');
    grad.addColorStop(0.25, 'rgba(56, 189, 248, 0.28)');
    grad.addColorStop(0.6, 'rgba(14, 116, 144, 0.09)');
    grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(128, 128, 127, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export const ArrivalAtmosphere: React.FC = () => {
  const mist1Ref = useRef<THREE.Mesh>(null);
  const mist2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Soft circle texture for organic embers and stars (eliminates square pixel artifact)
  const circleTexture = useMemo(() => createSoftCircleTexture(), []);
  const coronaTexture = useMemo(() => createCoronaGlowTexture(), []);

  // Generate 24 subtle atmospheric starlight embers drifting over the estuary
  const [particleGeo, originalY] = useMemo(() => {
    const count = 24;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const origY = new Float32Array(count);

    const amber = new THREE.Color('#f59e0b');
    const cyan = new THREE.Color('#38bdf8');
    const white = new THREE.Color('#e0e8f8');

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 26;
      const y = -0.15 + Math.random() * 2.8;
      positions[idx + 1] = y;
      origY[i] = y;
      positions[idx + 2] = -14 + Math.random() * 18;

      const rand = Math.random();
      const col = rand > 0.65 ? amber : rand > 0.3 ? cyan : white;
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

    // Gentle harmonic floating of atmospheric embers
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < originalY.length; i++) {
        const idx = i * 3;
        arr[idx + 1] = originalY[i] + Math.sin(t * 0.7 + i * 0.45) * 0.12;
        arr[idx] += Math.sin(t * 0.25 + i) * 0.0012;
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
          color="#060d18"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={mist2Ref} position={[-2, -0.38, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          color="#040810"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Floating Atmospheric Bioluminescent Embers (Circular, Subtle & Sparse) */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.045}
          map={circleTexture}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 3. Celestial Starfield in the Deep Night Sky (Circular & Subtle) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              useMemo(() => {
                const count = 45;
                const pos = new Float32Array(count * 3);
                for (let i = 0; i < count; i++) {
                  pos[i * 3] = (Math.random() - 0.5) * 45;
                  pos[i * 3 + 1] = 1.0 + Math.random() * 16;
                  pos[i * 3 + 2] = -22 - Math.random() * 10;
                }
                return pos;
              }, []),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          map={circleTexture}
          color="#bae6fd"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 4. Horizon Twilight Atmosphere Gradient Band */}
      <mesh position={[0, -0.1, -24]}>
        <planeGeometry args={[140, 4.0]} />
        <meshBasicMaterial color="#030814" transparent opacity={0.9} />
      </mesh>

      {/* 5. Celestial Moon & Atmospheric Corona */}
      {/* Positioned high in the upper-right sky with generous breathing room */}
      <group position={[5.2, 3.2, -22]}>
        {/* Soft Pearlescent Celestial Lunar Body */}
        <mesh>
          <sphereGeometry args={[1.05, 32, 32]} />
          <meshStandardMaterial
            color="#f8fafc"
            emissive="#bae6fd"
            emissiveIntensity={0.55}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>

        {/* Ethereal Smooth Corona Glow (Planar Radial Falloff - No Hard Spherical Edge) */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[7.0, 7.0]} />
          <meshBasicMaterial
            map={coronaTexture}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};
