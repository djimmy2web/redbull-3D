import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface Floating3DElementsProps {
  count?: number;
  color?: string;
}

const Floating3DElements = ({ count = 20, color = '#3b82f6' }: Floating3DElementsProps) => {
  const meshRefs = useRef<Mesh[]>([]);

  useFrame((state) => {
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y = Math.sin(state.clock.elapsedTime + i) * 2;
        mesh.rotation.x = state.clock.elapsedTime * 0.5 + i;
        mesh.rotation.y = state.clock.elapsedTime * 0.3 + i;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        const size = Math.random() * 0.3 + 0.1;
        const shape = Math.floor(Math.random() * 3);

        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) meshRefs.current[i] = el;
            }}
            position={[x, y, z]}
          >
            {shape === 0 && <boxGeometry args={[size, size, size]} />}
            {shape === 1 && <sphereGeometry args={[size, 16, 16]} />}
            {shape === 2 && <octahedronGeometry args={[size]} />}
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default Floating3DElements;
