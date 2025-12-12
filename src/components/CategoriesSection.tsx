import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const initials = (name?: string) =>
  (name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  if (!categories.length) return null;

  return (
    <section className="relative w-full">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-2">
        {categories.map((category, index) => (
          <CategoryCard key={category.id || category.slug} category={category} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;

const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/oyunlar/${category.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block group relative"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 120 }}
        whileHover={{ scale: 1.08, y: -8, rotate: isHovered ? 2 : 0 }}
        className="relative"
      >
        {/* Modern Card Container */}
        <div
          className="relative rounded-3xl p-6 transition-all duration-500 overflow-hidden"
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.15))'
              : 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
            border: isHovered
              ? '2px solid rgba(59, 130, 246, 0.6)'
              : '2px solid rgba(59, 130, 246, 0.2)',
            boxShadow: isHovered
              ? '0 20px 60px rgba(59, 130, 246, 0.4), 0 0 80px rgba(236, 72, 153, 0.2), inset 0 0 60px rgba(59, 130, 246, 0.1)'
              : '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Animated Gradient Background */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 opacity-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.6), rgba(236, 72, 153, 0.4), transparent 80%)',
              }}
            />
          )}

          {/* Shine Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ x: '-200%', opacity: 0 }}
              animate={{ x: '200%', opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
          )}

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-20 h-20">
            <div 
              className="absolute top-2 left-2 w-3 h-3 rounded-full"
              style={{
                background: isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.3)',
                boxShadow: isHovered ? '0 0 20px rgba(59, 130, 246, 0.6)' : 'none',
              }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20">
            <div 
              className="absolute bottom-2 right-2 w-3 h-3 rounded-full"
              style={{
                background: isHovered ? 'rgba(236, 72, 153, 0.8)' : 'rgba(236, 72, 153, 0.3)',
                boxShadow: isHovered ? '0 0 20px rgba(236, 72, 153, 0.6)' : 'none',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Large Circular Image/Icon with Modern Design */}
            <motion.div
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500"
              animate={{
                rotate: isHovered ? [0, 5, -5, 0] : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
              style={{
                background: isHovered
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(236, 72, 153, 0.5))'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(236, 72, 153, 0.2))',
                border: isHovered
                  ? '3px solid rgba(59, 130, 246, 0.9)'
                  : '3px solid rgba(59, 130, 246, 0.4)',
                boxShadow: isHovered
                  ? '0 12px 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(236, 72, 153, 0.4), inset 0 0 30px rgba(59, 130, 246, 0.3)'
                  : '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)',
              }}
            >
              {!error && category.url ? (
                <motion.img
                  src={category.url}
                  alt={category.name}
                  className="h-full w-full object-cover"
                  onError={() => setError(true)}
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <span className="text-blue-300 font-black text-2xl sm:text-3xl">
                  {initials(category.name)}
                </span>
              )}
              
              {/* Pulsing Glow Effect */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(236, 72, 153, 0.6), transparent)',
                  }}
                />
              )}

              {/* Sparkle Icon on Hover */}
              {isHovered && (
                <motion.div
                  className="absolute -top-2 -right-2 z-20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div className="relative">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Zap className="h-3 w-3 text-pink-400 absolute top-0.5 left-0.5" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Category Name with Modern Typography */}
            <div className="text-center space-y-2">
              <motion.h3
                className="text-base sm:text-lg font-bold mb-1 transition-colors"
                animate={{
                  color: isHovered ? 'rgba(96, 165, 250, 1)' : 'rgba(248, 250, 252, 0.95)',
                }}
                style={{
                  textShadow: isHovered 
                    ? '0 0 30px rgba(59, 130, 246, 0.9), 0 4px 15px rgba(59, 130, 246, 0.5)' 
                    : '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                {category.name}
              </motion.h3>
              
              {/* Arrow Indicator with Animation */}
              <motion.div
                className="flex items-center justify-center gap-2"
                animate={{
                  opacity: isHovered ? 1 : 0.6,
                  x: isHovered ? 4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xs text-slate-400 font-medium">Keşfet</span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0, repeatType: 'reverse' }}
                >
                  <ArrowRight className="h-4 w-4 text-blue-400" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
