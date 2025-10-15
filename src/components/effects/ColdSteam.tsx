import { motion } from 'framer-motion';

const ColdSteam = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Vapeur froide qui monte */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${45 + Math.random() * 10}%`,
            bottom: '40%',
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            background: 'radial-gradient(circle, rgba(184, 212, 232, 0.4), transparent)',
            filter: 'blur(15px)',
          }}
          animate={{
            y: [-20, -200],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Particules de glace scintillantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`ice-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${40 + Math.random() * 20}%`,
            top: `${30 + Math.random() * 40}%`,
            backgroundColor: '#e8f4ff',
            boxShadow: '0 0 4px #ffffff',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default ColdSteam;
