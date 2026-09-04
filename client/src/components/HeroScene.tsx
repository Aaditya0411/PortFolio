// Adityagiri Goswami Portfolio: art-directed black-chrome geometry with signal-red seams.
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Float, Line, MeshTransmissionMaterial, OrbitControls, Sparkles } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function CoreAssembly() {
  const group = useRef<THREE.Group>(null);
  const seam = useRef<THREE.Mesh>(null);
  const slabs = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
    y: (i - 3) * 0.31,
    z: Math.sin(i * 0.8) * 0.24,
    r: (i - 3) * 0.12,
    s: 1 - Math.abs(i - 3) * 0.08,
  })), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.22 + state.clock.elapsedTime * 0.12, 3.5, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * -0.12, 3.5, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, state.pointer.x * 0.28, 3.5, delta);
    if (seam.current) seam.current.rotation.z += delta * 0.3;
  });

  return (
    <group ref={group} rotation={[0.2, -0.35, -0.12]}>
      <mesh rotation={[0, 0, 0.2]} castShadow receiveShadow>
        <octahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#262522" metalness={0.96} roughness={0.18} flatShading />
        <Edges threshold={12} color="#c6bdb2" linewidth={0.55} />
      </mesh>
      <mesh ref={seam} scale={[1.03, 1.03, 1.03]}>
        <torusGeometry args={[1.18, 0.012, 8, 4]} />
        <meshBasicMaterial color="#d6483e" toneMapped={false} />
      </mesh>
      {slabs.map((slab, i) => (
        <mesh key={i} position={[0, slab.y, slab.z]} rotation={[0.1, slab.r, slab.r]} scale={slab.s} castShadow>
          <boxGeometry args={[2.1, 0.17, 1.38]} />
          <meshStandardMaterial color={i === 3 ? '#47443f' : '#171715'} metalness={0.86} roughness={0.24} />
          <Edges threshold={12} color={i === 3 ? '#e2d8ce' : '#6d6860'} linewidth={0.42} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.54, 48]} />
        <MeshTransmissionMaterial backside thickness={0.35} roughness={0.15} chromaticAberration={0.02} anisotropy={0.2} color="#5b1513" />
      </mesh>
    </group>
  );
}

function OrbitLines() {
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 2.35, 1.06, 0, Math.PI * 2, false, 0).getPoints(80).map((p) => new THREE.Vector3(p.x, p.y * 0.45, 0)), []);
  return <Line points={points} color="#d6483e" transparent opacity={0.4} lineWidth={0.6} rotation={[0.2, 0.2, -0.35]} />;
}

export default function HeroScene({ compact = false }: { compact?: boolean }) {
  const [lowPower, setLowPower] = useState(compact);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 600px), (prefers-reduced-motion: reduce)');
    const update = () => setLowPower(compact || query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, [compact]);
  return (
    <Canvas frameloop="always" dpr={[1, lowPower ? 1.1 : 1.55]} camera={{ position: [0, 0, lowPower ? 6.2 : 5.4], fov: 34 }} shadows gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.16} />
      <spotLight position={[3, 4, 5]} intensity={7} angle={0.35} penumbra={0.8} color="#fff5ea" castShadow />
      <pointLight position={[-3, -1, 2]} intensity={3} color="#d6483e" />
      <pointLight position={[2, -2, -2]} intensity={2} color="#64707c" />
      <Float speed={0.7} rotationIntensity={0.2} floatIntensity={0.22}>
        <CoreAssembly />
      </Float>
      <OrbitLines />
      <Sparkles count={lowPower ? 12 : 42} scale={[5, 3.5, 3]} size={0.7} speed={0.16} color="#d4beb7" opacity={0.26} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
