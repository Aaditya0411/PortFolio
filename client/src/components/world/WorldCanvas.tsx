import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WorldCameraRig } from './WorldCameraRig';
import { WorldEnvironment } from './WorldEnvironment';


export const WorldCanvas: React.FC = () => {
  return (
    <div
      className="world-canvas-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
    >
      <Canvas
        frameloop="always"
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.25)]}
        camera={{ position: [-0.4, 1.2, 4.8], fov: 40 }}
        shadows={false}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          precision: 'mediump',
        }}
      >
        <Suspense fallback={null}>
          <WorldCameraRig />
          <WorldEnvironment />
        </Suspense>
      </Canvas>
    </div>
  );
};
