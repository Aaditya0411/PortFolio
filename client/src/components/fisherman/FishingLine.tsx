import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FishingLineProps {
  rodTipPos: THREE.Vector3;
  targetPos: [number, number, number];
  castProgress: number;
  isCasting: boolean;
  strikeCount: number;
  introPhase?: string;
  introTime?: number;
}

export const FishingLine: React.FC<FishingLineProps> = ({
  rodTipPos,
  targetPos,
  castProgress,
  isCasting,
  strikeCount,
  introPhase,
  introTime = 0,
}) => {
  const hookRef = useRef<THREE.Group>(null);
  const rippleRef = useRef<THREE.Mesh>(null);
  const rippleScale = useRef<number>(0);
  const trailRef1 = useRef<THREE.Mesh>(null);
  const trailRef2 = useRef<THREE.Mesh>(null);
  const trailRef3 = useRef<THREE.Mesh>(null);

  const prevHookPos1 = useRef<THREE.Vector3>(new THREE.Vector3());
  const prevHookPos2 = useRef<THREE.Vector3>(new THREE.Vector3());
  const prevHookPos3 = useRef<THREE.Vector3>(new THREE.Vector3());

  // Buffer geometry points for the line curve (40 segments for smooth curvature)
  const numPoints = 40;
  const linePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < numPoints; i++) {
      pts.push(new THREE.Vector3());
    }
    return pts;
  }, []);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [numPoints]);

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#f5efe6',
        transparent: true,
        opacity: 0.95,
        linewidth: 1,
      }),
    []
  );

  const threeLine = useMemo(
    () => new THREE.Line(lineGeometry, lineMaterial),
    [lineGeometry, lineMaterial]
  );

  const hookPos = useMemo(() => new THREE.Vector3(), []);
  const arcControl = useMemo(() => new THREE.Vector3(), []);
  const targetVec = useMemo(() => new THREE.Vector3(), []);

  // Update line curve and hook in frame loop
  useFrame((state) => {
    targetVec.set(targetPos[0], targetPos[1], targetPos[2]);
    const t = state.clock.getElapsedTime();

    if (introPhase) {
      // Precise timeline for intro (0.0s - 8.5s)
      switch (introPhase) {
        case 'dark':
        case 'reveal': {
          // Idle: Line drops straight down from rod tip by ~0.38m with gentle sway
          hookPos.copy(rodTipPos);
          hookPos.y -= 0.38;
          hookPos.z += 0.04;
          const sway = Math.sin(t * 2) * 0.015;
          hookPos.x += sway;

          for (let i = 0; i < numPoints; i++) {
            const frac = i / (numPoints - 1);
            linePoints[i].lerpVectors(rodTipPos, hookPos, frac);
            linePoints[i].x += Math.sin(frac * Math.PI) * sway * 0.5;
          }
          break;
        }
        case 'windup': {
          // 2.2s - 3.5s: Hook drawn snug beneath rod tip
          hookPos.copy(rodTipPos);
          hookPos.y -= 0.12;
          hookPos.z += 0.02;
          for (let i = 0; i < numPoints; i++) {
            const frac = i / (numPoints - 1);
            linePoints[i].lerpVectors(rodTipPos, hookPos, frac);
          }
          break;
        }
        case 'cast': {
          // 3.5s - 4.5s: Hook travels in visible ballistic arc toward Developer Core
          let flightT = 0;
          if (introTime >= 3.5 && introTime < 4.5) {
            flightT = Math.min((introTime - 3.5) / 1.0, 1);
          } else {
            flightT = 0.5;
          }

          // Smooth ballistic arc
          const smoothFlight = THREE.MathUtils.smoothstep(flightT, 0, 1);
          hookPos.lerpVectors(rodTipPos, targetVec, smoothFlight);
          const arcY = Math.sin(flightT * Math.PI) * 1.35;
          hookPos.y += arcY;

          // Line catenary sag during flight
          arcControl.lerpVectors(rodTipPos, hookPos, 0.5);
          arcControl.y -= (1 - flightT) * 0.6;

          for (let i = 0; i < numPoints; i++) {
            const frac = i / (numPoints - 1);
            const p1 = (1 - frac) * (1 - frac);
            const p2 = 2 * (1 - frac) * frac;
            const p3 = frac * frac;

            linePoints[i].x = p1 * rodTipPos.x + p2 * arcControl.x + p3 * hookPos.x;
            linePoints[i].y = p1 * rodTipPos.y + p2 * arcControl.y + p3 * hookPos.y;
            linePoints[i].z = p1 * rodTipPos.z + p2 * arcControl.z + p3 * hookPos.z;
          }
          break;
        }
        case 'hook': {
          // 4.5s - 5.5s: Hook anchors to target; line snaps straight taut with micro-hum
          hookPos.copy(targetVec);
          const hum = Math.sin(t * 45) * 0.006;
          for (let i = 0; i < numPoints; i++) {
            const frac = i / (numPoints - 1);
            linePoints[i].lerpVectors(rodTipPos, hookPos, frac);
            linePoints[i].y += Math.sin(frac * Math.PI) * hum;
          }
          break;
        }
        case 'pull': {
          // 5.5s - 7.0s: Target is towed toward camera; line remains straight and taut
          let pullP = 0;
          if (introTime >= 5.5 && introTime < 7.0) {
            pullP = (introTime - 5.5) / 1.5;
          }
          const currentTarget = targetVec.clone();
          currentTarget.z += pullP * 1.6;
          currentTarget.x -= pullP * 0.4;
          hookPos.copy(currentTarget);

          for (let i = 0; i < numPoints; i++) {
            const frac = i / (numPoints - 1);
            linePoints[i].lerpVectors(rodTipPos, hookPos, frac);
          }
          break;
        }
        case 'transition': {
          // 7.0s - 8.5s: Follow through
          let transP = 0;
          if (introTime >= 7.0) {
            transP = Math.min((introTime - 7.0) / 1.5, 1);
          }
          const currentTarget = targetVec.clone();
          currentTarget.z += 1.6 + transP * 2.2;
          currentTarget.x -= 0.4 + transP * 0.8;
          hookPos.copy(currentTarget);

          for (let i = 0; i < numPoints; i++) {
            const frac = i / (numPoints - 1);
            linePoints[i].lerpVectors(rodTipPos, hookPos, frac);
          }
          break;
        }
        default:
          break;
      }
    } else if (!isCasting) {
      // Hero section idle
      hookPos.copy(rodTipPos);
      hookPos.y -= 0.45;
      hookPos.z += 0.05;
      const sway = Math.sin(t * 2) * 0.02;
      hookPos.x += sway;

      for (let i = 0; i < numPoints; i++) {
        const frac = i / (numPoints - 1);
        linePoints[i].lerpVectors(rodTipPos, hookPos, frac);
        linePoints[i].x += Math.sin(frac * Math.PI) * sway * 0.5;
      }
    } else {
      // Hero section dynamic casting
      if (castProgress < 0.25) {
        hookPos.copy(rodTipPos);
        hookPos.y -= 0.15;
        for (let i = 0; i < numPoints; i++) {
          const frac = i / (numPoints - 1);
          linePoints[i].lerpVectors(rodTipPos, hookPos, frac);
        }
      } else if (castProgress < 0.65) {
        const flightT = (castProgress - 0.25) / 0.4;
        const arcY = Math.sin(flightT * Math.PI) * 1.5;
        hookPos.lerpVectors(rodTipPos, targetVec, flightT);
        hookPos.y += arcY;

        arcControl.lerpVectors(rodTipPos, hookPos, 0.5);
        arcControl.y -= (1 - flightT) * 0.7;

        for (let i = 0; i < numPoints; i++) {
          const frac = i / (numPoints - 1);
          const p1 = (1 - frac) * (1 - frac);
          const p2 = 2 * (1 - frac) * frac;
          const p3 = frac * frac;
          linePoints[i].x = p1 * rodTipPos.x + p2 * arcControl.x + p3 * hookPos.x;
          linePoints[i].y = p1 * rodTipPos.y + p2 * arcControl.y + p3 * hookPos.y;
          linePoints[i].z = p1 * rodTipPos.z + p2 * arcControl.z + p3 * hookPos.z;
        }
      } else if (castProgress < 0.78) {
        hookPos.copy(targetVec);
        const hum = Math.sin(t * 45) * 0.008;
        for (let i = 0; i < numPoints; i++) {
          const frac = i / (numPoints - 1);
          linePoints[i].lerpVectors(rodTipPos, hookPos, frac);
          linePoints[i].y += Math.sin(frac * Math.PI) * hum;
        }
      } else {
        const pullT = (castProgress - 0.78) / 0.22;
        const currentPull = targetVec.clone().lerp(rodTipPos, pullT * 0.35);
        hookPos.copy(currentPull);
        for (let i = 0; i < numPoints; i++) {
          const frac = i / (numPoints - 1);
          linePoints[i].lerpVectors(rodTipPos, hookPos, frac);
        }
      }
    }

    // Update positions buffer
    const posAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    for (let i = 0; i < numPoints; i++) {
      array[i * 3] = linePoints[i].x;
      array[i * 3 + 1] = linePoints[i].y;
      array[i * 3 + 2] = linePoints[i].z;
    }
    posAttr.needsUpdate = true;

    // Update hook object position
    if (hookRef.current) {
      hookRef.current.position.copy(hookPos);
    }

    // Restrained motion trail during flight only (3.5s - 4.5s)
    const isFlight = introPhase === 'cast' || (isCasting && castProgress >= 0.25 && castProgress < 0.65);
    if (isFlight) {
      prevHookPos3.current.copy(prevHookPos2.current);
      prevHookPos2.current.copy(prevHookPos1.current);
      prevHookPos1.current.copy(hookPos);

      if (trailRef1.current) {
        trailRef1.current.position.copy(prevHookPos1.current);
        trailRef1.current.visible = true;
      }
      if (trailRef2.current) {
        trailRef2.current.position.copy(prevHookPos2.current);
        trailRef2.current.visible = true;
      }
      if (trailRef3.current) {
        trailRef3.current.position.copy(prevHookPos3.current);
        trailRef3.current.visible = true;
      }
    } else {
      if (trailRef1.current) trailRef1.current.visible = false;
      if (trailRef2.current) trailRef2.current.visible = false;
      if (trailRef3.current) trailRef3.current.visible = false;
    }

    // Impact ripple animation at 4.5s
    if (rippleRef.current) {
      const isHit = introPhase === 'hook' || (isCasting && castProgress >= 0.65 && castProgress < 0.82);
      if (isHit) {
        let hitProgress = 0;
        if (introTime >= 4.5 && introTime < 5.5) {
          hitProgress = (introTime - 4.5) / 1.0;
        } else if (castProgress >= 0.65) {
          hitProgress = (castProgress - 0.65) / 0.17;
        }
        rippleScale.current = 0.2 + hitProgress * 0.9;
        rippleRef.current.scale.set(rippleScale.current, rippleScale.current, rippleScale.current);
        (rippleRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.7 - hitProgress * 0.7);
        rippleRef.current.position.copy(targetVec);
      } else {
        rippleScale.current = 0.1;
        (rippleRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
      }
    }
  });

  return (
    <group>
      {/* 3D Physical Fishing Line rendered via primitive */}
      <primitive object={threeLine} />

      {/* Restrained Flight Trail Markers (Active only during cast flight) */}
      <mesh ref={trailRef1} visible={false}>
        <sphereGeometry args={[0.016, 6, 6]} />
        <meshBasicMaterial color="#ff4438" transparent opacity={0.65} />
      </mesh>
      <mesh ref={trailRef2} visible={false}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshBasicMaterial color="#ff4438" transparent opacity={0.4} />
      </mesh>
      <mesh ref={trailRef3} visible={false}>
        <sphereGeometry args={[0.009, 6, 6]} />
        <meshBasicMaterial color="#ff4438" transparent opacity={0.2} />
      </mesh>

      {/* Sculptural Hook & Lure Assembly */}
      <group ref={hookRef}>
        {/* Polished Chrome Top Collar */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.018, 0.022, 0.025, 8]} />
          <meshStandardMaterial color="#f0f4f8" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Compact Crimson Lacquer Lure Body */}
        <mesh position={[0, 0.01, 0]}>
          <coneGeometry args={[0.034, 0.065, 8]} />
          <meshStandardMaterial color="#d63b2f" roughness={0.25} metalness={0.5} />
        </mesh>
        {/* Curved Polished Hook */}
        <mesh position={[0, -0.045, 0]} rotation={[0, 0, -0.4]}>
          <torusGeometry args={[0.028, 0.0055, 6, 12, Math.PI * 1.4]} />
          <meshStandardMaterial color="#f0f4f8" metalness={0.95} roughness={0.12} />
        </mesh>
        {/* Subtle Hook Point Light */}
        <pointLight color="#ff3b30" intensity={0.9} distance={1.2} />
      </group>

      {/* Target Impact Ripple Ring */}
      <mesh ref={rippleRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshBasicMaterial color="#ff4438" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
