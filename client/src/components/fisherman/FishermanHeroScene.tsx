import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useFisherman } from '@/contexts/FishermanContext';
import { FishermanCharacter } from './FishermanCharacter';
import { FishingLine } from './FishingLine';
import {
  RevixConceptualObject,
  BnBreezeConceptualObject,
  AicteConceptualObject,
  LotteryConceptualObject,
  IntroDeveloperCoreArtifact,
} from './ConceptualObjects';

// Dynamic Camera Controller for the live Hero scene
function SceneCamera({
  isCasting,
  targetPos,
  compact,
}: {
  isCasting: boolean;
  targetPos: [number, number, number];
  compact: boolean;
}) {
  const lookAt = useMemo(() => new THREE.Vector3(0, 0.1, 0), []);
  const camPos = useMemo(() => new THREE.Vector3(0, 0, compact ? 6.2 : 5.2), [compact]);

  useFrame((state, delta) => {
    const cam = state.camera;
    if (isCasting) {
      // Subtly track the direction between fisherman and target
      const midX = targetPos[0] * 0.25;
      const midY = targetPos[1] * 0.2 + 0.1;
      camPos.set(midX, midY, compact ? 5.8 : 4.8);
      lookAt.set(targetPos[0] * 0.35, targetPos[1] * 0.25, targetPos[2] * 0.35);
    } else {
      // Gentle mouse pointer parallax
      const targetX = state.pointer.x * 0.35;
      const targetY = state.pointer.y * 0.22;
      camPos.set(targetX, targetY + 0.1, compact ? 6.2 : 5.2);
      lookAt.set(0, 0.1, 0);
    }

    cam.position.lerp(camPos, Math.min(delta * 2.5, 1));
    cam.lookAt(lookAt);
  });

  return null;
}

// 3D Scene Assembly
function SceneAssembly({ compact }: { compact: boolean }) {
  const { isCasting, castProgress, castTarget, strikeCount } = useFisherman();
  const [rodTipPos, setRodTipPos] = useState<THREE.Vector3>(() => new THREE.Vector3(-1.1, 0.9, 0.3));

  // Determine current active target position based on castTarget
  const targetPos: [number, number, number] = useMemo(() => {
    if (!castTarget) return [1.5, 0.3, -0.4];

    if (castTarget.type === 'project') {
      if (castTarget.id === '01') return [1.4, 0.55, -0.3]; // Revix
      if (castTarget.id === '02') return [1.7, -0.25, 0.2]; // BnBreeze
      if (castTarget.id === '03') return [1.0, 0.85, -0.6]; // AICTE
      if (castTarget.id === '04') return [1.8, 0.2, -0.8]; // Lottery
    }

    // Section targets
    if (castTarget.id === 'about') return [1.2, 0.4, -0.3];
    if (castTarget.id === 'stack') return [1.5, 0.7, -0.5];
    if (castTarget.id === 'work') return [1.6, 0.1, -0.2];
    if (castTarget.id === 'experience') return [1.3, -0.3, 0.1];
    if (castTarget.id === 'resume') return [1.1, 0.6, -0.4];
    if (castTarget.id === 'contact') return [1.7, 0.3, -0.6];

    return [1.5, 0.3, -0.4];
  }, [castTarget]);

  const isRevixTarget = isCasting && castTarget?.id === '01';
  const isBnBreezeTarget = isCasting && castTarget?.id === '02';
  const isAicteTarget = isCasting && castTarget?.id === '03';
  const isLotteryTarget = isCasting && castTarget?.id === '04';
  const isGeneralTarget = isCasting && !isRevixTarget && !isBnBreezeTarget && !isAicteTarget && !isLotteryTarget;

  return (
    <>
      <SceneCamera isCasting={isCasting} targetPos={targetPos} compact={compact} />

      {/* Cinematic Lighting */}
      <ambientLight intensity={0.22} />
      <directionalLight position={[-3, 4, 4]} intensity={2.0} color="#fff5ea" />
      <pointLight position={[targetPos[0], targetPos[1] + 0.4, targetPos[2]]} intensity={2.4} color="#d6483e" />
      <pointLight position={[-1.2, -0.1, 0.6]} intensity={1.2} color="#ff5747" />

      {/* Atmospheric Fog */}
      <fogExp2 attach="fog" args={['#050505', compact ? 0.09 : 0.065]} />

      {/* Dark Reflective Water Plane */}
      <mesh position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30, 8, 8]} />
        <meshStandardMaterial
          color="#060606"
          roughness={0.14}
          metalness={0.92}
          flatShading
        />
      </mesh>

      {/* Stylized Fisherman Character on Skiff */}
      <group position={[-1.4, -0.32, 0.2]}>
        <FishermanCharacter
          castProgress={castProgress}
          isCasting={isCasting}
          targetPos={targetPos}
          onTipPositionUpdate={setRodTipPos}
          scale={compact ? 0.85 : 0.95}
          compact={compact}
        />
      </group>

      {/* Dynamic 3D Fishing Line with Slack & Taut Physics */}
      <FishingLine
        rodTipPos={rodTipPos}
        targetPos={targetPos}
        castProgress={castProgress}
        isCasting={isCasting}
        strikeCount={strikeCount}
      />

      {/* Conceptual 3D Artifacts Floating in Environment */}
      {/* 1. REVIX Artifact */}
      <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.25}>
        <RevixConceptualObject
          position={[1.4, 0.55, -0.3]}
          scale={compact ? 0.65 : 0.78}
          reaction={{
            isTarget: isRevixTarget,
            castProgress,
            strikeCount,
          }}
        />
      </Float>

      {/* 2. BNBREEZE Artifact */}
      <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.2}>
        <BnBreezeConceptualObject
          position={[1.7, -0.25, 0.2]}
          scale={compact ? 0.6 : 0.72}
          reaction={{
            isTarget: isBnBreezeTarget,
            castProgress,
            strikeCount,
          }}
        />
      </Float>

      {/* 3. AICTE Artifact */}
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.28}>
        <AicteConceptualObject
          position={[1.0, 0.85, -0.6]}
          scale={compact ? 0.58 : 0.7}
          reaction={{
            isTarget: isAicteTarget,
            castProgress,
            strikeCount,
          }}
        />
      </Float>

      {/* 4. LOTTERY Artifact */}
      <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.22}>
        <LotteryConceptualObject
          position={[1.8, 0.2, -0.8]}
          scale={compact ? 0.62 : 0.75}
          reaction={{
            isTarget: isLotteryTarget,
            castProgress,
            strikeCount,
          }}
        />
      </Float>

      {/* Central Core Artifact (When idling or targeting general sections) */}
      <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.18}>
        <IntroDeveloperCoreArtifact
          position={[0.3, 0.15, -0.5]}
          scale={compact ? 0.55 : 0.68}
          reaction={{
            isTarget: isGeneralTarget,
            castProgress,
            strikeCount,
          }}
        />
      </Float>

      {/* Digital Dust Particles */}
      <Sparkles
        count={compact ? 16 : 40}
        scale={[8, 5, 6]}
        size={0.75}
        speed={0.18}
        color="#d6483e"
        opacity={0.3}
      />
    </>
  );
}

export default function FishermanHeroScene({ compact = false }: { compact?: boolean }) {
  const { introActive, isCasting } = useFisherman();
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [lowPower, setLowPower] = useState(compact);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 600px), (prefers-reduced-motion: reduce)');
    const update = () => setLowPower(compact || query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, [compact]);

  // Pause rendering when intro overlay is active or when hero is scrolled out of viewport (unless casting)
  const shouldRender = !introActive && (inView || isCasting);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        frameloop={shouldRender ? 'always' : 'never'}
        dpr={[1, lowPower ? 1.0 : 1.25]}
        camera={{ position: [0, 0, lowPower ? 6.2 : 5.2], fov: 34 }}
        shadows={false}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: 'high-performance',
          precision: 'mediump',
        }}
      >
        <SceneAssembly compact={lowPower} />
      </Canvas>
    </div>
  );
}
