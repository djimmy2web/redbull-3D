import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import Trophy3D from './Trophy3D';

const Scene3DTrophy = () => {
  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none z-20">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#fbbf24" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#f59e0b" />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1.5} />

          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <Trophy3D color="#fbbf24" scale={1.5} />
          </Float>

          <Stars radius={50} depth={30} count={1000} factor={2} saturation={0} fade speed={1} />

          <Environment preset="sunset" />

          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3DTrophy;
