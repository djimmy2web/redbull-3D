import { motion } from 'framer-motion';

const WaterDroplets = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/60 rounded-full blur-sm"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${10 + Math.random() * 30}%`,
          }}
          animate={{
            y: [0, 400],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
};

export default WaterDroplets;
