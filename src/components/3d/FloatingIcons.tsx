import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingIconProps {
  position: [number, number, number];
  icon: string;
  color: string;
  delay: number;
}

function FloatingIcon({ position, icon, color, delay }: FloatingIconProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + delay) * 0.3;
    meshRef.current.rotation.y = time * 0.2 + delay;
    meshRef.current.rotation.x = Math.sin(time * 0.3 + delay) * 0.1;
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} />
      <Html center distanceFactor={8}>
        <div 
          className="text-2xl"
          style={{ color, textShadow: `0 0 20px ${color}` }}
        >
          {icon}
        </div>
      </Html>
    </mesh>
  );
}

interface FloatingIconsProps {
  className?: string;
}

export default function FloatingIcons({ className }: FloatingIconsProps) {
  const icons = [
    { icon: '⚛️', position: [3, 1, -2] as [number, number, number], color: '#61dafb', delay: 0 },
    { icon: '🟢', position: [-3, -1, -1] as [number, number, number], color: '#339933', delay: 1 },
    { icon: '☁️', position: [2, -2, -3] as [number, number, number], color: '#ff9900', delay: 2 },
    { icon: '📦', position: [-2, 2, -2] as [number, number, number], color: '#2496ed', delay: 3 },
    { icon: '🔷', position: [0, 3, -4] as [number, number, number], color: '#3178c6', delay: 4 },
  ];
  
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        {icons.map((item, index) => (
          <FloatingIcon
            key={index}
            position={item.position}
            icon={item.icon}
            color={item.color}
            delay={item.delay}
          />
        ))}
      </Canvas>
    </div>
  );
}
