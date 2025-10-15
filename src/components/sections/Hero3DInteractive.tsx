import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, ZapIcon, SparklesIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Scene3DFullscreen from '../3d/Scene3DFullscreen';
import WaterDroplets from '../effects/WaterDroplets';
import EnergyParticles from '../effects/EnergyParticles';
import BackgroundShapes from '../effects/BackgroundShapes';

interface CanVariant {
  id: string;
  name: string;
  color: string;
  bgGradient: string;
  accentColor: string;
  description: string;
  features: string[];
  tagline: string;
}

const canVariants: CanVariant[] = [
  {
    id: 'original',
    name: 'Red Bull Original',
    color: '#003da5',
    bgGradient: 'from-blue-900/50 via-neutral to-neutral',
    accentColor: 'text-blue-400',
    description: 'Vitalise le corps et l\'esprit. La canette iconique qui a tout commencé.',
    features: ['Caféine', 'Taurine', 'Vitamines B', 'Sucres'],
    tagline: 'L\'Original',
  },
  {
    id: 'sugarfree',
    name: 'Red Bull Sugarfree',
    color: '#00a0dc',
    bgGradient: 'from-cyan-900/50 via-neutral to-neutral',
    accentColor: 'text-cyan-400',
    description: 'Les mêmes ailes, sans le sucre. Performance pure.',
    features: ['Caféine', 'Taurine', 'Vitamines B', 'Sans Sucre'],
    tagline: 'Sans Compromis',
  },
  {
    id: 'orange',
    name: 'Red Bull Orange Edition',
    color: '#ff6b35',
    bgGradient: 'from-orange-900/50 via-neutral to-neutral',
    accentColor: 'text-orange-400',
    description: 'Énergie audacieuse et acidulée. Saveur orange intense.',
    features: ['Caféine', 'Taurine', 'Saveur Orange', 'Vitamines B'],
    tagline: 'Édition Limitée',
  },
];

const Hero3DInteractive = () => {
  const [selectedCan, setSelectedCan] = useState<number | null>(null);

  const handleCanSelect = (index: number) => {
    setSelectedCan(index);
  };

  const handleClose = () => {
    setSelectedCan(null);
  };

  const handleNext = () => {
    if (selectedCan !== null) {
      setSelectedCan((selectedCan + 1) % canVariants.length);
    }
  };

  const handlePrevious = () => {
    if (selectedCan !== null) {
      setSelectedCan((selectedCan - 1 + canVariants.length) % canVariants.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCan !== null) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'Escape') handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCan]);

  const currentCan = selectedCan !== null ? canVariants[selectedCan] : null;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-neutral">
      {/* Dynamic Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Mountain Background - Default */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            opacity: selectedCan === null ? 1 : 0,
            scale: selectedCan === null ? 1 : 1.1,
          }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
            alt="Mountain landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral/60 via-neutral/40 to-neutral" />
        </motion.div>

        {/* Original - Blue Sky & Clouds */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            opacity: selectedCan === 0 ? 1 : 0,
            scale: selectedCan === 0 ? 1 : 1.1,
          }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&h=1080&fit=crop"
            alt="Blue sky with clouds"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-neutral" />
        </motion.div>

        {/* Sugarfree - Ocean Waves */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            opacity: selectedCan === 1 ? 1 : 0,
            scale: selectedCan === 1 ? 1 : 1.1,
          }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop"
            alt="Ocean waves"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/60 via-cyan-900/40 to-neutral" />
        </motion.div>

        {/* Orange - Sunset Mountains */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            opacity: selectedCan === 2 ? 1 : 0,
            scale: selectedCan === 2 ? 1 : 1.1,
          }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&sat=-100&hue=30"
            alt="Sunset mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/60 via-orange-900/40 to-neutral" />
        </motion.div>
      </div>

      {/* Animated Overlay Effects */}
      <div className="absolute inset-0 z-[1]">
        {/* Moving Clouds Effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&h=400&fit=crop&crop=top)',
            backgroundSize: '200% 100%',
            backgroundPosition: '0% 0%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral/20 to-neutral/80" />
      </div>

      {/* Energy Particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: currentCan?.color || '#3b82f6',
              boxShadow: `0 0 ${Math.random() * 20 + 10}px ${currentCan?.color || '#3b82f6'}`,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Light Rays Effect */}
      {selectedCan !== null && (
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute left-1/2 top-1/2 origin-top"
              style={{
                width: '2px',
                height: '50vh',
                background: `linear-gradient(to bottom, ${currentCan?.color || '#3b82f6'}80, transparent)`,
                transform: `rotate(${(360 / 8) * i}deg)`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette Effect */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Header - Only show when no can is selected */}
      <AnimatePresence>
        {selectedCan === null && (
          <motion.div
            className="absolute top-0 left-0 right-0 pt-16 px-8 md:px-16 text-center z-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 text-gray-50"
              animate={{
                textShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 40px rgba(251, 146, 60, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-gradient-1">Red Bull</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Gives You Wings
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 mt-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Shapes */}
      <BackgroundShapes color={currentCan?.color || '#3b82f6'} />

      {/* 3D Scene - Full Screen */}
      <div className="absolute inset-0 z-10">
        <Scene3DFullscreen
          selectedIndex={selectedCan}
          onCanClick={handleCanSelect}
          cans={canVariants}
        />
        {selectedCan !== null && (
          <>
            <WaterDroplets />
            <EnergyParticles color={currentCan?.color} count={40} />
          </>
        )}
      </div>

      {/* Navigation Arrows - Appear when can is selected */}
      <AnimatePresence>
        {selectedCan !== null && (
          <>
            {/* Left Arrow */}
            <motion.button
              onClick={handlePrevious}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-40 w-16 h-16 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-all pointer-events-auto group"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeftIcon className="w-8 h-8 text-gray-100 group-hover:text-primary transition-colors" strokeWidth={2.5} />
            </motion.button>

            {/* Right Arrow */}
            <motion.button
              onClick={handleNext}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-40 w-16 h-16 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-all pointer-events-auto group"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRightIcon className="w-8 h-8 text-gray-100 group-hover:text-primary transition-colors" strokeWidth={2.5} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Info Panel - Appears when can is selected */}
      <AnimatePresence>
        {selectedCan !== null && currentCan && (
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-8 right-8 w-14 h-14 bg-gray-800/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gray-700/90 transition-colors pointer-events-auto shadow-2xl border border-gray-700/50"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <XIcon className="w-7 h-7 text-gray-100" strokeWidth={2.5} />
            </motion.button>

            {/* Content Panel - Bottom with Glass Effect */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral via-neutral/98 to-transparent p-8 md:p-12 pointer-events-auto backdrop-blur-xl border-t border-gray-700/30"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Glow Effect */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${currentCan.color} to-transparent opacity-50`} />
              <div className="max-w-6xl mx-auto">
                {/* Title Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <ZapIcon className={`w-10 h-10 ${currentCan.accentColor} drop-shadow-lg`} strokeWidth={2.5} />
                    </motion.div>
                    <motion.h2
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-50"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      {currentCan.name}
                    </motion.h2>
                  </div>
                  <motion.p
                    className="text-xl md:text-2xl text-gray-200 max-w-3xl"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentCan.description}
                  </motion.p>
                </div>

                {/* Features Grid */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentCan.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-5 text-center border border-gray-700/50 shadow-xl relative overflow-hidden group"
                      initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                      whileHover={{ 
                        scale: 1.08, 
                        borderColor: currentCan.color,
                        boxShadow: `0 0 30px ${currentCan.color}40`,
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-700/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        <SparklesIcon className={`w-7 h-7 ${currentCan.accentColor} mx-auto mb-2 drop-shadow-lg relative z-10`} strokeWidth={2} />
                      </motion.div>
                      <span className="text-gray-100 font-semibold text-sm relative z-10">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-12 py-7 rounded-full shadow-2xl hover:shadow-primary/70 transition-all duration-300 group relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="relative z-10">En savoir plus</span>
                      <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" strokeWidth={2.5} />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent text-gray-100 border-2 border-gray-100 hover:bg-gray-100 hover:text-neutral font-semibold text-base px-12 py-7 rounded-full shadow-xl"
                    >
                      Où acheter
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero3DInteractive;
