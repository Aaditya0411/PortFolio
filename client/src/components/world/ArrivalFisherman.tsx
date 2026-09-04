import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ArrivalFisherman: React.FC = () => {
  const boatGroup = useRef<THREE.Group>(null);
  const rodRef = useRef<THREE.Group>(null);
  const tipRef = useRef<THREE.Group>(null);
  const bobberRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Line>(null);
  const rippleRef = useRef<THREE.Mesh>(null);
  const ripple2Ref = useRef<THREE.Mesh>(null);

  // Buffer geometry and line object for dynamic line tracking
  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#f0f9ff',
    transparent: true,
    opacity: 0.9,
  }), []);

  const lineObj = useMemo(() => new THREE.Line(lineGeo, lineMat), [lineGeo, lineMat]);

  const v1 = useMemo(() => new THREE.Vector3(), []);
  const v2 = useMemo(() => new THREE.Vector3(), []);
  const invMat = useMemo(() => new THREE.Matrix4(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!boatGroup.current) return;

    // Organic aquatic bobbing & rolling synced with water waves
    boatGroup.current.position.y = -0.54 + Math.sin(t * 1.1) * 0.035;
    boatGroup.current.rotation.z = Math.sin(t * 0.9) * 0.022;
    boatGroup.current.rotation.x = Math.cos(t * 0.8) * 0.016;

    // Gentle rod tip harmonic breathing
    if (rodRef.current) {
      rodRef.current.rotation.x = -0.05 + Math.cos(t * 1.1) * 0.01;
      rodRef.current.rotation.z = 0.04 + Math.sin(t * 0.95) * 0.012;
    }

    // Dynamic line tracking from rod tip to water bobber
    if (lineRef.current && tipRef.current && bobberRef.current) {
      tipRef.current.getWorldPosition(v1);
      bobberRef.current.getWorldPosition(v2);

      invMat.copy(boatGroup.current.matrixWorld).invert();
      v1.applyMatrix4(invMat);
      v2.applyMatrix4(invMat);

      const pos = lineRef.current.geometry.attributes.position;
      const arr = pos.array as Float32Array;
      arr[0] = v1.x; arr[1] = v1.y; arr[2] = v1.z;
      arr[3] = v2.x; arr[4] = v2.y; arr[5] = v2.z;
      pos.needsUpdate = true;
    }

    // Concentric aquatic ripples around the glowing water bobber
    if (rippleRef.current) {
      const s1 = 1 + ((t * 0.65) % 1.6);
      rippleRef.current.scale.set(s1, s1, 1);
      (rippleRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.4 - (s1 - 1) * 0.25);
    }
    if (ripple2Ref.current) {
      const s2 = 1 + (((t * 0.65) + 0.8) % 1.6);
      ripple2Ref.current.scale.set(s2, s2, 1);
      (ripple2Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.4 - (s2 - 1) * 0.25);
    }
  });

  return (
    <group ref={boatGroup} position={[-0.45, -0.54, -0.5]} rotation={[0, 0.38, 0]}>
      {/* Rim light dedicated to fisherman silhouette separation */}
      <pointLight position={[-0.6, 1.4, -0.8]} color="#7dd3fc" intensity={2.4} distance={4.2} />

      {/* =========================================================================
          1. HANDCRAFTED WOODEN MARITIME DORY SKIFF
          ========================================================================= */}
      <group position={[0, 0, 0]}>
        {/* Main Tapered Keel Planking */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[2.3, 0.06, 0.42]} />
          <meshStandardMaterial color="#1a140e" roughness={0.7} metalness={0.12} />
        </mesh>

        {/* Inner Floorboards (Weathered Teak) */}
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[2.0, 0.02, 0.5]} />
          <meshStandardMaterial color="#2d2218" roughness={0.62} metalness={0.15} />
        </mesh>

        {/* Port Hull Flared Strake */}
        <mesh position={[0, 0.06, 0.31]} rotation={[0.28, 0, 0]}>
          <boxGeometry args={[2.2, 0.24, 0.06]} />
          <meshStandardMaterial color="#382a1e" roughness={0.55} metalness={0.18} />
        </mesh>

        {/* Starboard Hull Flared Strake */}
        <mesh position={[0, 0.06, -0.31]} rotation={[-0.28, 0, 0]}>
          <boxGeometry args={[2.2, 0.24, 0.06]} />
          <meshStandardMaterial color="#382a1e" roughness={0.55} metalness={0.18} />
        </mesh>

        {/* Curved Bow Stem Post (Cleanly Tapered Front) */}
        <mesh position={[1.15, 0.1, 0]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[0.18, 0.28, 0.34]} />
          <meshStandardMaterial color="#423224" roughness={0.5} metalness={0.2} />
        </mesh>

        {/* Stern Transom Quarterdeck Board (Flush with side strakes) */}
        <mesh position={[-1.05, 0.07, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.08, 0.22, 0.58]} />
          <meshStandardMaterial color="#2c2117" roughness={0.6} metalness={0.15} />
        </mesh>

        {/* Solid Teak Polished Gunwales / Rim Rails */}
        <mesh position={[0.02, 0.17, 0.34]}>
          <boxGeometry args={[2.14, 0.035, 0.05]} />
          <meshStandardMaterial color="#4a392a" roughness={0.4} metalness={0.25} />
        </mesh>
        <mesh position={[0.02, 0.17, -0.34]}>
          <boxGeometry args={[2.14, 0.035, 0.05]} />
          <meshStandardMaterial color="#4a392a" roughness={0.4} metalness={0.25} />
        </mesh>

        {/* Wooden Thwart Bench (Fisherman's Seat) */}
        <mesh position={[-0.15, 0.06, 0]}>
          <boxGeometry args={[0.34, 0.04, 0.62]} />
          <meshStandardMaterial color="#3d2f22" roughness={0.5} metalness={0.18} />
        </mesh>

        {/* Rested Wooden Oar along Starboard Gunwale */}
        <group position={[0.05, 0.19, -0.28]} rotation={[0.04, 0.02, 0.02]}>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.011, 0.013, 1.6, 8]} />
            <meshStandardMaterial color="#423326" roughness={0.45} />
          </mesh>
          <mesh position={[-0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.01, 0.22, 0.065]} />
            <meshStandardMaterial color="#35281e" roughness={0.45} />
          </mesh>
        </group>

        {/* Coiled Mooring Rope at Bow */}
        <mesh position={[0.92, 0.02, 0.08]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.08, 0.025, 6, 16]} />
          <meshStandardMaterial color="#6b5b48" roughness={0.9} />
        </mesh>

        {/* Polished Brass Oarlock Fittings */}
        <mesh position={[-0.15, 0.2, 0.35]}>
          <cylinderGeometry args={[0.014, 0.014, 0.06, 8]} />
          <meshStandardMaterial color="#eab308" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[-0.15, 0.2, -0.35]}>
          <cylinderGeometry args={[0.014, 0.014, 0.06, 8]} />
          <meshStandardMaterial color="#eab308" metalness={0.92} roughness={0.18} />
        </mesh>

        {/* =========================================================================
            WARM GOLDEN BOW HURRICANE LANTERN
            ========================================================================= */}
        <group position={[1.18, 0.32, 0]}>
          {/* Brass Davit Post Bracket */}
          <mesh position={[-0.04, -0.1, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.22, 6]} />
            <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Brass Lantern Base & Cap */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.042, 0.058, 0.14, 10]} />
            <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.18} />
          </mesh>
          {/* Curved Brass Wire Handle */}
          <mesh position={[0, 0.09, 0]}>
            <torusGeometry args={[0.045, 0.005, 6, 12, Math.PI]} />
            <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Luminous Warm Flame Core */}
          <mesh position={[0, 0.01, 0]}>
            <sphereGeometry args={[0.038, 10, 10]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          {/* Rich Golden Amber Light Spill on Hull Planking & Water */}
          <pointLight color="#f59e0b" intensity={4.5} distance={5.5} />
        </group>
      </group>

      {/* =========================================================================
          2. SCULPTED MARITIME FISHERMAN INHABITANT
          ========================================================================= */}
      <group position={[-0.15, 0.25, 0]}>
        {/* Waterproof Waders / Lower Body */}
        <mesh position={[0.12, -0.05, 0]}>
          <boxGeometry args={[0.34, 0.24, 0.38]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Weathered Oilskin Coat Torso */}
        <mesh position={[-0.03, 0.22, 0]} rotation={[0, 0, 0.06]}>
          <cylinderGeometry args={[0.18, 0.23, 0.44, 10]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Flared Storm Collar */}
        <mesh position={[-0.02, 0.46, 0]} rotation={[0.08, 0, 0]}>
          <torusGeometry args={[0.11, 0.035, 6, 14]} />
          <meshStandardMaterial color="#162032" roughness={0.5} metalness={0.25} />
        </mesh>

        {/* Head / Hood Contour */}
        <mesh position={[-0.02, 0.55, 0]}>
          <sphereGeometry args={[0.11, 14, 14]} />
          <meshStandardMaterial color="#131c2a" roughness={0.5} metalness={0.2} />
        </mesh>

        {/* Traditional Sou'wester Waterproof Hat */}
        <group position={[-0.02, 0.64, 0]}>
          {/* Crown */}
          <mesh position={[0, 0.035, 0]}>
            <cylinderGeometry args={[0.09, 0.12, 0.09, 12]} />
            <meshStandardMaterial color="#182234" roughness={0.42} metalness={0.28} />
          </mesh>
          {/* Sloping Flared Brim */}
          <mesh position={[-0.02, -0.01, 0]} rotation={[0.06, 0, -0.1]}>
            <cylinderGeometry args={[0.2, 0.13, 0.022, 14]} />
            <meshStandardMaterial color="#1c283c" roughness={0.4} metalness={0.32} />
          </mesh>
        </group>

        {/* Natural Bent Arms Holding Rod */}
        <mesh position={[0.18, 0.22, 0.14]} rotation={[0.55, 0.15, -0.55]}>
          <cylinderGeometry args={[0.04, 0.05, 0.24, 8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        <mesh position={[0.08, 0.18, -0.14]} rotation={[-0.2, -0.12, -0.3]}>
          <cylinderGeometry args={[0.04, 0.05, 0.22, 8]} />
          <meshStandardMaterial color="#192333" roughness={0.5} />
        </mesh>

        {/* Weathered Hands on Cork Grip */}
        <mesh position={[0.25, 0.26, 0.09]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>

        {/* =========================================================================
            3. GRAPHITE FISHING ROD & CRIMSON REEL
            ========================================================================= */}
        <group ref={rodRef} position={[0.3, 0.3, 0.1]} rotation={[-0.07, 0.1, 0.1]}>
          {/* Portuguese Cork Grip Handle */}
          <mesh position={[-0.08, -0.02, 0]} rotation={[0, 0, -1.36]}>
            <cylinderGeometry args={[0.018, 0.022, 0.3, 8]} />
            <meshStandardMaterial color="#1c1917" roughness={0.85} />
          </mesh>

          {/* Anodized Crimson Precision Reel */}
          <group position={[0.02, 0.02, 0.035]}>
            <mesh>
              <boxGeometry args={[0.065, 0.055, 0.065]} />
              <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.055, 10]} />
              <meshBasicMaterial color="#e11d48" />
            </mesh>
          </group>

          {/* Slender Carbon Fiber Blank extending out towards Core */}
          <mesh position={[0.92, 0.22, 0]} rotation={[0, 0, -1.36]}>
            <cylinderGeometry args={[0.005, 0.016, 2.05, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
          </mesh>

          {/* Ceramic Line Guides */}
          {[0.32, 0.72, 1.2, 1.65].map((dist, i) => (
            <mesh
              key={i}
              position={[dist * 0.94, dist * 0.22, 0]}
              rotation={[0, 0, -1.36]}
            >
              <torusGeometry args={[0.014 - i * 0.002, 0.0025, 6, 12]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.1} />
            </mesh>
          ))}

          {/* Glowing Rod Tip Beacon with tipRef tracking */}
          <group ref={tipRef} position={[1.86, 0.43, 0]}>
            <mesh>
              <sphereGeometry args={[0.024, 10, 10]} />
              <meshBasicMaterial color="#f97316" />
            </mesh>
            <pointLight color="#f97316" intensity={0.9} distance={1.5} />
          </group>
        </group>
      </group>

      {/* =========================================================================
          4. DYNAMIC MONOFILAMENT FISHING LINE & WATER BOBBER
          ========================================================================= */}
      {/* Mathematical Real-time Line Connecting Tip Beacon to Water Bobber */}
      <primitive object={lineObj} ref={lineRef} />

      {/* Luminous Water Bobber on the Estuary Surface with bobberRef tracking */}
      <group ref={bobberRef} position={[2.28, -0.32, 0.14]}>
        <mesh>
          <sphereGeometry args={[0.034, 10, 10]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        <pointLight color="#f59e0b" intensity={0.9} distance={1.5} />

        {/* Dual Concentric Pulsating Water Ripple Rings */}
        <mesh ref={rippleRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.06, 0.086, 24]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={ripple2Ref} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.07, 0.096, 24]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};
