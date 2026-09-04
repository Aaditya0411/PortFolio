import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorld } from '@/contexts/WorldStateContext';

export const WorldCameraRig: React.FC = () => {
  const { reducedMotion } = useWorld();
  const { size, camera } = useThree();

  const isMobile = size.width < 768;

  // Track initial arrival entrance animation
  const [introProgress, setIntroProgress] = useState<number>(0);
  useEffect(() => {
    if (reducedMotion) {
      setIntroProgress(1);
      return;
    }
    const start = performance.now();
    let animId: number;
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const p = Math.min(elapsed / 2.2, 1);
      setIntroProgress(p);
      if (p < 1) {
        animId = requestAnimationFrame(tick);
      }
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  // Working vectors
  const targetCamPos = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useRef(new THREE.Vector3(0.2, 0.35, 0));

  // Interactive scroll offset (clamped)
  const [scrollDepth, setScrollDepth] = useState<number>(0);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      setScrollDepth((prev) => {
        const next = prev + e.deltaY * 0.0025;
        return Math.max(-0.6, Math.min(next, 1.8));
      });
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useFrame((state, delta) => {
    const pointer = state.pointer;

    // Smooth smoothstep entrance from crane high angle to hero view
    const entranceFactor = THREE.MathUtils.smoothstep(introProgress, 0, 1);

    const startX = -1.2;
    const startY = 2.4;
    const startZ = 7.0;

    const baseHeroX = -0.3;
    const baseHeroY = 1.35 + (isMobile ? 0.4 : 0);
    const baseHeroZ = 5.5 + (isMobile ? 2.0 : 0) - scrollDepth;

    // Current interpolated base camera position
    const currentBaseX = THREE.MathUtils.lerp(startX, baseHeroX, entranceFactor);
    const currentBaseY = THREE.MathUtils.lerp(startY, baseHeroY, entranceFactor);
    const currentBaseZ = THREE.MathUtils.lerp(startZ, baseHeroZ, entranceFactor);

    // Controlled mouse parallax
    const parallaxX = pointer.x * (isMobile ? 0.2 : 0.5);
    const parallaxY = pointer.y * (isMobile ? 0.15 : 0.35);

    targetCamPos.set(
      currentBaseX + parallaxX,
      currentBaseY + parallaxY,
      currentBaseZ
    );

    targetLookAt.set(
      0.1 + parallaxX * 0.35,
      0.25 + parallaxY * 0.25,
      0
    );

    if (reducedMotion) {
      camera.position.copy(targetCamPos);
      camera.lookAt(targetLookAt);
      currentLookAt.current.copy(targetLookAt);
      return;
    }

    // Organic inertial damping
    const dampSpeed = Math.min(delta * 2.8, 0.12);
    camera.position.lerp(targetCamPos, dampSpeed);

    currentLookAt.current.lerp(targetLookAt, dampSpeed);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
