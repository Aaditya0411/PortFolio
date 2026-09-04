import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FishermanProps {
  castProgress: number;
  isCasting: boolean;
  targetPos?: [number, number, number];
  onTipPositionUpdate?: (pos: THREE.Vector3) => void;
  scale?: number;
  compact?: boolean;
  introPhase?: string;
  introTime?: number;
}

export const FishermanCharacter: React.FC<FishermanProps> = ({
  castProgress,
  isCasting,
  targetPos = [2.5, 0.5, -1],
  onTipPositionUpdate,
  scale = 1,
  compact = false,
  introPhase,
  introTime = 0,
}) => {
  const rootGroup = useRef<THREE.Group>(null);
  const yawGroup = useRef<THREE.Group>(null);
  const torsoGroup = useRef<THREE.Group>(null);
  const armGroup = useRef<THREE.Group>(null);
  const rodBase = useRef<THREE.Group>(null);
  const rodMid = useRef<THREE.Group>(null);
  const rodTip = useRef<THREE.Group>(null);
  const tipMarker = useRef<THREE.Mesh>(null);
  const boatGroup = useRef<THREE.Group>(null);

  const worldTipPos = useMemo(() => new THREE.Vector3(), []);
  const tempTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Boat / Vessel subtle water bobbing & tilting
    if (boatGroup.current) {
      boatGroup.current.position.y = Math.sin(t * 1.5) * 0.03 - 0.01;
      boatGroup.current.rotation.z = Math.sin(t * 1.1) * 0.02;
      boatGroup.current.rotation.x = Math.cos(t * 0.9) * 0.015;
    }

    // 2. Yaw towards target when casting or in intro
    if (yawGroup.current) {
      if ((introPhase && introPhase !== 'dark') || (isCasting && targetPos)) {
        tempTarget.set(targetPos[0], targetPos[1], targetPos[2]);
        const targetAngle = Math.atan2(tempTarget.x, tempTarget.z) + Math.PI;
        yawGroup.current.rotation.y = THREE.MathUtils.damp(
          yawGroup.current.rotation.y,
          targetAngle,
          3.5,
          delta
        );
      } else {
        const idleYaw = Math.sin(t * 0.5) * 0.1 - 0.15;
        yawGroup.current.rotation.y = THREE.MathUtils.damp(
          yawGroup.current.rotation.y,
          idleYaw,
          2,
          delta
        );
      }
    }

    // 3. Torso, Arm & Rod kinematics
    if (torsoGroup.current && armGroup.current && rodMid.current && rodTip.current) {
      if (introPhase) {
        // Dedicated, highly readable intro kinematics
        switch (introPhase) {
          case 'dark':
          case 'reveal': {
            // Idle breathing & observant posture
            const breath = Math.sin(t * 1.8) * 0.02;
            torsoGroup.current.rotation.x = THREE.MathUtils.damp(torsoGroup.current.rotation.x, breath, 2.5, delta);
            armGroup.current.rotation.x = THREE.MathUtils.damp(armGroup.current.rotation.x, -0.32, 2.5, delta);
            rodMid.current.rotation.x = THREE.MathUtils.damp(rodMid.current.rotation.x, 0, 3, delta);
            rodTip.current.rotation.x = THREE.MathUtils.damp(rodTip.current.rotation.x, 0, 3, delta);
            break;
          }
          case 'windup': {
            // 2.2s - 3.5s:
            // 2.2s - 3.1s: pulls rod backward
            // 3.1s - 3.5s: pauses cleanly at apex so viewer clearly anticipates the cast
            let p = 1;
            if (introTime >= 2.2 && introTime < 3.1) {
              p = (introTime - 2.2) / 0.9;
            } else if (introTime >= 3.1) {
              p = 1; // Hold steady at apex!
            }
            const smoothP = THREE.MathUtils.smoothstep(p, 0, 1);
            torsoGroup.current.rotation.x = THREE.MathUtils.lerp(0, 0.24, smoothP);
            armGroup.current.rotation.x = THREE.MathUtils.lerp(-0.32, 0.76, smoothP);
            rodMid.current.rotation.x = THREE.MathUtils.lerp(0, 0.22, smoothP);
            rodTip.current.rotation.x = THREE.MathUtils.lerp(0, 0.28, smoothP);
            break;
          }
          case 'cast': {
            // 3.5s - 4.5s:
            // 3.5s - 3.85s: explosive forward whip snap!
            // 3.85s - 4.5s: follow-through posture
            let p = 1;
            if (introTime >= 3.5 && introTime < 3.9) {
              p = (introTime - 3.5) / 0.4;
              const snapP = Math.sin(p * Math.PI * 0.5);
              torsoGroup.current.rotation.x = THREE.MathUtils.lerp(0.24, -0.32, snapP);
              armGroup.current.rotation.x = THREE.MathUtils.lerp(0.76, -0.88, snapP);
              rodMid.current.rotation.x = THREE.MathUtils.lerp(0.22, -0.38, snapP);
              rodTip.current.rotation.x = THREE.MathUtils.lerp(0.28, -0.48, snapP);
            } else {
              torsoGroup.current.rotation.x = THREE.MathUtils.damp(torsoGroup.current.rotation.x, -0.15, 3, delta);
              armGroup.current.rotation.x = THREE.MathUtils.damp(armGroup.current.rotation.x, -0.65, 3, delta);
              rodMid.current.rotation.x = THREE.MathUtils.damp(rodMid.current.rotation.x, -0.1, 4, delta);
              rodTip.current.rotation.x = THREE.MathUtils.damp(rodTip.current.rotation.x, -0.12, 4, delta);
            }
            break;
          }
          case 'hook': {
            // 4.5s - 5.5s: Impact recoil and micro-vibration
            const hum = Math.sin(t * 35) * 0.02;
            torsoGroup.current.rotation.x = THREE.MathUtils.damp(torsoGroup.current.rotation.x, 0.05, 3, delta);
            armGroup.current.rotation.x = THREE.MathUtils.damp(armGroup.current.rotation.x, -0.45, 3, delta);
            rodMid.current.rotation.x = THREE.MathUtils.damp(rodMid.current.rotation.x, 0.15 + hum, 4, delta);
            rodTip.current.rotation.x = THREE.MathUtils.damp(rodTip.current.rotation.x, 0.25 + hum * 1.5, 4, delta);
            break;
          }
          case 'pull':
          case 'transition': {
            // 5.5s - 7.0s: Fisherman braces and pulls! Rod bends under heavy tension!
            torsoGroup.current.rotation.x = THREE.MathUtils.damp(torsoGroup.current.rotation.x, 0.28, 3, delta);
            armGroup.current.rotation.x = THREE.MathUtils.damp(armGroup.current.rotation.x, -0.18, 3, delta);
            // Dynamic rod bend curve:
            rodMid.current.rotation.x = THREE.MathUtils.damp(rodMid.current.rotation.x, 0.42, 3, delta);
            rodTip.current.rotation.x = THREE.MathUtils.damp(rodTip.current.rotation.x, 0.65, 3, delta);
            break;
          }
          default:
            break;
        }
      } else if (isCasting) {
        // Hero section interactive casting kinematics
        if (castProgress < 0.25) {
          const p = castProgress / 0.25;
          torsoGroup.current.rotation.x = THREE.MathUtils.lerp(0, 0.22, p);
          armGroup.current.rotation.x = THREE.MathUtils.lerp(-0.35, 0.65, p);
          rodMid.current.rotation.x = THREE.MathUtils.lerp(0, 0.2, p);
          rodTip.current.rotation.x = THREE.MathUtils.lerp(0, 0.25, p);
        } else if (castProgress < 0.5) {
          const p = (castProgress - 0.25) / 0.25;
          torsoGroup.current.rotation.x = THREE.MathUtils.lerp(0.22, -0.32, p);
          armGroup.current.rotation.x = THREE.MathUtils.lerp(0.65, -0.85, p);
          rodMid.current.rotation.x = THREE.MathUtils.lerp(0.2, -0.35, p);
          rodTip.current.rotation.x = THREE.MathUtils.lerp(0.25, -0.45, p);
        } else if (castProgress < 0.72) {
          const p = (castProgress - 0.5) / 0.22;
          torsoGroup.current.rotation.x = THREE.MathUtils.lerp(-0.32, 0.18, p);
          armGroup.current.rotation.x = THREE.MathUtils.lerp(-0.85, -0.2, p);
          rodMid.current.rotation.x = THREE.MathUtils.lerp(-0.35, 0.45, p);
          rodTip.current.rotation.x = THREE.MathUtils.lerp(-0.45, 0.6, p);
        } else {
          const p = (castProgress - 0.72) / 0.28;
          torsoGroup.current.rotation.x = THREE.MathUtils.lerp(0.18, 0, p);
          armGroup.current.rotation.x = THREE.MathUtils.lerp(-0.2, -0.35, p);
          rodMid.current.rotation.x = THREE.MathUtils.lerp(0.45, 0, p);
          rodTip.current.rotation.x = THREE.MathUtils.lerp(0.6, 0, p);
        }
      } else {
        // Hero section idle
        const breath = Math.sin(t * 2) * 0.02;
        torsoGroup.current.rotation.x = THREE.MathUtils.damp(torsoGroup.current.rotation.x, breath, 2.5, delta);
        armGroup.current.rotation.x = THREE.MathUtils.damp(armGroup.current.rotation.x, -0.35 + Math.sin(t * 1.5) * 0.03, 2.5, delta);
        rodMid.current.rotation.x = THREE.MathUtils.damp(rodMid.current.rotation.x, 0, 3, delta);
        rodTip.current.rotation.x = THREE.MathUtils.damp(rodTip.current.rotation.x, 0, 3, delta);
      }
    }

    // 4. Update tip world coordinate for the fishing line
    if (tipMarker.current && onTipPositionUpdate) {
      tipMarker.current.getWorldPosition(worldTipPos);
      onTipPositionUpdate(worldTipPos);
    }
  });

  return (
    <group ref={rootGroup} scale={[scale, scale, scale]}>
      {/* Skiff / Vantage Vessel */}
      <group ref={boatGroup} position={[0, -0.4, 0]}>
        {/* Sleek Faceted Hull */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.72, 0.48, 0.3, 6]} />
          <meshStandardMaterial color="#20232a" roughness={0.62} metalness={0.28} flatShading />
        </mesh>
        {/* Forward deck taper */}
        <mesh castShadow receiveShadow position={[0, 0.02, 0.72]} rotation={[-0.18, 0, 0]}>
          <coneGeometry args={[0.56, 0.82, 5]} />
          <meshStandardMaterial color="#252830" roughness={0.65} metalness={0.25} flatShading />
        </mesh>
        {/* Waterline glowing edge / seam */}
        <mesh position={[0, -0.06, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.74, 24]} />
          <meshBasicMaterial color="#d6483e" transparent opacity={0.4} />
        </mesh>
        {/* Minimalist Lantern */}
        <group position={[-0.38, 0.2, 0.45]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.14, 0.08]} />
            <meshStandardMaterial color="#282b34" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#ff4a38" toneMapped={false} />
          </mesh>
          <pointLight color="#ff4a38" intensity={compact ? 0.4 : 0.9} distance={2.0} decay={2} />
        </group>
      </group>

      {/* Fisherman Body Hierarchy */}
      <group ref={yawGroup} position={[0, -0.15, 0]}>
        {/* Lower body / Legs braced on vessel */}
        <mesh position={[0, 0.1, -0.08]} castShadow>
          <boxGeometry args={[0.42, 0.26, 0.38]} />
          <meshStandardMaterial color="#22252c" roughness={0.7} metalness={0.2} flatShading />
        </mesh>

        {/* Torso & Trench Coat */}
        <group ref={torsoGroup} position={[0, 0.24, 0]}>
          {/* Main Anorak / Parka body */}
          <mesh castShadow position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.23, 0.27, 0.52, 6]} />
            <meshStandardMaterial color="#292d37" roughness={0.52} metalness={0.22} flatShading />
          </mesh>
          {/* High sculptural collar */}
          <mesh castShadow position={[0, 0.54, 0.02]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.17, 0.2, 0.14, 6]} />
            <meshStandardMaterial color="#323642" roughness={0.55} metalness={0.25} flatShading />
          </mesh>

          {/* Head & Stylized Hood / Sou'wester */}
          <group position={[0, 0.64, 0]}>
            {/* Deep mysterious hooded head */}
            <mesh castShadow>
              <sphereGeometry args={[0.14, 8, 8]} />
              <meshStandardMaterial color="#1c1e24" roughness={0.85} />
            </mesh>
            {/* Angled Sou'wester Brim casting editorial silhouette */}
            <mesh position={[0, 0.06, -0.02]} rotation={[0.25, 0, 0]}>
              <coneGeometry args={[0.29, 0.18, 7]} />
              <meshStandardMaterial color="#2b2e38" roughness={0.65} metalness={0.28} flatShading />
            </mesh>
            {/* Clean Silver/Off-White Brim Edge highlight */}
            <mesh position={[0, -0.02, 0.06]} rotation={[0.25, 0, 0]}>
              <ringGeometry args={[0.27, 0.29, 16]} />
              <meshBasicMaterial color="#e5ecf4" transparent opacity={0.8} />
            </mesh>
          </group>

          {/* Left Arm (holding support) */}
          <group position={[-0.26, 0.42, 0.05]} rotation={[0.3, 0, 0.4]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.065, 0.075, 0.32, 5]} />
              <meshStandardMaterial color="#2b2e38" roughness={0.65} flatShading />
            </mesh>
            {/* Left Forearm resting on reel/knee */}
            <group position={[0, -0.18, 0.08]} rotation={[-0.7, 0.3, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.055, 0.065, 0.28, 5]} />
                <meshStandardMaterial color="#2b2e38" roughness={0.65} flatShading />
              </mesh>
            </group>
          </group>

          {/* Right Arm & Shoulder (Fishing Rod Arm) */}
          <group ref={armGroup} position={[0.26, 0.42, 0.05]} rotation={[-0.35, -0.15, -0.2]}>
            {/* Upper Arm */}
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.08, 0.35, 5]} />
              <meshStandardMaterial color="#2b2e38" roughness={0.65} flatShading />
            </mesh>

            {/* Forearm & Hand */}
            <group position={[0, -0.22, 0.12]} rotation={[-0.9, 0.2, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.06, 0.068, 0.32, 5]} />
                <meshStandardMaterial color="#272a32" roughness={0.65} flatShading />
              </mesh>
              {/* Hand Grip */}
              <mesh position={[0, -0.16, 0.04]} castShadow>
                <boxGeometry args={[0.07, 0.09, 0.08]} />
                <meshStandardMaterial color="#363942" roughness={0.7} metalness={0.2} />
              </mesh>

              {/* Fishing Rod Hierarchy */}
              <group ref={rodBase} position={[0, -0.16, 0.08]} rotation={[0.85, 0, 0]}>
                {/* Rod Handle / Reel Seat */}
                <mesh castShadow position={[0, 0.12, 0]}>
                  <cylinderGeometry args={[0.026, 0.028, 0.34, 8]} />
                  <meshStandardMaterial color="#363942" roughness={0.6} metalness={0.3} />
                </mesh>
                {/* Baitcasting Reel */}
                <group position={[0, 0.18, 0.04]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.04, 0.04, 0.048, 12]} />
                    <meshStandardMaterial color="#3c404c" metalness={0.88} roughness={0.2} />
                  </mesh>
                  {/* Restrained Crimson Spool line */}
                  <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.027, 0.027, 0.042, 12]} />
                    <meshBasicMaterial color="#d6483e" toneMapped={false} />
                  </mesh>
                </group>

                {/* Rod Mid Segment (Graphite Shaft) */}
                <group ref={rodMid} position={[0, 0.3, 0]}>
                  <mesh castShadow position={[0, 0.45, 0]}>
                    <cylinderGeometry args={[0.018, 0.024, 0.9, 8]} />
                    <meshStandardMaterial color="#4a505e" roughness={0.32} metalness={0.45} />
                  </mesh>
                  {/* Guide eyelet rings (Polished Stainless Steel) */}
                  {[0.25, 0.55, 0.85].map((gy, gidx) => (
                    <mesh key={gidx} position={[0, gy, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                      <torusGeometry args={[0.02, 0.0035, 6, 12]} />
                      <meshBasicMaterial color="#f0f4f8" />
                    </mesh>
                  ))}

                  {/* Rod Tip Segment (Flexes dynamically) */}
                  <group ref={rodTip} position={[0, 0.9, 0]}>
                    <mesh castShadow position={[0, 0.5, 0]}>
                      <cylinderGeometry args={[0.009, 0.017, 1.0, 8]} />
                      <meshStandardMaterial color="#4a505e" roughness={0.3} metalness={0.5} />
                    </mesh>
                    {/* Tip Guide Eyelet */}
                    <mesh position={[0, 0.5, 0.016]} rotation={[Math.PI / 2, 0, 0]}>
                      <torusGeometry args={[0.015, 0.003, 6, 12]} />
                      <meshBasicMaterial color="#f0f4f8" />
                    </mesh>
                    {/* Glowing Crimson Tip Guide Beacon */}
                    <mesh ref={tipMarker} position={[0, 1.0, 0]}>
                      <sphereGeometry args={[0.032, 12, 12]} />
                      <meshBasicMaterial color="#ff4a3a" toneMapped={false} />
                    </mesh>
                    <pointLight
                      position={[0, 1.0, 0]}
                      color="#ff4a3a"
                      intensity={0.6}
                      distance={0.9}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
