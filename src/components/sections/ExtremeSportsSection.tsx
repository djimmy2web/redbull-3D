import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, PlaneIcon, BikeIcon, MountainIcon, WavesIcon } from 'lucide-react';
import Scene3DBackground from '../3d/Scene3DBackground';
import Scene3DSports from '../3d/Scene3DSports';

interface SportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  videoUrl: string;
  index: number;
}

const SportCard = ({ title, description, icon, videoUrl, index }: SportCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const getSportType = (title: string): 'plane' | 'bike' | 'wave' | 'mountain' => {
    if (title.includes('Air')) return 'plane';
    if (title.includes('Rampage')) return 'bike';
    if (title.includes('Cliff')) return 'wave';
    return 'mountain';
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="relative group"
    >
      <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        {/* 3D Sport Icon */}
        <Scene3DSports sportType={getSportType(title)} />
        {/* Video Background */}
        <motion.video
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/60 to-transparent" />
        
        {/* Animated Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className="w-16 h-16 bg-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-primary/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {icon}
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4">
              {title}
            </h3>
            
            <p className="text-xl text-gray-200 mb-6 max-w-lg">
              {description}
            </p>
            
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full group/btn"
            >
              Découvrir
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Button>
          </motion.div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500"
          whileHover={{ scale: 1.02 }}
        />
        
        {/* Corner Accents */}
        <motion.div
          className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary/0 group-hover:border-primary rounded-tl-3xl transition-all duration-500"
        />
        <motion.div
          className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-primary/0 group-hover:border-primary rounded-br-3xl transition-all duration-500"
        />
      </div>
    </motion.div>
  );
};

const ExtremeSportsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const sports = [
    {
      title: 'Red Bull Air Race',
      description: 'Les meilleurs pilotes du monde s\'affrontent dans des courses aériennes spectaculaires à travers des pylônes.',
      icon: <PlaneIcon className="w-8 h-8 text-primary" strokeWidth={2} />,
      videoUrl: 'https://cdn.coverr.co/videos/coverr-airplane-flying-through-the-sky-6166/1080p.mp4',
    },
    {
      title: 'Red Bull Rampage',
      description: 'Le VTT freeride le plus extrême au monde. Des descentes vertigineuses dans le désert de l\'Utah.',
      icon: <BikeIcon className="w-8 h-8 text-primary" strokeWidth={2} />,
      videoUrl: 'https://cdn.coverr.co/videos/coverr-mountain-biker-riding-downhill-4459/1080p.mp4',
    },
    {
      title: 'Red Bull Cliff Diving',
      description: 'Plongeons spectaculaires depuis des falaises de 27 mètres de haut dans les plus beaux sites du monde.',
      icon: <WavesIcon className="w-8 h-8 text-primary" strokeWidth={2} />,
      videoUrl: 'https://cdn.coverr.co/videos/coverr-person-diving-into-the-ocean-4799/1080p.mp4',
    },
    {
      title: 'Red Bull X-Alps',
      description: 'La course d\'aventure ultime : 1200 km à travers les Alpes en parapente et trail running.',
      icon: <MountainIcon className="w-8 h-8 text-primary" strokeWidth={2} />,
      videoUrl: 'https://cdn.coverr.co/videos/coverr-paragliding-over-mountains-3292/1080p.mp4',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-neutral via-gray-900 to-neutral py-32 px-8 md:px-16 lg:px-32 overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3DBackground color="#3b82f6" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto mb-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-50 mb-6"
          animate={{
            textShadow: [
              '0 0 20px rgba(59, 130, 246, 0.3)',
              '0 0 40px rgba(59, 130, 246, 0.5)',
              '0 0 20px rgba(59, 130, 246, 0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Sports Extrêmes
        </motion.h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Red Bull repousse les limites du possible dans les sports les plus extrêmes de la planète
        </p>
      </motion.div>

      {/* Sports Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sports.map((sport, index) => (
          <SportCard key={sport.title} {...sport} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="max-w-7xl mx-auto mt-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-12 py-7 rounded-full"
        >
          Voir tous les événements
          <ArrowRightIcon className="ml-2 w-6 h-6" strokeWidth={2.5} />
        </Button>
      </motion.div>
    </section>
  );
};

export default ExtremeSportsSection;
