import React, { useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorld } from '@/contexts/WorldStateContext';

export const WorldOpeningSequence: React.FC = () => {
  const { isOpeningActive, skipOpening } = useWorld();
  const { camera } = useThree();
  const [openingTime, setOpeningTime] = useState<number>(0);

  useEffect(() => {
    if (!isOpeningActive) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') skipOpening();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpeningActive, skipOpening]);

  useEffect(() => {
    if (!isOpeningActive) return;

    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      setOpeningTime(elapsed);
      if (elapsed >= 7.5) {
        skipOpening();
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isOpeningActive, skipOpening]);

  useFrame(() => {
    if (!isOpeningActive) return;

    // Cinematic World Establishing Spline:
    // 0.0 - 2.0s: Wide aerial establish over the calm reflective waters
    // 2.0 - 4.5s: Descending swoop discovering the fisherman on his skiff
    // 4.5 - 6.5s: Forward glide framing the glowing Developer Core
    // 6.5 - 7.5s: Settling into Origin base camera pose
    if (openingTime < 2.0) {
      const p = openingTime / 2.0;
      camera.position.set(
        THREE.MathUtils.lerp(-4.0, -2.8, p),
        THREE.MathUtils.lerp(5.5, 3.2, p),
        THREE.MathUtils.lerp(12.0, 8.5, p)
      );
      camera.lookAt(0, 0.4, 0);
    } else if (openingTime < 4.5) {
      const p = (openingTime - 2.0) / 2.5;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      camera.position.set(
        THREE.MathUtils.lerp(-2.8, -1.2, smoothP),
        THREE.MathUtils.lerp(3.2, 1.6, smoothP),
        THREE.MathUtils.lerp(8.5, 5.8, smoothP)
      );
      camera.lookAt(
        THREE.MathUtils.lerp(0, -0.6, smoothP),
        THREE.MathUtils.lerp(0.4, 0.2, smoothP),
        0
      );
    } else if (openingTime < 6.5) {
      const p = (openingTime - 4.5) / 2.0;
      const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
      camera.position.set(
        THREE.MathUtils.lerp(-1.2, -0.4, smoothP),
        THREE.MathUtils.lerp(1.6, 1.2, smoothP),
        THREE.MathUtils.lerp(5.8, 4.8, smoothP)
      );
      camera.lookAt(
        THREE.MathUtils.lerp(-0.6, 0.2, smoothP),
        THREE.MathUtils.lerp(0.2, 0.35, smoothP),
        0
      );
    } else {
      camera.position.set(-0.4, 1.2, 4.8);
      camera.lookAt(0.2, 0.35, 0);
    }
  });

  if (!isOpeningActive) return null;

  return null;
};

export const WorldOpeningHUD: React.FC = () => {
  const { isOpeningActive, skipOpening } = useWorld();
  if (!isOpeningActive) return null;

  return (
    <div className="world-opening-overlay">
      <div className="opening-top-bar">
        <span className="opening-tag">
          <span className="signal-dot" /> INITIALIZING INTERACTIVE 3D WORLD
        </span>
        <button className="opening-skip-btn" onClick={skipOpening}>
          SKIP ESTABLISHING [ESC]
        </button>
      </div>

      <div className="opening-center-reveal">
        <p className="opening-eyebrow">THE DIGITAL ESTUARY</p>
        <h1 className="opening-title">
          <span>ADITYAGIRI</span>
          <span className="indent">GOSWAMI</span>
        </h1>
        <p className="opening-role">FULL STACK &amp; BLOCKCHAIN DEVELOPER</p>
      </div>
    </div>
  );
};
