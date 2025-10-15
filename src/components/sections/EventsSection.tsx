import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import Scene3DBackground from '../3d/Scene3DBackground';
import Scene3DEnergy from '../3d/Scene3DEnergy';

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  attendees: string;
  imageUrl: string;
  category: string;
}

const events: Event[] = [
  {
    title: 'Red Bull Flugtag',
    date: '15 Juillet 2024',
    location: 'Paris, France',
    description: 'Des machines volantes faites maison s\'élancent d\'une plateforme de 8 mètres de haut.',
    attendees: '50,000+',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
    category: 'Aviation',
  },
  {
    title: 'Red Bull Crashed Ice',
    date: '10 Février 2024',
    location: 'Québec, Canada',
    description: 'Course de patinage extrême sur un parcours glacé avec des virages serrés et des sauts.',
    attendees: '100,000+',
    imageUrl: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1200&h=800&fit=crop',
    category: 'Sports d\'hiver',
  },
  {
    title: 'Red Bull Music Festival',
    date: '20 Août 2024',
    location: 'Berlin, Allemagne',
    description: 'Festival de musique électronique avec les meilleurs DJs du monde entier.',
    attendees: '75,000+',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop',
    category: 'Musique',
  },
];

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        {/* 3D Energy Waves */}
        <Scene3DEnergy color="#f59e0b" />
        
        {/* Image Background */}
        <motion.img
          src={event.imageUrl}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/80 to-transparent" />
        
        {/* Animated Light Beam */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Category Badge */}
        <motion.div
          className="absolute top-6 left-6 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {event.category}
          </span>
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4">
              {event.title}
            </h3>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-full">
                <CalendarIcon className="w-5 h-5 text-primary" strokeWidth={2} />
                <span className="text-gray-200 font-medium text-sm">{event.date}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-full">
                <MapPinIcon className="w-5 h-5 text-primary" strokeWidth={2} />
                <span className="text-gray-200 font-medium text-sm">{event.location}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-full">
                <UsersIcon className="w-5 h-5 text-primary" strokeWidth={2} />
                <span className="text-gray-200 font-medium text-sm">{event.attendees}</span>
              </div>
            </div>

            <p className="text-lg text-gray-200 mb-6 max-w-xl">
              {event.description}
            </p>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full group/btn"
              >
                Réserver
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-gray-100 border-2 border-gray-100 hover:bg-gray-100 hover:text-neutral font-semibold rounded-full"
              >
                Plus d'infos
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500"
        />
        
        {/* Pulsing Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            boxShadow: [
              '0 0 0px rgba(59, 130, 246, 0)',
              '0 0 40px rgba(59, 130, 246, 0.3)',
              '0 0 0px rgba(59, 130, 246, 0)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
};

const EventsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-neutral via-gray-900 to-neutral py-32 px-8 md:px-16 lg:px-32 overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3DBackground color="#f59e0b" />
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5 z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 2.5, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

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
          <CalendarIcon className="w-6 h-6 text-primary" strokeWidth={2} />
          <span className="text-primary font-semibold uppercase tracking-wider">
            Événements à venir
          </span>
        </motion.div>

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
          Événements Red Bull
        </motion.h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Rejoignez-nous pour des expériences inoubliables à travers le monde
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {events.map((event, index) => (
          <EventCard key={event.title} event={event} index={index} />
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
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm rounded-3xl p-12 border border-primary/20">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-50 mb-4">
            Ne manquez aucun événement
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="w-full sm:flex-1 px-6 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-full text-gray-100 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
            />
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-8"
            >
              S'inscrire
              <ArrowRightIcon className="ml-2 w-5 h-5" strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EventsSection;
