import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrophyIcon, UsersIcon, MapPinIcon, CalendarIcon } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: <TrophyIcon className="w-8 h-8" strokeWidth={2} />,
    value: 750,
    suffix: '+',
    label: 'Événements par an',
    color: 'text-yellow-400',
  },
  {
    icon: <UsersIcon className="w-8 h-8" strokeWidth={2} />,
    value: 12,
    suffix: 'M+',
    label: 'Fans dans le monde',
    color: 'text-blue-400',
  },
  {
    icon: <MapPinIcon className="w-8 h-8" strokeWidth={2} />,
    value: 171,
    suffix: '',
    label: 'Pays',
    color: 'text-green-400',
  },
  {
    icon: <CalendarIcon className="w-8 h-8" strokeWidth={2} />,
    value: 35,
    suffix: '',
    label: 'Ans d\'innovation',
    color: 'text-orange-400',
  },
];

const CountUpAnimation = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 px-8 md:px-16 lg:px-32 bg-gradient-to-b from-neutral via-gray-900 to-neutral overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(59, 130, 246, 0.5) 2px, transparent 2px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-50 mb-4">
            Red Bull en chiffres
          </h2>
          <p className="text-xl text-gray-300">
            Une présence mondiale, une passion sans limites
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-gray-800/40 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                <motion.div
                  className={`${stat.color} mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-5xl md:text-6xl font-bold text-gray-50 mb-2">
                  <CountUpAnimation value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-300 text-lg">{stat.label}</p>
              </div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${stat.color.replace('text-', '')}20, transparent)`,
                  filter: 'blur(20px)',
                  zIndex: -1,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
