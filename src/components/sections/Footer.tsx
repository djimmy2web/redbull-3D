import { motion } from 'framer-motion';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gradient-to-b from-neutral to-gray-900 py-16 px-8 md:px-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gradient-1">Red Bull</h3>
            <p className="text-gray-300 text-sm">
              Gives you wings. Repoussez vos limites.
            </p>
          </motion.div>

          {/* Products */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-gray-50">Produits</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Red Bull Original
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Red Bull Sugarfree
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Red Bull Éditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Où acheter
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Sports & Events */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-gray-50">Sports & Événements</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Sports Extrêmes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Athlètes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Événements
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Red Bull TV
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-gray-50">Suivez-nous</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/20 transition-all border border-gray-700/50"
                aria-label="Facebook"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FacebookIcon className="w-5 h-5" strokeWidth={2} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/20 transition-all border border-gray-700/50"
                aria-label="Instagram"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <InstagramIcon className="w-5 h-5" strokeWidth={2} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/20 transition-all border border-gray-700/50"
                aria-label="Twitter"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <TwitterIcon className="w-5 h-5" strokeWidth={2} />
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/20 transition-all border border-gray-700/50"
                aria-label="YouTube"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <YoutubeIcon className="w-5 h-5" strokeWidth={2} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-gray-700 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Red Bull. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
