import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import {
  RevixConceptualObject,
  BnBreezeConceptualObject,
  AicteConceptualObject,
  LotteryConceptualObject,
} from './ConceptualObjects';

interface ProjectArtifactCanvasProps {
  projectId: string;
  isHovered?: boolean;
}

export const ProjectArtifactCanvas: React.FC<ProjectArtifactCanvasProps> = ({
  projectId,
  isHovered = false,
}) => {
  return (
    <div className="project-3d-canvas-wrap" style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 38 }}
        dpr={[1, 1.2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 3, 2]} intensity={1.5} color="#fff5ea" />
        <pointLight position={[-2, -1, 1]} intensity={1.2} color="#d6483e" />

        <Suspense fallback={null}>
          <Float
            speed={isHovered ? 2.5 : 1.2}
            rotationIntensity={isHovered ? 0.6 : 0.25}
            floatIntensity={0.3}
          >
            {projectId === '01' && <RevixConceptualObject scale={1.1} />}
            {projectId === '02' && <BnBreezeConceptualObject scale={1.05} />}
            {projectId === '03' && <AicteConceptualObject scale={1.1} />}
            {projectId === '04' && <LotteryConceptualObject scale={1.1} />}
          </Float>
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={isHovered} autoRotateSpeed={3} />
      </Canvas>
    </div>
  );
};
