import { motion } from 'framer-motion';

interface EnergyParticlesProps {
  color?: string;
  count?: number;
}

const EnergyParticles = ({ color = '#3b82f6', count = 20 }: EnergyParticlesProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            backgroundColor: color,
            left: '50%',
            top: '50%',
            boxShadow: `0 0 ${Math.random() * 20 + 10}px ${color}`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 400],
            y: [0, (Math.random() - 0.5) * 400],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

export default EnergyParticles;
