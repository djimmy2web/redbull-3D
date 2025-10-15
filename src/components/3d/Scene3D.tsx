import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Float } from '@react-three/drei';
import { Suspense } from 'react';
import CanModel from './CanModel';

interface Scene3DProps {
  canColor: string;
  autoRotate?: boolean;
}

const Scene3D = ({ canColor, autoRotate = true }: Scene3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight
            position={[-10, -10, -10]}
            angle={0.15}
            penumbra={1}
            intensity={0.5}
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
          
          {/* Can Model with Float animation */}
          <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
          >
            <CanModel color={canColor} scale={50} />
          </Float>

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
