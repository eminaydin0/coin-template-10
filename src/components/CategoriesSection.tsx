import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

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

  // Duplicate categories for seamless loop
  const duplicatedCategories = [...categories, ...categories, ...categories];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Gradient Overlays */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(15, 23, 42, 1) 0%, transparent 100%)',
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(270deg, rgba(15, 23, 42, 1) 0%, transparent 100%)',
        }}
      />

      {/* Infinite Scrolling Container */}
      <motion.div
        className="flex gap-4 py-2"
        animate={{
          x: [0, -(160 + 16) * categories.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: categories.length * 3,
            ease: "linear",
          },
        }}
      >
        {duplicatedCategories.map((category, index) => (
          <div key={`${category.id || category.slug}-${index}`} className="flex-shrink-0" style={{ width: '160px' }}>
            <CategoryCard category={category} index={index} />
          </div>
        ))}
      </motion.div>
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
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -4 }}
        className="relative h-full"
      >
        {/* Modern Card Container */}
        <div
          className="relative rounded-2xl transition-all duration-300 overflow-hidden flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: isHovered
              ? '0 12px 32px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.3)'
              : '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(20px)',
            width: '160px',
            height: '160px',
            padding: '16px',
          }}
        >
          {/* Animated Top Border */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Diagonal Accent */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 opacity-20"
            style={{
              background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
            }}
          />


          <div className="relative z-10 flex flex-col items-center justify-center gap-3 w-full h-full">
            {/* Compact Image/Icon */}
            <motion.div
              className="relative rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.25))',
                border: '2px solid rgba(59, 130, 246, 0.4)',
                boxShadow: isHovered
                  ? '0 8px 24px rgba(59, 130, 246, 0.5)'
                  : '0 4px 16px rgba(0, 0, 0, 0.3)',
                width: '80px',
                height: '80px',
              }}
            >
              {!error && category.url ? (
                <img
                  src={category.url}
                  alt={category.name}
                  className="h-full w-full object-cover"
                  onError={() => setError(true)}
                />
              ) : (
                <span className="text-blue-300 font-black text-lg">
                  {initials(category.name)}
                </span>
              )}
            </motion.div>

            {/* Category Name */}
            <div className="text-center w-full">
              <h3
                className="text-sm font-bold transition-colors duration-300 line-clamp-2"
                style={{
                  color: isHovered ? 'rgba(96, 165, 250, 1)' : 'rgba(248, 250, 252, 0.95)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                }}
              >
                {category.name}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
