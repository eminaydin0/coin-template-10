import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Users, Sparkles } from 'lucide-react';

interface HomepageItem {
  id: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  people?: number;
  categoryName?: string;
}

interface MoreGamesSectionProps {
  homepageItems: HomepageItem[];
}

const MoreGamesSection = ({ homepageItems }: MoreGamesSectionProps) => {
  const moreGames = homepageItems.slice(10, Math.min(homepageItems.length, 30));

  if (moreGames.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                  border: '2px solid rgba(96, 165, 250, 0.4)',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                }}
              >
                <Sparkles className="h-7 w-7 text-blue-300" />
              </div>
            </motion.div>
            <div>
              <h3 className="text-3xl font-black text-white mb-1">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Daha Fazla Oyun
                </span>
              </h3>
              <p className="text-sm text-gray-400">Geniş oyun koleksiyonumuz</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {moreGames.map((item, index) => (
          <MoreGameCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const MoreGameCard = ({ item, index }: { item: HomepageItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/epin/${item.slug}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ y: -4 }}
          className="relative rounded-2xl border-2 overflow-hidden transition-all duration-300 h-full flex flex-col"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: isHovered
              ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.3)'
              : '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Animated Top Border */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 z-30"
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
            className="absolute top-0 right-0 w-32 h-32 opacity-20"
            style={{
              background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
            }}
          />

          {/* Image */}
          <div className="relative h-32 overflow-hidden">
            {item.url && !imageError ? (
              <motion.img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 flex items-center justify-center">
                <Gamepad2 className="h-10 w-10 text-blue-300" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative flex-1 flex flex-col">
            {/* Asymmetric Header with Diagonal Cut */}
            <div 
              className="relative px-3 pt-3 pb-2.5 mb-2"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.08))',
                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
              }}
            >
              <div className="flex items-start justify-between relative z-10">
                {item.categoryName && (
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="w-5 h-5 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                        border: '1px solid rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <Gamepad2 className="h-2.5 w-2.5 text-blue-300" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wide">
                      {item.categoryName}
                    </span>
                  </div>
                )}
                {item.people !== undefined && item.people > 0 && (
                  <div 
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded-md"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Users className="h-2.5 w-2.5 text-blue-400" />
                    <span className="text-[9px] font-bold text-gray-300">{item.people}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Title with Side Accent */}
            <div className="px-3 mb-3 relative">
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                style={{
                  background: 'linear-gradient(180deg, #3B82F6, #8B5CF6, #EC4899)',
                }}
              />
              <h3 className="text-white font-bold text-xs line-clamp-2 leading-tight pl-2.5">
                {item.name}
              </h3>
            </div>

            {/* Price Section - Unique Layout */}
            <div className="mt-auto px-3 pb-3">
              <div 
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(30, 41, 59, 0.3))',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                {/* Diagonal Split Background */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
                  }}
                />
                
                <div className="relative z-10 p-2">
                  <div className="flex items-center justify-between">
                    {/* Left: Price */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-0.5 mb-0.5">
                        <div className="w-1 h-1 rounded-full bg-blue-400" />
                        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                          Fiyat
                        </span>
                      </div>
                      {item.originalPrice && item.originalPrice !== item.price && (
                        <span className="text-[9px] text-gray-500 line-through mb-0.5">
                          {typeof item.originalPrice === 'string' ? item.originalPrice : `${item.originalPrice}₺`}
                        </span>
                      )}
                      <span 
                        className="text-lg font-black leading-none"
                        style={{
                          background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #F472B6)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {typeof item.price === 'string' ? item.price : `${item.price}₺`}
                      </span>
                    </div>

                    {/* Right: CTA Button */}
                    <div 
                      className="relative px-3 py-2 rounded-lg font-black text-[9px] text-white uppercase tracking-wider overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                      }}
                    >
                      {/* Corner Accent */}
                      <div 
                        className="absolute top-0 right-0 w-6 h-6"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        }}
                      />
                      <span className="relative z-10">Al</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default MoreGamesSection;
