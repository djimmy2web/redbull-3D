import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

const images: GalleryImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=1200&h=800&fit=crop',
    title: 'Red Bull Rampage',
    category: 'VTT',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&h=800&fit=crop',
    title: 'Formule 1',
    category: 'Racing',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=800&fit=crop',
    title: 'Ski Freestyle',
    category: 'Sports d\'hiver',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
    title: 'Red Bull Flugtag',
    category: 'Aviation',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop',
    title: 'Music Festival',
    category: 'Musique',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop',
    title: 'Surf Competition',
    category: 'Sports nautiques',
  },
];

const Gallery360Section = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  return (
    <section className="relative w-full py-32 px-8 md:px-16 lg:px-32 bg-gradient-to-b from-neutral via-gray-900 to-neutral overflow-hidden">
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-50 mb-6">
          Galerie 360°
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Plongez au cœur de l'action avec nos événements les plus spectaculaires
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="relative group cursor-pointer rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative h-80">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-2">
                  {image.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{image.title}</h3>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <span className="text-white text-lg font-semibold">Voir en grand</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors z-10"
          >
            <XIcon className="w-6 h-6 text-white" strokeWidth={2} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-8 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors z-10"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" strokeWidth={2} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-8 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors z-10"
          >
            <ChevronRightIcon className="w-6 h-6 text-white" strokeWidth={2} />
          </button>

          {/* Image */}
          <motion.div
            className="max-w-6xl max-h-[80vh] relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].title}
              className="w-full h-full object-contain rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <span className="inline-block px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-2">
                {images[selectedImage].category}
              </span>
              <h3 className="text-3xl font-bold text-white">{images[selectedImage].title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery360Section;
