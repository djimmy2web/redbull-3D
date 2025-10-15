import { motion } from 'framer-motion';

interface AuroraTextProps {
  children: React.ReactNode;
}

const AuroraText = ({ children }: AuroraTextProps) => {
  return (
    <span className="relative inline-block">
      <motion.span
        className="relative z-10 text-gradient-1"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default AuroraText;
