import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Float } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import CanModel from './CanModel';
import { Group } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface Can {
  id: string;
  color: string;
}

interface Scene3DMultipleProps {
  selectedIndex: number;
  onCanClick: (index: number) => void;
  cans: Can[];
}

interface AnimatedCanProps {
  can: Can;
  index: number;
  position: [number, number, number];
  isSelected: boolean;
  onCanClick: (index: number) => void;
}

const AnimatedCan = ({ can, index, position, isSelected, onCanClick }: AnimatedCanProps) => {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { scale, positionY, rotationY } = useSpring({
    scale: isSelected ? 6 : hovered ? 4 : 3.5,
    positionY: isSelected ? 1 : hovered ? 0.5 : 0,
    rotationY: clicked ? Math.PI * 2 : 0,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  const handleClick = () => {
    setClicked(true);
    onCanClick(index);
    setTimeout(() => setClicked(false), 1000);
  };

  useFrame((state) => {
    if (groupRef.current && isSelected) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float
      speed={isSelected ? 3 : 1.5}
      rotationIntensity={isSelected ? 0.8 : 0.3}
      floatIntensity={isSelected ? 0.8 : 0.3}
    >
      <animated.group
        ref={groupRef}
        position-x={position[0]}
        position-y={positionY}
        position-z={position[2]}
        scale={scale}
        rotation-y={rotationY}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <CanModel color={can.color} scale={1} position={[0, 0, 0]} />

        {isSelected && (
          <>
            <pointLight position={[0, 0, 0]} intensity={2} distance={5} color={can.color} />
            <pointLight position={[0, 2, 0]} intensity={1.5} distance={4} color={can.color} />
            <pointLight position={[0, -2, 0]} intensity={1.5} distance={4} color={can.color} />
          </>
        )}

        {hovered && !isSelected && (
          <pointLight position={[0, 0, 0]} intensity={1} distance={3} color={can.color} />
        )}
      </animated.group>
    </Float>
  );
};

const Scene3DMultiple = ({ selectedIndex, onCanClick, cans }: Scene3DMultipleProps) => {
  const positions: [number, number, number][] = [
    [-5.5, 0, 0],
    [0, 0, 0],
    [5.5, 0, 0],
  ];

  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 14], fov: 65 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight
            position={[-10, -10, -10]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
          />
          <pointLight position={[0, 5, 5]} intensity={1} color="#ffffff" />

          {cans.map((can, index) => (
            <AnimatedCan
              key={can.id}
              can={can}
              index={index}
              position={positions[index]}
              isSelected={index === selectedIndex}
              onCanClick={onCanClick}
            />
          ))}

          <Environment preset="city" />

          <OrbitControls
            enableZoom={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3DMultiple;
