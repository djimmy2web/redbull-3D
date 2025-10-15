import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface Trophy3DProps {
  color?: string;
  scale?: number;
}

const Trophy3D = ({ color = '#fbbf24', scale = 1 }: Trophy3DProps) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Base */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.2, 32]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.4, 32]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </mesh>

      {/* Cup */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 0.6, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Handles */}
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.2, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.2, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </mesh>

      {/* Top decoration */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

export default Trophy3D;
