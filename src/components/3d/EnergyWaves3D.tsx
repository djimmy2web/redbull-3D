import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface EnergyWaves3DProps {
  color?: string;
  count?: number;
}

const EnergyWaves3D = ({ color = '#3b82f6', count = 5 }: EnergyWaves3DProps) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(count)].map((_, i) => (
        <mesh
          key={i}
          position={[0, 0, 0]}
          rotation={[0, 0, (Math.PI * 2 * i) / count]}
        >
          <torusGeometry args={[2 + i * 0.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

export default EnergyWaves3D;
