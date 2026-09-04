import React from 'react';
import { ArrivalWater } from './ArrivalWater';
import { ArrivalAtmosphere } from './ArrivalAtmosphere';
import { ArrivalFisherman } from './ArrivalFisherman';
import { ArrivalCore } from './ArrivalCore';

export const WorldEnvironment: React.FC = () => {
  return (
    <>
      {/* 1. Natural Nocturnal Estuary Lighting */}
      {/* Soft deep twilight ambient sky illumination */}
      <ambientLight intensity={0.42} color="#091322" />

      {/* Gentle Nocturnal Moonlight: Angled from high celestial sphere to prevent harsh mirror specular wash */}
      <directionalLight
        position={[7.0, 14.0, -12]}
        intensity={0.55}
        color="#93c5fd"
        castShadow={false}
      />

      {/* Controlled Cool Rim & Fill Light: Crisp silhouette separation for the fisherman boat */}
      <directionalLight
        position={[-5.5, 3.5, 6.0]}
        intensity={0.45}
        color="#38bdf8"
        castShadow={false}
      />

      {/* Deep Atmospheric Horizon Fog */}
      <fogExp2 attach="fog" args={['#030712', 0.016]} />

      {/* 2. Living Undulating Water Surface */}
      <ArrivalWater />

      {/* 3. Atmospheric Depth, Mist & Celestial Moon */}
      <ArrivalAtmosphere />

      {/* 4. The Fisherman Inhabitant on his Skiff with Golden Lantern */}
      <ArrivalFisherman />

      {/* 5. Background Celestial Core Focal Element */}
      <ArrivalCore />
    </>
  );
};
