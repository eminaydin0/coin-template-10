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
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))',
                  border: '2px solid rgba(236, 72, 153, 0.4)',
                  boxShadow: '0 8px 24px rgba(236, 72, 153, 0.3)',
                }}
              >
                <Flame className="h-7 w-7 text-pink-400 relative z-10" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)',
                      'radial-gradient(circle, rgba(236, 72, 153, 0.6), transparent)',
                      'radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            <div>
              <h3 className="text-3xl font-black text-white mb-1">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
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
          className="relative rounded-2xl border-2 overflow-hidden transition-all duration-400 flex flex-col h-full"
          whileHover={{ y: -6, scale: 1.03 }}
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))'
              : 'linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.9))',
            border: isHovered
              ? '2px solid rgba(236, 72, 153, 0.6)'
              : '2px solid rgba(236, 72, 153, 0.3)',
            boxShadow: isHovered
              ? '0 20px 60px rgba(236, 72, 153, 0.4), 0 0 80px rgba(236, 72, 153, 0.2)'
              : '0 8px 32px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Corner Accent */}
          <div 
            className="absolute top-0 left-0 w-24 h-24 opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.4), transparent)',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            }}
          />

          {/* Shine Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ x: '-100%', rotate: 45 }}
              animate={{ x: '200%', rotate: 45 }}
              transition={{ duration: 0.8 }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
              }}
            />
          )}

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
            <motion.div
              className="absolute top-2 right-2 z-20 px-2 py-1 rounded-lg flex items-center gap-1"
              style={{
                background: 'rgba(236, 72, 153, 0.3)',
                border: '1px solid rgba(236, 72, 153, 0.5)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 16px rgba(236, 72, 153, 0.3)',
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Flame className="h-3 w-3 text-pink-300" />
            </motion.div>

            {/* Rating Badge - Top Left */}
            {game.rating && (
              <div className="absolute top-2 left-2 z-20 flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/30 border border-blue-500/40 backdrop-blur-sm">
                <Star className="h-3 w-3 text-yellow-300 fill-current" />
                <span className="text-white text-xs font-bold">{game.rating}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 flex-1 flex flex-col">
            {/* Category */}
            {game.categoryName && (
              <div className="mb-1.5">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded"
                  style={{
                    background: 'rgba(236, 72, 153, 0.2)',
                    border: '1px solid rgba(236, 72, 153, 0.3)',
                    color: 'rgba(236, 72, 153, 1)',
                  }}
                >
                  {game.categoryName}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-white font-bold text-xs mb-2 line-clamp-2 leading-tight group-hover:text-pink-300 transition-colors">
              {game.name}
            </h3>

            {/* Price Section */}
            <div className="mt-auto pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-pink-300 font-black text-sm">
                  {typeof game.price === 'string' ? game.price : `${game.price}₺`}
                </span>
                {game.people !== undefined && game.people > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Users className="h-3 w-3" />
                    <span>{game.people}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default BestSellingGamesSection;
