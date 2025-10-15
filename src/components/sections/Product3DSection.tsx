import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, ZapIcon, SparklesIcon } from 'lucide-react';
import Scene3D from '../3d/Scene3D';
import { useRef } from 'react';

interface Product3DSectionProps {
  variant: 'original' | 'sugarfree' | 'orange';
  title: string;
  description: string;
  canColor: string;
  sectionIndex: number;
  reverse?: boolean;
}

const Product3DSection = ({
  variant,
  title,
  description,
  canColor,
  sectionIndex,
  reverse = false,
}: Product3DSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  const bgGradients = {
    original: 'bg-gradient-to-br from-blue-900 via-neutral to-neutral',
    sugarfree: 'bg-gradient-to-br from-cyan-900 via-neutral to-neutral',
    orange: 'bg-gradient-to-br from-orange-900 via-neutral to-neutral',
  };

  const accentColors = {
    original: 'text-blue-400',
    sugarfree: 'text-cyan-400',
    orange: 'text-orange-400',
  };

  const features = {
    original: ['Caféine', 'Taurine', 'Vitamines B', 'Sucres'],
    sugarfree: ['Caféine', 'Taurine', 'Vitamines B', 'Sans Sucre'],
    orange: ['Caféine', 'Taurine', 'Saveur Orange', 'Vitamines B'],
  };

  return (
    <section
      ref={sectionRef}
      className={`product-3d-section relative w-full min-h-screen ${bgGradients[variant]} py-32 px-8 md:px-16 lg:px-32 overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${accentColors[variant]} rounded-full opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <motion.div
            className={`space-y-8 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <ZapIcon className={`w-8 h-8 ${accentColors[variant]}`} />
              <span className={`text-sm uppercase tracking-wider ${accentColors[variant]} font-semibold`}>
                Édition {variant === 'original' ? 'Classique' : variant === 'sugarfree' ? 'Sans Sucre' : 'Orange'}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-50 leading-tight">
              {title}
            </h2>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              {description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 py-6">
              {features[variant].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SparklesIcon className={`w-5 h-5 ${accentColors[variant]}`} />
                  <span className="text-gray-300 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className={`bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 py-6 rounded-full shadow-xl hover:shadow-primary/50 transition-all duration-300 group`}
              >
                En savoir plus
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-gray-100 border-gray-100 hover:bg-gray-100 hover:text-neutral font-semibold text-base px-8 py-6 rounded-full"
              >
                Où acheter
              </Button>
            </div>
          </motion.div>

          {/* 3D Can */}
          <motion.div
            className={`relative h-[600px] ${reverse ? 'lg:order-1' : 'lg:order-2'}`}
            initial={{ opacity: 0, scale: 0.5, rotateY: reverse ? 45 : -45 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-3xl" />
            <Scene3D canColor={canColor} autoRotate={true} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Product3DSection;
