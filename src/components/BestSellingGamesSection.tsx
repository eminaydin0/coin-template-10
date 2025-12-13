import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Gamepad2, Flame, Star } from 'lucide-react';

interface HomepageItem {
  id: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  rating?: number;
  people?: number;
  categoryName?: string;
}

interface BestSellingGamesSectionProps {
  homepageItems: HomepageItem[];
}

const BestSellingGamesSection: React.FC<BestSellingGamesSectionProps> = ({ homepageItems }) => {
  const [bestSellingGames, setBestSellingGames] = useState<HomepageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (homepageItems.length > 0) {
      setBestSellingGames(homepageItems.slice(0, 8));
      setIsLoading(false);
    }
  }, [homepageItems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30" />
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
          </div>
          <span className="text-white text-sm font-medium">Oyunlar yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (bestSellingGames.length === 0) {
    return (
      <div className="text-center py-16">
        <Gamepad2 className="w-12 h-12 text-blue-300/50 mx-auto mb-4" />
        <span className="text-gray-400 text-sm">Henüz en çok satan oyun bulunmuyor</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Asymmetric Header with Icon */}
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
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                }}
              >
                <Flame className="h-7 w-7 text-blue-400 relative z-10" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)',
                      'radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent)',
                      'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            <div>
              <h3 className="text-3xl font-black text-white mb-1">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  En Çok Satan Oyunlar
                </span>
              </h3>
              <p className="text-sm text-gray-400">Oyuncuların en çok tercih ettikleri oyunlar</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Asymmetric Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {bestSellingGames.map((game, index) => (
          <BestSellingCard key={game.id} game={game} index={index} />
        ))}
      </div>
    </div>
  );
};

const BestSellingCard = ({ game, index }: { game: HomepageItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/epin/${game.slug}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative rounded-2xl border-2 overflow-hidden transition-all duration-300 flex flex-col h-full"
          whileHover={{ y: -4 }}
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
          <div className="relative h-36 overflow-hidden">
            {game.url && !imageError ? (
              <motion.img
                src={game.url}
                alt={game.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                animate={{ scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-500/30 to-blue-500/20 flex items-center justify-center">
                <Gamepad2 className="h-10 w-10 text-pink-300" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
            
            {/* Best Seller Badge - Top Right */}
            <div
              className="absolute top-2 right-2 z-20 px-2 py-1 rounded-lg flex items-center gap-1"
              style={{
                background: 'rgba(59, 130, 246, 0.3)',
                border: '1px solid rgba(59, 130, 246, 0.5)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
              }}
            >
              <Flame className="h-3 w-3 text-blue-300" />
            </div>

            {/* Rating Badge - Top Left */}
            {game.rating && (
              <div className="absolute top-2 left-2 z-20 flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/30 border border-blue-500/40 backdrop-blur-sm">
                <Star className="h-3 w-3 text-yellow-300 fill-current" />
                <span className="text-white text-xs font-bold">{game.rating}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative flex-1 flex flex-col">
            {/* Asymmetric Header with Diagonal Cut */}
            <div 
              className="relative px-4 pt-4 pb-3 mb-3"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.08))',
                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
              }}
            >
              <div className="flex items-start justify-between relative z-10">
                {game.categoryName && (
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                        border: '1px solid rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <Gamepad2 className="h-3 w-3 text-blue-300" />
                    </div>
                    <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wide">
                      {game.categoryName}
                    </span>
                  </div>
                )}
                {game.people !== undefined && game.people > 0 && (
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded-md"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Users className="h-3 w-3 text-blue-400" />
                    <span className="text-[10px] font-bold text-gray-300">{game.people}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Title with Side Accent */}
            <div className="px-4 mb-4 relative">
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                style={{
                  background: 'linear-gradient(180deg, #3B82F6, #8B5CF6, #EC4899)',
                }}
              />
              <h3 className="text-white font-bold text-sm line-clamp-2 leading-tight pl-3">
                {game.name}
              </h3>
            </div>

            {/* Price Section - Unique Layout */}
            <div className="mt-auto px-4 pb-4">
              <div 
                className="relative rounded-2xl overflow-hidden"
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
                
                <div className="relative z-10 p-3">
                  <div className="flex items-center justify-between">
                    {/* Left: Price */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-1 h-1 rounded-full bg-blue-400" />
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                          Fiyat
                        </span>
                      </div>
                      <span 
                        className="text-2xl font-black leading-none"
                        style={{
                          background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #F472B6)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {typeof game.price === 'string' ? game.price : `${game.price}₺`}
                      </span>
                    </div>

                    {/* Right: CTA Button */}
                    <div 
                      className="relative px-4 py-2.5 rounded-xl font-black text-[10px] text-white uppercase tracking-wider overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                      }}
                    >
                      {/* Corner Accent */}
                      <div 
                        className="absolute top-0 right-0 w-8 h-8"
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

export default BestSellingGamesSection;
