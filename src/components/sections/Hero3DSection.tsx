import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Scene3D from '../3d/Scene3D';

const Hero3DSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="hero-section relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-neutral to-neutral">
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <Scene3D canColor="#003da5" autoRotate={true} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral/50 to-neutral z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="max-w-5xl"
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-gray-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-gradient-1">Red Bull</span>
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-medium mb-6 text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Gives You Wings
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Découvrez nos éditions en 3D. Scrollez pour explorer chaque canette.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-12 py-7 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300"
              onClick={scrollToContent}
            >
              Explorer
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-label="Scroll to content"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 text-sm uppercase tracking-wider">Scroll</span>
            <ChevronDownIcon className="w-8 h-8 text-primary" strokeWidth={2} />
          </div>
        </motion.button>
      </div>

      {/* Particles effect */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero3DSection;
