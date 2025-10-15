import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

interface ProductSectionProps {
  variant: 'original' | 'sugarfree' | 'orange';
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
}

const ProductSection = ({
  variant,
  title,
  description,
  ctaText,
  ctaLink,
  imageUrl,
  imageAlt,
  reverse = false,
}: ProductSectionProps) => {
  const bgColors = {
    original: 'bg-gradient-2',
    sugarfree: 'bg-neutral',
    orange: 'bg-gradient-to-br from-neutral via-neutral to-tertiary/20',
  };

  return (
    <section
      className={`product-section relative w-full min-h-screen ${bgColors[variant]} py-32 px-8 md:px-16 lg:px-32`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <motion.div
            className={`space-y-8 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-50">
              {title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              {description}
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary border-primary hover:bg-primary hover:text-primary-foreground font-normal text-base px-8 py-6 group"
              asChild
            >
              <a href={ctaLink}>
                {ctaText}
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </a>
            </Button>
          </motion.div>

          {/* 3D Can Image */}
          <motion.div
            className={`relative ${reverse ? 'lg:order-1' : 'lg:order-2'}`}
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto max-w-md mx-auto drop-shadow-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
