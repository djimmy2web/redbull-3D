import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';
import EnergyWaves3D from './EnergyWaves3D';

interface Scene3DEnergyProps {
  color?: string;
}

const Scene3DEnergy = ({ color = '#3b82f6' }: Scene3DEnergyProps) => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color={color} />
          <pointLight position={[-10, -10, -10]} intensity={1} color={color} />

          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
            <EnergyWaves3D color={color} count={8} />
          </Float>

          <Environment preset="night" />

          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3DEnergy;
