import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import Floating3DElements from './Floating3DElements';

interface Scene3DBackgroundProps {
  color?: string;
}

const Scene3DBackground = ({ color = '#3b82f6' }: Scene3DBackgroundProps) => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-30">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color={color} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
          
          <Floating3DElements count={15} color={color} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
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

export default Scene3DBackground;
