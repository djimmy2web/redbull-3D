import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CalendarIcon } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

const events: TimelineEvent[] = [
  {
    year: '1987',
    title: 'Naissance de Red Bull',
    description: 'Dietrich Mateschitz lance Red Bull Energy Drink en Autriche.',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34f1f86a?w=800&h=600&fit=crop',
  },
  {
    year: '1997',
    title: 'Expansion mondiale',
    description: 'Red Bull arrive aux États-Unis et commence sa conquête mondiale.',
    image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800&h=600&fit=crop',
  },
  {
    year: '2005',
    title: 'Red Bull Racing',
    description: 'Entrée en Formule 1 avec la création de Red Bull Racing.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop',
  },
  {
    year: '2012',
    title: 'Stratos',
    description: 'Felix Baumgartner saute depuis la stratosphère, record du monde.',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
  },
  {
    year: '2024',
    title: 'Innovation continue',
    description: 'Red Bull continue de repousser les limites dans tous les sports.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
  },
];

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 px-8 md:px-16 lg:px-32 bg-gradient-to-b from-neutral via-gray-800 to-neutral overflow-hidden"
    >
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
          <CalendarIcon className="w-6 h-6 text-primary" strokeWidth={2} />
          <span className="text-primary font-semibold uppercase tracking-wider">
            Notre Histoire
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-50 mb-6">
          35 ans d'innovation
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          De l'Autriche au monde entier, découvrez les moments clés de Red Bull
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-700/50 -translate-x-1/2">
          <motion.div
            className="w-full bg-gradient-to-b from-primary to-tertiary"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Events */}
        <div className="space-y-24">
          {events.map((event, index) => (
            <motion.div
              key={event.year}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                <motion.div
                  className="inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-primary/50 transition-all duration-300 shadow-xl">
                    <div className="text-4xl font-bold text-primary mb-2">{event.year}</div>
                    <h3 className="text-2xl font-bold text-gray-50 mb-3">{event.title}</h3>
                    <p className="text-gray-300">{event.description}</p>
                  </div>
                </motion.div>
              </div>

              {/* Center Dot */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-neutral z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              </motion.div>

              {/* Image */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}>
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
