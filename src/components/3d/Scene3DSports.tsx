import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sphere, Box, Cone } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Group } from 'three';

interface Scene3DSportsProps {
  sportType: 'plane' | 'bike' | 'wave' | 'mountain';
}

const Plane3D = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.1, 2, 16]} />
        <meshStandardMaterial color="#e74c3c" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[3, 0.05, 0.5]} />
        <meshStandardMaterial color="#3498db" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Tail */}
      <mesh position={[-0.8, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.6, 0.05, 0.3]} />
        <meshStandardMaterial color="#3498db" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Bike3D = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.1]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Wheels */}
      <mesh position={[-0.6, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 32]} />
        <meshStandardMaterial color="#34495e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.6, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 32]} />
        <meshStandardMaterial color="#34495e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Handlebars */}
      <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 16]} />
        <meshStandardMaterial color="#e74c3c" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Wave3D = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[i * 0.5 - 1, Math.sin(i) * 0.2, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#3498db"
            metalness={0.3}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

const Mountain3D = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.5, 0]}>
        <coneGeometry args={[1.5, 2, 4]} />
        <meshStandardMaterial color="#95a5a6" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.8, -0.3, 0.5]}>
        <coneGeometry args={[1, 1.5, 4]} />
        <meshStandardMaterial color="#7f8c8d" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.8, -0.4, 0.3]}>
        <coneGeometry args={[1.2, 1.8, 4]} />
        <meshStandardMaterial color="#bdc3c7" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
};

const Scene3DSports = ({ sportType }: Scene3DSportsProps) => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#f59e0b" />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {sportType === 'plane' && <Plane3D />}
            {sportType === 'bike' && <Bike3D />}
            {sportType === 'wave' && <Wave3D />}
            {sportType === 'mountain' && <Mountain3D />}
          </Float>

          <Environment preset="sunset" />

          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3DSports;
