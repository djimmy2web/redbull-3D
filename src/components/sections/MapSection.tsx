import { motion } from 'framer-motion';
import { MapPinIcon, StoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  city: string;
  country: string;
  stores: number;
  coordinates: { x: number; y: number };
}

const locations: Location[] = [
  { city: 'Paris', country: 'France', stores: 450, coordinates: { x: 50, y: 35 } },
  { city: 'New York', country: 'USA', stores: 680, coordinates: { x: 25, y: 40 } },
  { city: 'Tokyo', country: 'Japon', stores: 520, coordinates: { x: 85, y: 42 } },
  { city: 'Sydney', country: 'Australie', stores: 280, coordinates: { x: 88, y: 75 } },
  { city: 'São Paulo', country: 'Brésil', stores: 390, coordinates: { x: 32, y: 68 } },
  { city: 'Dubai', country: 'UAE', stores: 310, coordinates: { x: 60, y: 48 } },
];

const MapSection = () => {
  return (
    <section className="relative w-full py-32 px-8 md:px-16 lg:px-32 bg-gradient-to-b from-neutral via-gray-800 to-neutral overflow-hidden">
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
          <MapPinIcon className="w-6 h-6 text-primary" strokeWidth={2} />
          <span className="text-primary font-semibold uppercase tracking-wider">
            Où nous trouver
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-50 mb-6">
          Présence mondiale
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Red Bull est disponible dans plus de 171 pays à travers le monde
        </p>
      </motion.div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative bg-gray-800/40 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* World Map Illustration */}
          <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            {/* Animated connections */}
            <svg className="absolute inset-0 w-full h-full">
              {locations.map((location, index) => (
                <motion.circle
                  key={location.city}
                  cx={`${location.coordinates.x}%`}
                  cy={`${location.coordinates.y}%`}
                  r="0"
                  fill="rgba(59, 130, 246, 0.3)"
                  initial={{ r: 0 }}
                  animate={{ r: [0, 100, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              ))}
            </svg>

            {/* Location pins */}
            {locations.map((location, index) => (
              <motion.div
                key={location.city}
                className="absolute group cursor-pointer"
                style={{
                  left: `${location.coordinates.x}%`,
                  top: `${location.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-4 h-4 bg-primary rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.7)',
                        '0 0 0 20px rgba(59, 130, 246, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  {/* Tooltip */}
                  <motion.div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 border border-primary/30 whitespace-nowrap shadow-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPinIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                        <span className="font-bold text-white">{location.city}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{location.country}</p>
                      <div className="flex items-center gap-2 text-primary text-sm">
                        <StoreIcon className="w-4 h-4" strokeWidth={2} />
                        <span>{location.stores} points de vente</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-12 py-7 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300"
            >
              Trouver un point de vente près de chez vous
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
