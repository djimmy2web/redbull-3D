import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, TrophyIcon, StarIcon } from 'lucide-react';
import Scene3DBackground from '../3d/Scene3DBackground';
import Scene3DTrophy from '../3d/Scene3DTrophy';

interface Athlete {
  name: string;
  sport: string;
  achievements: string;
  imageUrl: string;
  country: string;
}

const athletes: Athlete[] = [
  {
    name: 'Max Verstappen',
    sport: 'Formule 1',
    achievements: 'Champion du monde F1 2021, 2022, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=1000&fit=crop',
    country: '🇳🇱',
  },
  {
    name: 'Lindsey Vonn',
    sport: 'Ski Alpin',
    achievements: '82 victoires en Coupe du monde',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=1000&fit=crop',
    country: '🇺🇸',
  },
  {
    name: 'Travis Pastrana',
    sport: 'Motocross / Rally',
    achievements: '11 médailles d\'or aux X Games',
    imageUrl: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=1000&fit=crop',
    country: '🇺🇸',
  },
  {
    name: 'Neymar Jr',
    sport: 'Football',
    achievements: 'Champion olympique 2016',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1000&fit=crop',
    country: '🇧🇷',
  },
];

const AthleteCard = ({ athlete, index }: { athlete: Athlete; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        {/* Image */}
        <motion.img
          src={athlete.imageUrl}
          alt={athlete.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/70 to-transparent" />
        
        {/* Animated Scan Line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent h-32"
          animate={{
            y: isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <StarIcon className="w-5 h-5 text-primary fill-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Athlète Red Bull
              </span>
            </div>
          </motion.div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{athlete.country}</span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-50">
              {athlete.name}
            </h3>
          </div>

          <p className="text-lg text-primary font-semibold mb-2">
            {athlete.sport}
          </p>

          <motion.p
            className="text-base text-gray-200 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {athlete.achievements}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              En savoir plus
              <ArrowRightIcon className="ml-2 w-4 h-4" strokeWidth={2.5} />
            </Button>
          </motion.div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-primary/0"
          animate={{ borderColor: isHovered ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0)' }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Glowing Corners */}
        <motion.div
          className="absolute top-0 left-0 w-16 h-16"
          animate={{
            boxShadow: isHovered ? '0 0 30px rgba(59, 130, 246, 0.6)' : '0 0 0px rgba(59, 130, 246, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-16 h-16"
          animate={{
            boxShadow: isHovered ? '0 0 30px rgba(59, 130, 246, 0.6)' : '0 0 0px rgba(59, 130, 246, 0)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Trophy Icon */}
        <motion.div
          className="absolute top-6 right-6 w-12 h-12 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/30"
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <TrophyIcon className="w-6 h-6 text-primary" strokeWidth={2} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AthletesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-neutral via-gray-800 to-neutral py-32 px-8 md:px-16 lg:px-32 overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3DBackground color="#fbbf24" />
      
      {/* 3D Trophy */}
      <Scene3DTrophy />
      
      {/* Animated Background Pattern */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-10 z-10"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </motion.div>

      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto mb-20 text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30"
          whileHover={{ scale: 1.05 }}
        >
          <TrophyIcon className="w-6 h-6 text-primary" strokeWidth={2} />
          <span className="text-primary font-semibold uppercase tracking-wider">
            Nos Champions
          </span>
        </motion.div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-50 mb-6">
          Athlètes Red Bull
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Les meilleurs athlètes du monde qui repoussent les limites de leur sport
        </p>
      </motion.div>

      {/* Athletes Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {athletes.map((athlete, index) => (
          <AthleteCard key={athlete.name} athlete={athlete} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="max-w-7xl mx-auto mt-20 text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-12 py-7 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300"
        >
          Découvrir tous les athlètes
          <ArrowRightIcon className="ml-2 w-6 h-6" strokeWidth={2.5} />
        </Button>
      </motion.div>
    </section>
  );
};

export default AthletesSection;
