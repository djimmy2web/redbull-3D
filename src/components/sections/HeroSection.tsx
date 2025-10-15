import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuroraText from '../ui/AuroraText';

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral/30 to-neutral z-10" />
        <motion.video
          src="https://c.animaapp.com/mge9bmhzwv3d6j/img/ai_1.mp4"
          poster="https://c.animaapp.com/mge9bmhzwv3d6j/img/ai_1-poster.png"
          alt="energy motion background"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-50">
            <AuroraText>Energize</AuroraText> Your World — In 3D
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-12 text-gray-100">
            Experience the power, scroll through the editions.
          </h2>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal text-base px-8 py-6"
            onClick={scrollToContent}
          >
            Discover Now
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5,
          }}
          aria-label="Scroll to content"
        >
          <ChevronDownIcon className="w-12 h-12 text-gray-50" strokeWidth={1.5} />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
