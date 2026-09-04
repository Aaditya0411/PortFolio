import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorld } from '@/contexts/WorldStateContext';

// =============================================================================
// CINEMATIC FISHERMAN 3D RIG & FRAME-ACCURATE CONTINUOUS SHOT
// =============================================================================

interface FishermanRigProps {
  elapsed: number;
  isMobile: boolean;
}

const FishermanSkiffScene: React.FC<FishermanRigProps> = ({ elapsed, isMobile }) => {
  const boatRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const rodRef = useRef<THREE.Group>(null);
  const rodTipRef = useRef<THREE.Group>(null);
  const hookRef = useRef<THREE.Group>(null);
  const hookLightRef = useRef<THREE.PointLight>(null);
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const lineRef = useRef<THREE.Line>(null);
  const rippleRef = useRef<THREE.Mesh>(null);
  const ripple2Ref = useRef<THREE.Mesh>(null);

  const { camera } = useThree();

  // High-tension monofilament line buffer geometry
  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(6);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#bae6fd',
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const lineObj = useMemo(() => new THREE.Line(lineGeo, lineMat), [lineGeo, lineMat]);
  const vTip = useMemo(() => new THREE.Vector3(), []);
  const vHook = useMemo(() => new THREE.Vector3(), []);

  // Frame-by-frame continuous camera flight & character kinematics
  useFrame((state) => {
    const t = elapsed;
    const clock = state.clock.getElapsedTime();

    // 1. Natural aquatic skiff bobbing & rolling
    if (boatRef.current) {
      boatRef.current.position.y = -0.44 + Math.sin(clock * 1.3) * 0.024;
      boatRef.current.rotation.z = Math.sin(clock * 1.0) * 0.018;
      boatRef.current.rotation.x = Math.cos(clock * 0.85) * 0.012;
    }

    // Organic bow lantern flicker
    if (lanternLightRef.current) {
      lanternLightRef.current.intensity =
        5.0 + Math.sin(clock * 9.5) * 0.45 + Math.cos(clock * 14.0) * 0.25;
    }

    // 2. CAMERA CHOREOGRAPHY: ONE CONTINUOUS SHOT (0.0s – 6.5s)
    // 0.0–0.8s: Wide establishing shot (environment fades in)
    // 0.8–2.2s: Slow cinematic camera push toward fisherman
    // 2.2–3.2s: Camera settles into profile/three-quarter composition; rod prep
    // 3.2–4.1s: Camera tracks slightly up as fisherman winds up
    // 4.1–5.4s: Camera follows cast & line trajectory through space
    // 5.4–6.0s: Hook rapidly approaches camera lens and fills frame
    const baseZ = isMobile ? 4.2 : 3.3;
    const baseY = isMobile ? 0.78 : 0.65;
    const baseX = isMobile ? -0.38 : -0.7;

    if (t < 0.8) {
      // 0.0–0.8s: Wide establish
      camera.position.set(baseX - 0.65, baseY + 0.35, baseZ + 0.9);
      camera.lookAt(0.1, 0.35, 0);
    } else if (t < 2.2) {
      // 0.8–2.2s: Slow cinematic push toward fisherman
      const p = (t - 0.8) / 1.4;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      camera.position.set(
        THREE.MathUtils.lerp(baseX - 0.65, baseX - 0.18, smoothP),
        THREE.MathUtils.lerp(baseY + 0.35, baseY + 0.08, smoothP),
        THREE.MathUtils.lerp(baseZ + 0.9, baseZ + 0.12, smoothP)
      );
      camera.lookAt(
        THREE.MathUtils.lerp(0.1, -0.05, smoothP),
        THREE.MathUtils.lerp(0.35, 0.38, smoothP),
        0
      );
    } else if (t < 3.2) {
      // 2.2–3.2s: Settle profile & rod prep
      const p = (t - 2.2) / 1.0;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      camera.position.set(
        THREE.MathUtils.lerp(baseX - 0.18, baseX, smoothP),
        THREE.MathUtils.lerp(baseY + 0.08, baseY, smoothP),
        THREE.MathUtils.lerp(baseZ + 0.12, baseZ, smoothP)
      );
      camera.lookAt(
        THREE.MathUtils.lerp(-0.05, 0.02, smoothP),
        THREE.MathUtils.lerp(0.38, 0.42, smoothP),
        0
      );
    } else if (t < 4.1) {
      // 3.2–4.1s: Elegant wind-up tracking (elevates slightly to frame the raised rod)
      const p = (t - 3.2) / 0.9;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      camera.position.set(
        baseX,
        THREE.MathUtils.lerp(baseY, baseY + 0.14, smoothP),
        THREE.MathUtils.lerp(baseZ, baseZ - 0.08, smoothP)
      );
      camera.lookAt(0.02, THREE.MathUtils.lerp(0.42, 0.52, smoothP), 0);
    } else if (t < 5.4) {
      // 4.1–5.4s: Follow cast through space
      const p = (t - 4.1) / 1.3;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      camera.position.set(
        THREE.MathUtils.lerp(baseX, baseX + 0.22, smoothP),
        THREE.MathUtils.lerp(baseY + 0.14, baseY + 0.04, smoothP),
        THREE.MathUtils.lerp(baseZ - 0.08, baseZ - 0.25, smoothP)
      );
      camera.lookAt(
        THREE.MathUtils.lerp(0.02, 0.18, smoothP),
        THREE.MathUtils.lerp(0.52, 0.38, smoothP),
        0
      );
    } else {
      // 5.4s+: Hook meets lens
      camera.position.set(baseX + 0.22, baseY + 0.04, baseZ - 0.25);
      camera.lookAt(0.18, 0.38, 0);
    }

    // 3. FISHERMAN KINEMATICS (Wind-up -> Snap Cast -> Follow-through)
    if (torsoRef.current && armRef.current && rodRef.current) {
      if (t < 3.2) {
        // Poised posture with subtle harmonic breathing
        const breath = Math.sin(clock * 1.6) * 0.015;
        torsoRef.current.rotation.x = breath;
        armRef.current.rotation.x = -0.12 + breath * 0.5;
        rodRef.current.rotation.x = -0.08 + breath * 0.8;
      } else if (t < 4.1) {
        // 3.2–4.1s: Clear, elegant wind-up (torso leans back, rod arches high)
        const p = (t - 3.2) / 0.9;
        const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
        torsoRef.current.rotation.x = THREE.MathUtils.lerp(0, -0.32, smoothP);
        armRef.current.rotation.x = THREE.MathUtils.lerp(-0.12, 0.72, smoothP);
        rodRef.current.rotation.x = THREE.MathUtils.lerp(-0.08, 0.52, smoothP);
      } else if (t < 4.7) {
        // 4.1–4.7s: Strong signature snap cast forward!
        const p = (t - 4.1) / 0.6;
        const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
        torsoRef.current.rotation.x = THREE.MathUtils.lerp(-0.32, 0.28, smoothP);
        armRef.current.rotation.x = THREE.MathUtils.lerp(0.72, -0.58, smoothP);
        // Realistic spring flex whip on the rod
        const flex = Math.sin(p * Math.PI) * -0.45;
        rodRef.current.rotation.x = THREE.MathUtils.lerp(0.52, -0.35, smoothP) + flex;
      } else {
        // Follow-through stance holding the line
        torsoRef.current.rotation.x = 0.22;
        armRef.current.rotation.x = -0.46;
        rodRef.current.rotation.x = -0.26;
      }
    }

    // 4. HOOK FLIGHT ACCELERATION & LENS IMPACT TRANSITION
    // The hook is the physical transition device into the portfolio
    if (hookRef.current) {
      if (t < 4.1) {
        // Resting on water near bobber
        hookRef.current.position.set(1.9, -0.32, 0.14);
        hookRef.current.scale.set(1, 1, 1);
        if (hookLightRef.current) hookLightRef.current.intensity = 2.0;
      } else if (t < 5.4) {
        // 4.1–5.4s: Parabolic flight through 3D space toward viewer
        const p = (t - 4.1) / 1.3;
        // Parabolic arc height
        const arcY = Math.sin(p * Math.PI) * 1.35;
        const camPos = camera.position;

        const hookX = THREE.MathUtils.lerp(1.9, -0.05, p);
        const hookY = THREE.MathUtils.lerp(-0.32, 0.22, p) + arcY;
        // Accelerates forward along Z axis
        const hookZ = THREE.MathUtils.lerp(0.14, camPos.z - 1.25, p * p);

        hookRef.current.position.set(hookX, hookY, hookZ);
        const scaleVal = 1 + p * 2.8;
        hookRef.current.scale.set(scaleVal, scaleVal, scaleVal);
        if (hookLightRef.current) hookLightRef.current.intensity = 2.0 + p * 6.0;
      } else if (t < 6.0) {
        // 5.4–6.0s: Hook rapidly approaches camera lens and fills the frame!
        const p = (t - 5.4) / 0.6;
        const easeIn = p * p; // Quadratic acceleration into the lens
        const camPos = camera.position;

        const hookX = THREE.MathUtils.lerp(-0.05, camPos.x, easeIn);
        const hookY = THREE.MathUtils.lerp(0.22, camPos.y, easeIn);
        const hookZ = THREE.MathUtils.lerp(camPos.z - 1.25, camPos.z - 0.04, easeIn);

        hookRef.current.position.set(hookX, hookY, hookZ);
        // Exponential expansion forming the luminous transition surface
        const expandScale = 3.8 + easeIn * 48.0;
        hookRef.current.scale.set(expandScale, expandScale, expandScale);
        if (hookLightRef.current) hookLightRef.current.intensity = 8.0 + easeIn * 30.0;
      } else {
        // Light saturation surface
        const camPos = camera.position;
        hookRef.current.position.set(camPos.x, camPos.y, camPos.z - 0.04);
        hookRef.current.scale.set(52, 52, 52);
      }
    }

    // 5. Dynamic Monofilament Fishing Line Tracking
    if (lineRef.current && rodTipRef.current && hookRef.current) {
      rodTipRef.current.getWorldPosition(vTip);
      hookRef.current.getWorldPosition(vHook);

      const pos = lineRef.current.geometry.attributes.position;
      const arr = pos.array as Float32Array;
      arr[0] = vTip.x;
      arr[1] = vTip.y;
      arr[2] = vTip.z;
      arr[3] = vHook.x;
      arr[4] = vHook.y;
      arr[5] = vHook.z;
      pos.needsUpdate = true;
    }

    // 6. Water Ripple Animations around Boat Transom
    if (rippleRef.current) {
      const r1 = 1 + ((clock * 0.7) % 1.5);
      rippleRef.current.scale.set(r1, r1, 1);
      (rippleRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0,
        0.45 - (r1 - 1) * 0.3
      );
    }
    if (ripple2Ref.current) {
      const r2 = 1 + ((clock * 0.7 + 0.75) % 1.5);
      ripple2Ref.current.scale.set(r2, r2, 1);
      (ripple2Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0,
        0.45 - (r2 - 1) * 0.3
      );
    }
  });

  return (
    <>
      {/* Studio-Quality Lighting: Crisp Subject Separation, Clear Visibility on all laptops */}
      {/* Ambient Fill: Prevents crushed black shadows */}
      <ambientLight intensity={0.9} color="#152238" />

      {/* Main Front Key Light: Clean illumination on fisherman face plane, hands, coat, and skiff */}
      <directionalLight position={[-2.4, 4.2, 4.2]} intensity={3.8} color="#f8fafc" />

      {/* High-Contrast Celestial Rim Light: Sharp contour along sou'wester hat, coat, and rod */}
      <directionalLight position={[-4.5, 3.2, -3.0]} intensity={4.5} color="#bae6fd" />

      {/* Subtle Right Horizon Fill */}
      <directionalLight position={[3.5, 2.0, 1.5]} intensity={1.0} color="#64748b" />

      {/* Restrained Atmospheric Horizon Depth (Light linear fog, NEVER obscuring subjects) */}
      <fog attach="fog" args={['#040810', 20, 55]} />

      {/* Glistening Estuary Water Surface */}
      <mesh position={[0, -0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50, 32, 32]} />
        <meshStandardMaterial color="#070d18" roughness={0.12} metalness={0.88} />
      </mesh>

      {/* =========================================================================
          THE HANDCRAFTED WOODEN DORY SKIFF & SEATED FISHERMAN
          ========================================================================= */}
      <group ref={boatRef} position={[-0.4, -0.46, 0]} rotation={[0, 0.42, 0]}>
        {/* SKIFF HULL */}
        <group>
          {/* Main Keel Planking */}
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[2.2, 0.08, 0.44]} />
            <meshStandardMaterial color="#1b1510" roughness={0.65} metalness={0.15} />
          </mesh>
          {/* Inner Weathered Teak Floor */}
          <mesh position={[0, -0.02, 0]}>
            <boxGeometry args={[1.9, 0.02, 0.48]} />
            <meshStandardMaterial color="#2d2218" roughness={0.58} metalness={0.18} />
          </mesh>
          {/* Port Gunwale Strake */}
          <mesh position={[0, 0.08, 0.3]} rotation={[0.26, 0, 0]}>
            <boxGeometry args={[2.1, 0.22, 0.05]} />
            <meshStandardMaterial color="#382b20" roughness={0.5} metalness={0.2} />
          </mesh>
          {/* Starboard Gunwale Strake */}
          <mesh position={[0, 0.08, -0.3]} rotation={[-0.26, 0, 0]}>
            <boxGeometry args={[2.1, 0.22, 0.05]} />
            <meshStandardMaterial color="#382b20" roughness={0.5} metalness={0.2} />
          </mesh>
          {/* Bow Stem Post */}
          <mesh position={[1.1, 0.12, 0]} rotation={[0, 0, -0.32]}>
            <boxGeometry args={[0.18, 0.26, 0.32]} />
            <meshStandardMaterial color="#423425" roughness={0.48} metalness={0.22} />
          </mesh>
          {/* Stern Transom Quarterdeck */}
          <mesh position={[-1.02, 0.08, 0]} rotation={[0, 0, 0.12]}>
            <boxGeometry args={[0.08, 0.2, 0.54]} />
            <meshStandardMaterial color="#2c2218" roughness={0.55} metalness={0.16} />
          </mesh>
          {/* Polished Teak Gunwale Rails */}
          <mesh position={[0, 0.18, 0.32]}>
            <boxGeometry args={[2.08, 0.03, 0.045]} />
            <meshStandardMaterial color="#4d3b2b" roughness={0.38} metalness={0.25} />
          </mesh>
          <mesh position={[0, 0.18, -0.32]}>
            <boxGeometry args={[2.08, 0.03, 0.045]} />
            <meshStandardMaterial color="#4d3b2b" roughness={0.38} metalness={0.25} />
          </mesh>
          {/* Fisherman's Thwart Bench */}
          <mesh position={[-0.12, 0.08, 0]}>
            <boxGeometry args={[0.36, 0.04, 0.58]} />
            <meshStandardMaterial color="#3f3123" roughness={0.5} metalness={0.2} />
          </mesh>

          {/* WARM GOLDEN BOW HURRICANE LANTERN (With Organic Flame Flicker) */}
          <group position={[1.15, 0.32, 0]}>
            {/* Brass Bracket */}
            <mesh position={[-0.04, -0.08, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.18, 6]} />
              <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Brass Lantern Body */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.058, 0.15, 10]} />
              <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.18} />
            </mesh>
            {/* Luminous Warm Flame Core */}
            <mesh position={[0, 0.01, 0]}>
              <sphereGeometry args={[0.038, 10, 10]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
            {/* Rich Golden Light Spill on Boat Planking & Water */}
            <pointLight ref={lanternLightRef} color="#f59e0b" intensity={5.2} distance={6.5} />
          </group>
        </group>

        {/* =======================================================================
            SCULPTED MARITIME FISHERMAN INHABITANT (Articulated Kinematics)
            ======================================================================= */}
        <group position={[-0.12, 0.26, 0]}>
          {/* Seated Lower Body & Waterproof Waders */}
          <mesh position={[0.1, -0.04, 0]}>
            <boxGeometry args={[0.34, 0.22, 0.38]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.2} />
          </mesh>

          {/* Torso in Weathered Storm Coat (Tilts during windup & cast) */}
          <group ref={torsoRef} position={[-0.02, 0.18, 0]}>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.18, 0.22, 0.42, 10]} />
              <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.28} />
            </mesh>

            {/* Storm Collar */}
            <mesh position={[0, 0.26, 0]}>
              <torusGeometry args={[0.1, 0.03, 6, 12]} />
              <meshStandardMaterial color="#162032" roughness={0.5} />
            </mesh>

            {/* Head & Hood */}
            <mesh position={[0, 0.36, 0]}>
              <sphereGeometry args={[0.11, 14, 14]} />
              <meshStandardMaterial color="#131c2a" roughness={0.55} />
            </mesh>

            {/* Traditional Sou'wester Hat with Crisp Rim Lighting */}
            <group position={[0, 0.45, 0]}>
              <mesh position={[0, 0.03, 0]}>
                <cylinderGeometry args={[0.08, 0.12, 0.09, 12]} />
                <meshStandardMaterial color="#182234" roughness={0.42} metalness={0.28} />
              </mesh>
              <mesh position={[-0.02, -0.01, 0]} rotation={[0.06, 0, -0.1]}>
                <cylinderGeometry args={[0.22, 0.14, 0.02, 14]} />
                <meshStandardMaterial color="#1e293c" roughness={0.4} metalness={0.3} />
              </mesh>
              {/* Crisp silver edge ring catching cinematic rim light */}
              <mesh position={[-0.02, -0.01, 0]} rotation={[0.06, 0, -0.1]}>
                <ringGeometry args={[0.22, 0.23, 16]} />
                <meshBasicMaterial color="#e2e8f0" transparent opacity={0.75} side={THREE.DoubleSide} />
              </mesh>
            </group>

            {/* Articulated Arms Holding Rod */}
            <group ref={armRef} position={[0.15, 0.2, 0.1]}>
              {/* Right Arm forward */}
              <mesh position={[0.05, 0, 0.06]} rotation={[0.4, 0.15, -0.45]}>
                <cylinderGeometry args={[0.04, 0.05, 0.25, 8]} />
                <meshStandardMaterial color="#1e293b" roughness={0.5} />
              </mesh>
              {/* Left Arm stabilizing */}
              <mesh position={[-0.06, -0.03, -0.2]} rotation={[-0.25, -0.1, -0.25]}>
                <cylinderGeometry args={[0.04, 0.05, 0.22, 8]} />
                <meshStandardMaterial color="#192333" roughness={0.5} />
              </mesh>

              {/* Weathered Hands gripping cork handle */}
              <mesh position={[0.12, 0.02, 0]}>
                <sphereGeometry args={[0.036, 8, 8]} />
                <meshStandardMaterial color="#334155" roughness={0.6} />
              </mesh>

              {/* ===================================================================
                  HIGH-CONTRAST GRAPHITE FISHING ROD & BEACON TIP
                  =================================================================== */}
              <group ref={rodRef} position={[0.16, 0.04, 0]} rotation={[-0.08, 0.1, 0.1]}>
                {/* Portuguese Cork Grip */}
                <mesh position={[-0.06, -0.02, 0]} rotation={[0, 0, -1.36]}>
                  <cylinderGeometry args={[0.018, 0.022, 0.3, 8]} />
                  <meshStandardMaterial color="#1c1917" roughness={0.85} />
                </mesh>

                {/* Precision Anodized Crimson Reel Accent */}
                <group position={[0.03, 0.02, 0.035]}>
                  <mesh>
                    <boxGeometry args={[0.065, 0.055, 0.065]} />
                    <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
                  </mesh>
                  <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.055, 10]} />
                    <meshBasicMaterial color="#e11d48" />
                  </mesh>
                </group>

                {/* Slender Carbon Fiber Blank */}
                <mesh position={[0.95, 0.22, 0]} rotation={[0, 0, -1.36]}>
                  <cylinderGeometry args={[0.005, 0.016, 2.1, 8]} />
                  <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
                </mesh>

                {/* Ceramic Line Guides */}
                {[0.35, 0.8, 1.3, 1.75].map((dist, i) => (
                  <mesh
                    key={i}
                    position={[dist * 0.94, dist * 0.22, 0]}
                    rotation={[0, 0, -1.36]}
                  >
                    <torusGeometry args={[0.014 - i * 0.002, 0.0025, 6, 12]} />
                    <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.1} />
                  </mesh>
                ))}

                {/* Glowing Rod Tip Beacon */}
                <group ref={rodTipRef} position={[1.92, 0.44, 0]}>
                  <mesh>
                    <sphereGeometry args={[0.026, 10, 10]} />
                    <meshBasicMaterial color="#f97316" />
                  </mesh>
                  <pointLight color="#f97316" intensity={1.4} distance={2.0} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* =========================================================================
          DYNAMIC FISHING LINE & FLYING HOOK BEACON (TRANSITION DEVICE)
          ========================================================================= */}
      {/* Mathematical Real-time Line from rod tip to hook */}
      <primitive object={lineObj} ref={lineRef} />

      {/* Luminous Hook Beacon (Casts forward and expands directly into camera lens) */}
      <group ref={hookRef} position={[1.9, -0.32, 0.14]}>
        {/* Physical Sculptural Hook Curve */}
        <mesh position={[0, -0.04, 0]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.04, 0.008, 8, 16, Math.PI * 1.2]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Radiant Inner Core */}
        <mesh>
          <sphereGeometry args={[0.038, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Radiant Cyan-Silver Outer Aura */}
        <mesh>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.88} />
        </mesh>
        <pointLight ref={hookLightRef} color="#7dd3fc" intensity={3.5} distance={5.5} />

        {/* Concentric ripples while in water */}
        <mesh ref={rippleRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.06, 0.09, 24]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={ripple2Ref} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.07, 0.1, 24]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
};

// =============================================================================
// CINEMATIC FISHERMAN INTRO MASTER COMPONENT
// =============================================================================

export const CinematicFishermanIntro: React.FC = () => {
  const { isOpeningActive, skipOpening } = useWorld();
  const [elapsed, setElapsed] = useState<number>(0);
  const [isDismissing, setIsDismissing] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check mobile viewport for responsive framing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard shortcut listener (ESC skips cleanly with instant dissolve)
  useEffect(() => {
    if (!isOpeningActive) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpeningActive]);

  // Main High-Precision Cinematic Clock (0.0s to 6.8s Target Duration)
  useEffect(() => {
    if (!isOpeningActive) return;

    const startTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const timeSec = (now - startTime) / 1000;
      setElapsed(timeSec);

      // At 6.4 seconds, initiate smooth dissolve into existing portfolio hero
      if (timeSec >= 6.4 && !isDismissing) {
        setIsDismissing(true);
      }

      // At 6.8 seconds, unmount intro completely and release all WebGL resources
      if (timeSec >= 6.8) {
        skipOpening();
      } else {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isOpeningActive, isDismissing, skipOpening]);

  // Manual Skip Handler (Smooth 250ms dissolve directly into existing hero, no black gap)
  const handleSkip = useCallback(() => {
    if (isDismissing) return;
    setIsDismissing(true);
    setTimeout(() => {
      skipOpening();
    }, 250);
  }, [isDismissing, skipOpening]);

  // If opening is not active, return null completely (Zero WebGL / DOM footprint)
  if (!isOpeningActive) return null;

  // Compute optical phase transitions for continuous single-shot feel:
  // 0.0 - 0.8s: Initial establishing fade in from deep twilight
  const initialFadeIn = elapsed < 0.8 ? (0.8 - elapsed) / 0.8 : 0;

  // 5.4s - 6.4s: Luminous Hook Optical Transition Surface
  // The hook's brightness naturally becomes the transition surface
  let flareOpacity = 0;
  if (elapsed >= 5.4 && elapsed < 6.0) {
    flareOpacity = (elapsed - 5.4) / 0.6;
  } else if (elapsed >= 6.0 && elapsed < 6.4) {
    flareOpacity = 1.0;
  } else if (elapsed >= 6.4) {
    flareOpacity = Math.max(0, 1.0 - (elapsed - 6.4) / 0.4);
  }

  // 5.8s - 6.6s: Minimalist Film Title Card Reveal
  const showTitle = elapsed >= 5.8 && elapsed < 6.7;
  const titleOpacity =
    elapsed >= 5.8 && elapsed < 6.2
      ? (elapsed - 5.8) / 0.4
      : elapsed >= 6.4
      ? Math.max(0, 1 - (elapsed - 6.4) / 0.3)
      : 1;

  return (
    <div
      className={`cinematic-intro-root ${isDismissing ? 'cinematic-dismissing' : ''}`}
      aria-label="Cinematic Fisherman Opening Prologue"
    >
      {/* 1. Isolated Dedicated WebGL 3D Canvas */}
      <div className="cinematic-canvas-wrapper">
        <Canvas
          frameloop="always"
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5)]}
          camera={{
            position: [isMobile ? -0.38 : -0.7, isMobile ? 0.78 : 0.65, isMobile ? 4.2 : 3.3],
            fov: isMobile ? 46 : 40,
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            precision: 'highp',
          }}
        >
          <FishermanSkiffScene elapsed={elapsed} isMobile={isMobile} />
        </Canvas>
      </div>

      {/* 2. Opening Soft Fade-In from Twilight Black (0.0s - 0.8s) */}
      {initialFadeIn > 0 && (
        <div
          className="cinematic-black-curtain"
          style={{ opacity: initialFadeIn }}
          aria-hidden="true"
        />
      )}

      {/* 3. The Continuous Transition Device: Radiant Optical Hook Bloom (5.4s - 6.6s) */}
      {flareOpacity > 0 && (
        <div
          className="cinematic-flare-transition"
          style={{ opacity: flareOpacity }}
          aria-hidden="true"
        />
      )}

      {/* 4. Film Title Card Reveal (5.8s - 6.6s) - Pure Minimalist Typography */}
      {showTitle && (
        <div
          className="cinematic-title-card"
          style={{ opacity: titleOpacity }}
        >
          <h1 className="cinematic-name">
            <span>ADITYAGIRI</span>
            <span className="cinematic-surname">GOSWAMI</span>
          </h1>
          <p className="cinematic-role">
            FULL STACK &amp; BLOCKCHAIN DEVELOPER
          </p>
        </div>
      )}

      {/* 5. Minimalist Skip Button (Top Right Only - No HUD, No Tech Labels) */}
      <header className="cinematic-hud-header">
        <div /> {/* Clean empty space on left */}
        <button
          type="button"
          className="cinematic-skip-btn"
          onClick={handleSkip}
          title="Skip opening cinematic (ESC)"
          aria-label="Skip opening cinematic"
        >
          <span className="skip-text">SKIP INTRO</span>
          <span className="skip-kbd">ESC</span>
        </button>
      </header>

      {/* Subtle Cinematic Vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />
    </div>
  );
};
