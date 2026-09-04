import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useFisherman, IntroPhase } from '@/contexts/FishermanContext';
import { FishermanCharacter } from './FishermanCharacter';
import { FishingLine } from './FishingLine';
import { IntroDeveloperCoreArtifact } from './ConceptualObjects';

// Cinematic Camera Controller for the Intro
function IntroCameraRig({
  phase,
  introTime,
}: {
  phase: IntroPhase;
  introTime: number;
}) {
  const targetPos = useMemo(() => new THREE.Vector3(-1.0, 1.3, 4.8), []);
  const lookAtPos = useMemo(() => new THREE.Vector3(0.3, 0.35, 0), []);

  useFrame((state, delta) => {
    const cam = state.camera;

    if (introTime < 1.0) {
      // 0.0–1.0s: Wide establishing shot; fisherman visible in lower-left third, target in distance
      targetPos.set(-1.0, 1.25, 4.8);
      lookAtPos.set(0.3, 0.35, 0);
    } else if (introTime < 2.2) {
      // 1.0–2.2s: Camera glides in closer, establishing fisherman and Developer Core
      const p = (introTime - 1.0) / 1.2;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      targetPos.set(
        THREE.MathUtils.lerp(-1.0, -1.25, smoothP),
        THREE.MathUtils.lerp(1.25, 0.88, smoothP),
        THREE.MathUtils.lerp(4.8, 3.7, smoothP)
      );
      lookAtPos.set(
        THREE.MathUtils.lerp(0.3, 0.2, smoothP),
        THREE.MathUtils.lerp(0.35, 0.3, smoothP),
        0
      );
    } else if (introTime < 3.5) {
      // 2.2–3.5s: Fisherman windup & pause at apex; camera elevates slightly to frame raised rod
      const p = (introTime - 2.2) / 1.3;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      targetPos.set(
        THREE.MathUtils.lerp(-1.25, -1.35, smoothP),
        THREE.MathUtils.lerp(0.88, 0.95, smoothP),
        THREE.MathUtils.lerp(3.7, 3.45, smoothP)
      );
      lookAtPos.set(
        THREE.MathUtils.lerp(0.2, 0.15, smoothP),
        THREE.MathUtils.lerp(0.3, 0.38, smoothP),
        0
      );
    } else if (introTime < 4.5) {
      // 3.5–4.5s: Forward snap cast! Camera follows the hook flight across toward Developer Core
      const p = (introTime - 3.5) / 1.0;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      targetPos.set(
        THREE.MathUtils.lerp(-1.35, -0.45, smoothP),
        THREE.MathUtils.lerp(0.95, 0.72, smoothP),
        THREE.MathUtils.lerp(3.45, 3.2, smoothP)
      );
      lookAtPos.set(
        THREE.MathUtils.lerp(0.15, 0.65, smoothP),
        THREE.MathUtils.lerp(0.38, 0.32, smoothP),
        0
      );
    } else if (introTime < 5.5) {
      // 4.5–5.5s: Hook impacts Developer Core! Camera frames the strike, recoil, and taut line
      const p = (introTime - 4.5) / 1.0;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      targetPos.set(
        THREE.MathUtils.lerp(-0.45, 0.15, smoothP),
        THREE.MathUtils.lerp(0.72, 0.58, smoothP),
        THREE.MathUtils.lerp(3.2, 2.9, smoothP)
      );
      lookAtPos.set(
        THREE.MathUtils.lerp(0.65, 1.05, smoothP),
        THREE.MathUtils.lerp(0.32, 0.28, smoothP),
        0
      );
    } else if (introTime < 7.0) {
      // 5.5–7.0s: Tension & pull! Fisherman leans back; target is pulled toward camera
      const p = (introTime - 5.5) / 1.5;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      targetPos.set(
        THREE.MathUtils.lerp(0.15, 0.05, smoothP),
        THREE.MathUtils.lerp(0.58, 0.52, smoothP),
        THREE.MathUtils.lerp(2.9, 3.05, smoothP)
      );
      lookAtPos.set(
        THREE.MathUtils.lerp(1.05, 0.45, smoothP),
        THREE.MathUtils.lerp(0.28, 0.22, smoothP),
        0
      );
    } else {
      // 7.0–8.5s: Transition! Camera follows target as it glides forward, transitioning into hero
      const p = Math.min((introTime - 7.0) / 1.5, 1);
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      targetPos.set(
        THREE.MathUtils.lerp(0.05, -0.2, smoothP),
        THREE.MathUtils.lerp(0.52, 0.38, smoothP),
        THREE.MathUtils.lerp(3.05, 1.4, smoothP)
      );
      lookAtPos.set(
        THREE.MathUtils.lerp(0.45, 0.0, smoothP),
        THREE.MathUtils.lerp(0.22, 0.1, smoothP),
        -0.8
      );
    }

    cam.position.lerp(targetPos, Math.min(delta * 3.0, 1));
    cam.lookAt(lookAtPos);
  });

  return null;
}

// Intro 3D Environment Scene
function IntroSceneContent({
  phase,
  introTime,
  castProgress,
}: {
  phase: IntroPhase;
  introTime: number;
  castProgress: number;
}) {
  const [rodTipPos, setRodTipPos] = useState<THREE.Vector3>(() => new THREE.Vector3(-1.0, 1.1, 0.4));
  const corePos: [number, number, number] = [1.35, 0.28, -0.35];

  const isCasting = phase === 'cast' || phase === 'hook' || phase === 'pull';
  const strikeCount = phase === 'hook' || phase === 'pull' ? 1 : 0;

  // Soft fade-in multiplier for lighting during the first second
  const lightFade = introTime < 1.0 ? Math.max(introTime, 0.2) : 1.0;

  return (
    <>
      <IntroCameraRig phase={phase} introTime={introTime} />

      {/* 1. Controlled Ambient Fill: Prevents crushed black shadows */}
      <ambientLight intensity={0.38 * lightFade} color="#161a22" />

      {/* 2. Key Light: Front-left illumination striking face plane, hands, rod, and reel */}
      <directionalLight
        position={[-2.4, 3.8, 3.6]}
        intensity={2.8 * lightFade}
        color="#fff6ed"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* 3. High-Contrast Rim / Backlight: Creates clean silhouette separation for fisherman & rod */}
      <directionalLight
        position={[-3.6, 3.2, -2.6]}
        intensity={4.6 * lightFade}
        color="#e8f0fc"
      />

      {/* 4. Target Accent Light: Keeps the Developer Core clearly illuminated */}
      <pointLight
        position={[corePos[0], corePos[1] + 0.5, corePos[2]]}
        intensity={2.6 * lightFade}
        color="#ff4438"
        distance={3.2}
      />

      {/* Secondary fill light from right to reveal right profile */}
      <directionalLight
        position={[3.0, 1.5, 2.0]}
        intensity={0.6 * lightFade}
        color="#8ea0b5"
      />

      {/* Light Linear Fog: Creates spatial depth WITHOUT obscuring subjects */}
      <fog attach="fog" args={['#080a0e', 12, 34]} />

      {/* Dark Reflective Water Plane */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40, 16, 16]} />
        <meshStandardMaterial
          color="#080a0e"
          roughness={0.14}
          metalness={0.9}
          flatShading
        />
      </mesh>

      {/* Stylized Fisherman Character */}
      <group position={[-1.3, -0.25, 0.2]}>
        <FishermanCharacter
          castProgress={castProgress}
          isCasting={isCasting}
          targetPos={corePos}
          onTipPositionUpdate={setRodTipPos}
          scale={0.95}
          introPhase={phase}
          introTime={introTime}
        />
      </group>

      {/* High-Visibility Fishing Line & Sculptural Hook */}
      <FishingLine
        rodTipPos={rodTipPos}
        targetPos={corePos}
        castProgress={castProgress}
        isCasting={isCasting}
        strikeCount={strikeCount}
        introPhase={phase}
        introTime={introTime}
      />

      {/* Central Floating Developer Core Artifact */}
      <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.25}>
        <IntroDeveloperCoreArtifact
          position={corePos}
          scale={0.85}
          reaction={{
            isTarget: true,
            castProgress,
            strikeCount,
          }}
          introPhase={phase}
          introTime={introTime}
        />
      </Float>

      {/* Restrained Digital Particles (Kept minimal & editorial) */}
      <Sparkles count={24} scale={[12, 5, 8]} size={0.7} speed={0.2} color="#ff4438" opacity={0.35} />
      <Sparkles count={18} scale={[10, 4, 7]} size={0.5} speed={0.12} color="#c8d2de" opacity={0.25} />
    </>
  );
}

export const CinematicIntro: React.FC = () => {
  const { introActive, introPhase, skipIntro } = useFisherman();
  const [introTime, setIntroTime] = useState(0);

  // High-precision continuous clock for frame-accurate animation (0.0s to 8.6s)
  useEffect(() => {
    if (!introActive) {
      setIntroTime(0);
      return;
    }

    const startTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      setIntroTime(elapsed);
      if (elapsed < 8.6) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [introActive]);

  // Compute cast progress during intro phases
  const castProgress = useMemo(() => {
    switch (introPhase) {
      case 'dark':
      case 'reveal':
        return 0;
      case 'windup':
        return 0.18;
      case 'cast':
        return 0.48;
      case 'hook':
        return 0.72;
      case 'pull':
      case 'transition':
        return 0.95;
      case 'done':
      default:
        return 1;
    }
  }, [introPhase]);

  if (!introActive) return null;

  return (
    <div
      className={`intro-overlay ${introPhase === 'transition' ? 'intro-dissolve' : ''}`}
      aria-label="Cinematic 3D Opening Intro"
    >
      {/* 3D WebGL Intro Canvas */}
      <div className="intro-canvas-wrap">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [-1.0, 1.3, 4.8], fov: 38 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <IntroSceneContent
            phase={introPhase}
            introTime={introTime}
            castProgress={castProgress}
          />
        </Canvas>
      </div>

      {/* Minimal Skip Intro Control */}
      <div className="intro-hud-top">
        <div className="intro-status-tag">
          <span className="signal-dot" />
          <span>INITIALIZING DIGITAL ENVIRONMENT / 2026</span>
        </div>
        <button
          className="skip-intro-btn"
          onClick={skipIntro}
          title="Skip opening animation (ESC)"
          aria-label="Skip opening cinematic animation"
        >
          SKIP INTRO <span>[ESC]</span>
        </button>
      </div>

      {/* Intro Narrative Sequence Subtitles / Title Reveal */}
      <div className={`intro-narrative ${introPhase === 'transition' ? 'has-hero' : ''}`}>
        {introPhase === 'reveal' && (
          <p className="intro-line">REVEALING THE DIGITAL REALM</p>
        )}
        {introPhase === 'windup' && (
          <p className="intro-line">PREPARING THE SYSTEM CAST</p>
        )}
        {introPhase === 'cast' && (
          <p className="intro-line">CASTING INTO THE NETWORK</p>
        )}
        {introPhase === 'hook' && (
          <p className="intro-line intro-hit">OBJECT SECURED / DEVELOPER CORE</p>
        )}
        {introPhase === 'pull' && (
          <p className="intro-line">RETRIEVING ARCHITECTURE</p>
        )}
        {introPhase === 'transition' && (
          <div className="intro-hero-reveal">
            <p className="intro-sub-tag">SYSTEM ONLINE / SIGNATURE WORK</p>
            <h1 className="intro-title">
              <span>ADITYAGIRI</span>
              <span className="indent">GOSWAMI</span>
            </h1>
            <p className="intro-role">FULL STACK &amp; BLOCKCHAIN DEVELOPER</p>
            <p className="intro-desc">
              Building modern web applications, decentralized systems, and interactive digital experiences.
            </p>
          </div>
        )}
      </div>

      {/* Cinematic Vignette & Grain */}
      <div className="intro-vignette" />
    </div>
  );
};
