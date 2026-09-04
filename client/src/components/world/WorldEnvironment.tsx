import React from 'react';
import { ArrivalWater } from './ArrivalWater';
import { ArrivalAtmosphere } from './ArrivalAtmosphere';
import { ArrivalFisherman } from './ArrivalFisherman';
import { ArrivalCore } from './ArrivalCore';

export const WorldEnvironment: React.FC = () => {
  return (
    <>
      {/* 1. Natural Nocturnal Estuary Lighting */}
      {/* Deep twilight ambient sky illumination */}
      <ambientLight intensity={0.95} color="#15243c" />

      {/* Main Celestial Moonlight: Directly aligned with moon coordinates to cast glistening specular paths across water */}
      <directionalLight
        position={[3.6, 6.0, -20]}
        intensity={4.5}
        color="#f0f7ff"
        castShadow={false}
      />

      {/* Subtle Front-Fill Moonlight: Illuminates foreground boat contours and textures */}
      <directionalLight
        position={[-7, 8, 10]}
        intensity={1.2}
        color="#7dd3fc"
        castShadow={false}
      />

      {/* Soft Nautical Twilight Horizon Fog */}
      <fogExp2 attach="fog" args={['#060c18', 0.013]} />

      {/* 2. Living Undulating Water Surface */}
      <ArrivalWater />

      {/* 3. Atmospheric Ground Mist & Distant Megaliths */}
      <ArrivalAtmosphere />

      {/* 4. The Fisherman Inhabitant on his Skiff with Golden Lantern */}
      <ArrivalFisherman />

      {/* 5. Floating Origin Developer Core Artifact */}
      <ArrivalCore />
    </>
  );
};
