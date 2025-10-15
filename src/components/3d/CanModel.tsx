import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

interface CanModelProps {
  position?: [number, number, number];
  scale?: number;
}

const CanModel = ({ position = [0, 0, 0], scale = 50 }: CanModelProps) => {
  const groupRef = useRef<any>(null);
  const { scene } = useGLTF('/models/redbullcan.glb');

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive 
        object={scene.clone()} 
        castShadow 
        receiveShadow
      />
    </group>
  );
};

export default CanModel;
