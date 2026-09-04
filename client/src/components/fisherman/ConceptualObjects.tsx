import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ObjectReactionProps {
  isTarget: boolean;
  castProgress: number;
  strikeCount: number;
}

// 1. REVIX: Conceptual Version Control / Repository / Commit & Branch Object
export const RevixConceptualObject: React.FC<{
  position?: [number, number, number];
  scale?: number;
  reaction?: ObjectReactionProps;
}> = ({ position = [0, 0, 0], scale = 1, reaction }) => {
  const group = useRef<THREE.Group>(null);
  const commitRing = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y += delta * 0.4;
    if (commitRing.current) {
      commitRing.current.rotation.z += delta * 0.8;
      commitRing.current.rotation.x = Math.sin(t * 1.5) * 0.2;
    }

    // Reaction when struck by hook
    if (reaction?.isTarget && reaction.castProgress >= 0.65) {
      if (reaction.castProgress < 0.78) {
        // Impact vibration
        group.current.position.x = position[0] + Math.sin(t * 50) * 0.04;
        group.current.position.y = position[1] + Math.cos(t * 40) * 0.04;
      } else {
        // Reeling pull toward camera
        const pull = (reaction.castProgress - 0.78) / 0.22;
        group.current.position.z = position[2] + pull * 1.5;
        group.current.scale.setScalar(scale * (1 + pull * 0.25));
      }
    } else {
      group.current.position.set(position[0], position[1], position[2]);
      group.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Central Commit Master Node */}
      <mesh castShadow>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.92} roughness={0.2} />
        <Edges threshold={15} color="#d6483e" linewidth={1} />
      </mesh>

      {/* Orbiting Branch Nodes (Git Tree Branches) */}
      <group position={[0.48, 0.22, 0]}>
        <mesh>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#252525" metalness={0.8} roughness={0.3} />
          <Edges threshold={15} color="#e5ddd3" linewidth={0.8} />
        </mesh>
        {/* Branch connector line */}
        <mesh position={[-0.24, -0.11, 0]} rotation={[0, 0, 0.45]}>
          <cylinderGeometry args={[0.008, 0.008, 0.52, 6]} />
          <meshBasicMaterial color="#d6483e" transparent opacity={0.7} />
        </mesh>
      </group>

      <group position={[-0.45, -0.28, 0.15]}>
        <mesh>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.3} />
          <Edges threshold={15} color="#e5ddd3" linewidth={0.8} />
        </mesh>
        {/* Branch connector line */}
        <mesh position={[0.22, 0.14, -0.07]} rotation={[0, 0, -0.55]}>
          <cylinderGeometry args={[0.008, 0.008, 0.48, 6]} />
          <meshBasicMaterial color="#d6483e" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Commit History Torus Ring */}
      <mesh ref={commitRing}>
        <torusGeometry args={[0.62, 0.012, 8, 32]} />
        <meshBasicMaterial color="#d6483e" transparent opacity={0.85} />
      </mesh>
    </group>
  );
};

// 2. BNBREEZE: Conceptual Architectural Property / Map & Spatial Object
export const BnBreezeConceptualObject: React.FC<{
  position?: [number, number, number];
  scale?: number;
  reaction?: ObjectReactionProps;
}> = ({ position = [0, 0, 0], scale = 1, reaction }) => {
  const group = useRef<THREE.Group>(null);
  const portalRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y += delta * 0.35;
    if (portalRef.current) {
      portalRef.current.rotation.y -= delta * 0.5;
    }

    if (reaction?.isTarget && reaction.castProgress >= 0.65) {
      if (reaction.castProgress < 0.78) {
        group.current.position.x = position[0] + Math.sin(t * 48) * 0.04;
        group.current.position.y = position[1] + Math.cos(t * 36) * 0.04;
      } else {
        const pull = (reaction.castProgress - 0.78) / 0.22;
        group.current.position.z = position[2] + pull * 1.5;
        group.current.scale.setScalar(scale * (1 + pull * 0.25));
      }
    } else {
      group.current.position.set(position[0], position[1], position[2]);
      group.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Isometric Architectural Pavilion / Spatial Frame */}
      <mesh castShadow>
        <boxGeometry args={[0.62, 0.55, 0.62]} />
        <meshStandardMaterial
          color="#121212"
          metalness={0.9}
          roughness={0.25}
          transparent
          opacity={0.82}
        />
        <Edges threshold={15} color="#e5ddd3" linewidth={1} />
      </mesh>

      {/* Internal Illuminated Entrance Portal */}
      <mesh ref={portalRef} position={[0, -0.05, 0]}>
        <boxGeometry args={[0.24, 0.38, 0.04]} />
        <meshBasicMaterial color="#d6483e" toneMapped={false} />
      </mesh>

      {/* Spatial Foundation Grid Plane */}
      <mesh position={[0, -0.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.85, 0.85, 4, 4]} />
        <meshBasicMaterial color="#2a2927" wireframe />
      </mesh>

      {/* Elevation Compass Ring */}
      <mesh position={[0, -0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.57, 24]} />
        <meshBasicMaterial color="#d6483e" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

// 3. AICTE: Conceptual Document + SHA-256 + Blockchain Ledger Object
export const AicteConceptualObject: React.FC<{
  position?: [number, number, number];
  scale?: number;
  reaction?: ObjectReactionProps;
}> = ({ position = [0, 0, 0], scale = 1, reaction }) => {
  const group = useRef<THREE.Group>(null);
  const hashRing = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y += delta * 0.3;
    if (hashRing.current) {
      hashRing.current.rotation.z += delta * 0.7;
    }

    if (reaction?.isTarget && reaction.castProgress >= 0.65) {
      if (reaction.castProgress < 0.78) {
        group.current.position.x = position[0] + Math.sin(t * 45) * 0.04;
        group.current.position.y = position[1] + Math.cos(t * 42) * 0.04;
      } else {
        const pull = (reaction.castProgress - 0.78) / 0.22;
        group.current.position.z = position[2] + pull * 1.5;
        group.current.scale.setScalar(scale * (1 + pull * 0.25));
      }
    } else {
      group.current.position.set(position[0], position[1], position[2]);
      group.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Precision Ledger Tablet / Document Block */}
      <mesh castShadow>
        <boxGeometry args={[0.54, 0.72, 0.1]} />
        <meshStandardMaterial color="#161616" metalness={0.92} roughness={0.18} />
        <Edges threshold={15} color="#e5ddd3" linewidth={1} />
      </mesh>

      {/* Cryptographic SHA-256 Hash Seal */}
      <mesh position={[0, 0.12, 0.06]}>
        <cylinderGeometry args={[0.16, 0.16, 0.02, 8]} />
        <meshStandardMaterial color="#262522" metalness={0.95} roughness={0.2} />
        <Edges threshold={15} color="#d6483e" linewidth={1.2} />
      </mesh>

      {/* Cryptographic Verification Perimeter Ring */}
      <mesh ref={hashRing} position={[0, 0.12, 0.07]}>
        <ringGeometry args={[0.22, 0.235, 16]} />
        <meshBasicMaterial color="#d6483e" toneMapped={false} />
      </mesh>

      {/* Immutable Blockchain Ledger Block Slabs */}
      <group position={[0, -0.22, 0.06]}>
        {[-0.12, 0, 0.12].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.09, 0.07, 0.02]} />
            <meshStandardMaterial color="#222" metalness={0.8} />
            <Edges threshold={15} color="#8a8882" linewidth={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// 4. LOTTERY SMART CONTRACT: Conceptual Ethereum / Smart Contract / Transaction Object
export const LotteryConceptualObject: React.FC<{
  position?: [number, number, number];
  scale?: number;
  reaction?: ObjectReactionProps;
}> = ({ position = [0, 0, 0], scale = 1, reaction }) => {
  const group = useRef<THREE.Group>(null);
  const ethTop = useRef<THREE.Mesh>(null);
  const ethBottom = useRef<THREE.Mesh>(null);
  const tokenRing = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y += delta * 0.45;
    if (tokenRing.current) {
      tokenRing.current.rotation.x = Math.PI / 2 + Math.sin(t * 1.2) * 0.3;
      tokenRing.current.rotation.y += delta * 0.9;
    }

    if (reaction?.isTarget && reaction.castProgress >= 0.65) {
      if (reaction.castProgress < 0.78) {
        group.current.position.x = position[0] + Math.sin(t * 52) * 0.04;
        group.current.position.y = position[1] + Math.cos(t * 44) * 0.04;
      } else {
        const pull = (reaction.castProgress - 0.78) / 0.22;
        group.current.position.z = position[2] + pull * 1.5;
        group.current.scale.setScalar(scale * (1 + pull * 0.25));
      }
    } else {
      group.current.position.set(position[0], position[1], position[2]);
      group.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Ethereum Diamond Faceted Prism (Upper pyramid) */}
      <mesh ref={ethTop} position={[0, 0.16, 0]} castShadow>
        <coneGeometry args={[0.34, 0.52, 4]} />
        <meshStandardMaterial color="#1f1e1c" metalness={0.95} roughness={0.15} flatShading />
        <Edges threshold={15} color="#d6483e" linewidth={1.1} />
      </mesh>

      {/* Ethereum Diamond Faceted Prism (Lower pyramid) */}
      <mesh ref={ethBottom} position={[0, -0.18, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <coneGeometry args={[0.34, 0.46, 4]} />
        <meshStandardMaterial color="#141414" metalness={0.95} roughness={0.18} flatShading />
        <Edges threshold={15} color="#e5ddd3" linewidth={1.0} />
      </mesh>

      {/* Orbiting Transaction Matrix Ring */}
      <mesh ref={tokenRing}>
        <torusGeometry args={[0.55, 0.012, 6, 24]} />
        <meshBasicMaterial color="#d6483e" toneMapped={false} />
      </mesh>
    </group>
  );
};

// 5. INTRO DEVELOPER CORE ARTIFACT: Crystalline developer/system core
export const IntroDeveloperCoreArtifact: React.FC<{
  position?: [number, number, number];
  scale?: number;
  reaction?: ObjectReactionProps;
  introPhase?: string;
  introTime?: number;
}> = ({ position = [0, 0.2, 0], scale = 1, reaction, introPhase, introTime = 0 }) => {
  const group = useRef<THREE.Group>(null);
  const primaryRing = useRef<THREE.Mesh>(null);
  const secondaryRing = useRef<THREE.Mesh>(null);
  const coreMesh = useRef<THREE.Mesh>(null);
  const coreGlow = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle, elegant idle rotation
    if (coreMesh.current) {
      coreMesh.current.rotation.y += delta * 0.4;
      coreMesh.current.rotation.x = Math.sin(t * 0.9) * 0.08;
    }
    if (primaryRing.current) {
      primaryRing.current.rotation.z += delta * 0.5;
      primaryRing.current.rotation.x = Math.cos(t * 0.7) * 0.15;
    }
    if (secondaryRing.current) {
      secondaryRing.current.rotation.y -= delta * 0.35;
      secondaryRing.current.rotation.z = Math.sin(t * 1.1) * 0.12;
    }

    // Reaction states based on intro progress or reaction props
    const isImpact = introPhase === 'hook' || (reaction?.isTarget && reaction.castProgress >= 0.65 && reaction.castProgress < 0.78);
    const isPull = introPhase === 'pull' || (reaction?.isTarget && reaction.castProgress >= 0.78);
    const isTransition = introPhase === 'transition';

    if (isImpact) {
      // 4.5s–5.5s: Impact recoil and micro-vibration
      const recoilZ = -0.12 + Math.sin(t * 40) * 0.02;
      group.current.position.set(position[0], position[1] + Math.cos(t * 30) * 0.015, position[2] + recoilZ);
      group.current.scale.setScalar(scale * 1.05);
      if (coreGlow.current) {
        coreGlow.current.intensity = 3.2 + Math.sin(t * 20) * 0.6;
      }
    } else if (isPull) {
      // 5.5s–7.0s: Fisherman pulls target smoothly toward camera
      // Smooth travel along Z
      let pullProgress = 0;
      if (introTime >= 5.5 && introTime < 7.0) {
        pullProgress = (introTime - 5.5) / 1.5;
      } else if (reaction?.castProgress) {
        pullProgress = (reaction.castProgress - 0.78) / 0.22;
      }
      const travelZ = position[2] + pullProgress * 1.6;
      group.current.position.set(
        position[0] - pullProgress * 0.4,
        position[1] + Math.sin(t * 2) * 0.02,
        travelZ
      );
      group.current.scale.setScalar(scale * (1 + pullProgress * 0.25));
      if (coreGlow.current) {
        coreGlow.current.intensity = 2.4;
      }
    } else if (isTransition) {
      // 7.0s–8.5s: Camera tracks target into hero
      let transProgress = 0;
      if (introTime >= 7.0) {
        transProgress = Math.min((introTime - 7.0) / 1.5, 1);
      }
      group.current.position.set(
        position[0] - 0.4 - transProgress * 0.8,
        position[1],
        position[2] + 1.6 + transProgress * 2.2
      );
      group.current.scale.setScalar(scale * (1.25 + transProgress * 0.8));
    } else {
      // Normal hovering state
      group.current.position.set(position[0], position[1] + Math.sin(t * 1.2) * 0.03, position[2]);
      group.current.scale.setScalar(scale);
      if (coreGlow.current) {
        coreGlow.current.intensity = 2.0;
      }
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* 1. Central Crystalline Geometric Core (Precision Octahedron) */}
      <mesh ref={coreMesh} castShadow receiveShadow>
        <octahedronGeometry args={[0.54, 0]} />
        <meshStandardMaterial
          color="#20232a"
          metalness={0.92}
          roughness={0.18}
          flatShading
        />
        <Edges threshold={15} color="#e5ecf4" linewidth={1.2} />
      </mesh>

      {/* Internal Luminous Crimson Nucleus */}
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#ff3b30" toneMapped={false} />
      </mesh>
      <pointLight ref={coreGlow} color="#ff4438" intensity={2.2} distance={2.8} />

      {/* 2. Primary Equatorial Structural Ring */}
      <mesh ref={primaryRing}>
        <torusGeometry args={[0.76, 0.012, 6, 36]} />
        <meshStandardMaterial color="#3a3e4a" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* 2b. Secondary Inclined Structural Meridian Ring */}
      <mesh ref={secondaryRing} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.66, 0.009, 6, 32]} />
        <meshBasicMaterial color="#d6483e" transparent opacity={0.8} />
      </mesh>

      {/* 3. Small Connected Technical Details (4 Orthogonal Node Pins) */}
      {[
        [0.48, 0, 0],
        [-0.48, 0, 0],
        [0, 0.48, 0],
        [0, -0.48, 0],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          <mesh>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial color="#2d313b" metalness={0.9} roughness={0.2} />
            <Edges threshold={15} color="#e5ecf4" linewidth={0.8} />
          </mesh>
          <mesh position={[pos[0] * -0.5, pos[1] * -0.5, 0]}>
            <cylinderGeometry
              args={[
                0.006,
                0.006,
                0.24,
                4,
              ]}
            />
            <meshBasicMaterial color="#e5ecf4" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
