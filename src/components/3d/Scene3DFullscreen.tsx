import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import CanModel from './CanModel';
import { Group } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface Can {
  id: string;
  color: string;
}

interface Scene3DFullscreenProps {
  selectedIndex: number | null;
  onCanClick: (index: number) => void;
  cans: Can[];
}

interface AnimatedCanProps {
  can: Can;
  index: number;
  isSelected: boolean;
  onCanClick: (index: number) => void;
  totalCans: number;
}

const RotatingLight = ({ color }: { color: string }) => {
  const lightRef = useRef<any>(null);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.cos(state.clock.elapsedTime) * 4;
      lightRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      lightRef.current.position.z = Math.sin(state.clock.elapsedTime) * 4;
    }
  });

  return (
    <pointLight 
      ref={lightRef}
      intensity={1.5} 
      distance={5} 
      color={color} 
    />
  );
};

const AnimatedCan = ({ can, index, isSelected, onCanClick, totalCans }: AnimatedCanProps) => {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const getInitialPosition = (): [number, number, number] => {
    const spacing = 6;
    const offset = ((totalCans - 1) * spacing) / 2;
    return [index * spacing - offset, 0, 0];
  };

  const getFinalPosition = (): [number, number, number] => {
    return [0, 0, 2];
  };

  const { positionX, positionY, positionZ, scale, rotationY } = useSpring({
    positionX: isSelected ? getFinalPosition()[0] : getInitialPosition()[0],
    positionY: isSelected ? getFinalPosition()[1] : getInitialPosition()[1],
    positionZ: isSelected ? getFinalPosition()[2] : getInitialPosition()[2],
    scale: isSelected ? 9 : hovered ? 5.5 : 4.5,
    rotationY: isSelected ? Math.PI * 2 : 0,
    config: { mass: 1, tension: 180, friction: 35 },
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!isSelected) {
      onCanClick(index);
    }
  };

  useFrame((state) => {
    if (groupRef.current) {
      if (isSelected) {
        groupRef.current.rotation.y += 0.008;
      } else {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      }
    }
  });

  return (
    <Float
      speed={isSelected ? 2.5 : 1.2}
      rotationIntensity={isSelected ? 0.6 : 0.25}
      floatIntensity={isSelected ? 0.6 : 0.35}
    >
      <animated.group
        ref={groupRef}
        position-x={positionX}
        position-y={positionY}
        position-z={positionZ}
        scale={scale}
        rotation-y={rotationY}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!isSelected) {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <CanModel color={can.color} scale={10} position={[0, 0, 0]} />

        {isSelected && (
          <>
            <pointLight position={[0, 0, 0]} intensity={4} distance={10} color={can.color} />
            <pointLight position={[0, 3, 0]} intensity={2.5} distance={7} color={can.color} />
            <pointLight position={[0, -3, 0]} intensity={2.5} distance={7} color={can.color} />
            <pointLight position={[3, 0, 2]} intensity={2} distance={6} color={can.color} />
            <pointLight position={[-3, 0, 2]} intensity={2} distance={6} color={can.color} />
            <pointLight position={[0, 0, -2]} intensity={1.5} distance={5} color={can.color} />
            
            <RotatingLight color={can.color} />
          </>
        )}

        {hovered && !isSelected && (
          <>
            <pointLight position={[0, 0, 0]} intensity={2} distance={5} color={can.color} />
            <pointLight position={[0, 1, 1]} intensity={1} distance={3} color={can.color} />
          </>
        )}
      </animated.group>
    </Float>
  );
};

const Scene3DFullscreen = ({ selectedIndex, onCanClick, cans }: Scene3DFullscreenProps) => {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 18]);

  useEffect(() => {
    if (selectedIndex !== null) {
      setCameraPosition([0, 0, 12]);
    } else {
      setCameraPosition([0, 0, 18]);
    }
  }, [selectedIndex]);

  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: cameraPosition, fov: 70 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <spotLight
            position={[15, 15, 15]}
            angle={0.35}
            penumbra={1}
            intensity={2.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight
            position={[-15, -15, -15]}
            angle={0.35}
            penumbra={1}
            intensity={1.5}
          />
          <pointLight position={[0, 10, 10]} intensity={2} color="#ffffff" />
          <pointLight position={[10, 0, 5]} intensity={1} color="#3b82f6" />
          <pointLight position={[-10, 0, 5]} intensity={1} color="#f59e0b" />

          {cans.map((can, index) => (
            <AnimatedCan
              key={can.id}
              can={can}
              index={index}
              isSelected={selectedIndex === index}
              onCanClick={onCanClick}
              totalCans={cans.length}
            />
          ))}

          <Environment preset="city" />

          <OrbitControls
            enableZoom={false}
            autoRotate={selectedIndex === null}
            autoRotateSpeed={0.8}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 1.7}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3DFullscreen;
