import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Gamepad2, Star, Users, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { getHomepageItems } from '../services/api';

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

const PopularProductsSection = () => {
  const [homepageItems, setHomepageItems] = useState<HomepageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start', 
      dragFree: false,
      slidesToScroll: 'auto'
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const loadPopularProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getHomepageItems(20);
      setHomepageItems(response.data || []);
    } catch (error) {
      console.error('Popüler ürünler yüklenirken hata:', error);
      setHomepageItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPopularProducts();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  if (isLoading || homepageItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/30" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
            </div>
            <span className="text-white text-sm font-medium">Oyunlar yükleniyor...</span>
          </div>
        ) : (
          <div className="text-center">
            <Gamepad2 className="w-12 h-12 text-blue-300/50 mx-auto mb-4" />
            <span className="text-gray-400 text-sm">Henüz popüler oyun bulunmuyor</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Asymmetric Header */}
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
                <TrendingUp className="h-7 w-7 text-blue-300" />
              </div>
            </motion.div>
            <div>
              <h3 className="text-3xl font-black text-white mb-1">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Popüler Oyunlar
                </span>
              </h3>
              <p className="text-sm text-gray-400">En çok tercih edilen oyunlar</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {homepageItems.slice(0, 12).map((item) => (
              <div
                key={item.id}
                className="min-w-[240px] sm:min-w-[260px] flex-shrink-0"
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Modern Design */}
        {homepageItems.length > 0 && (
          <>
            <motion.button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: canScrollPrev
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.2))'
                  : 'rgba(75, 85, 99, 0.2)',
                border: canScrollPrev
                  ? '2px solid rgba(96, 165, 250, 0.4)'
                  : '2px solid rgba(75, 85, 99, 0.3)',
                backdropFilter: 'blur(12px)',
                boxShadow: canScrollPrev ? '0 8px 24px rgba(59, 130, 246, 0.3)' : 'none',
              }}
              whileHover={canScrollPrev ? { scale: 1.1, x: -2 } : {}}
              whileTap={canScrollPrev ? { scale: 0.95 } : {}}
              aria-label="Önceki"
            >
              <ChevronLeft 
                className="w-5 h-5" 
                style={{ 
                  color: canScrollPrev ? 'rgba(96, 165, 250, 1)' : 'rgba(156, 163, 175, 0.5)' 
                }} 
              />
            </motion.button>
            <motion.button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: canScrollNext
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.2))'
                  : 'rgba(75, 85, 99, 0.2)',
                border: canScrollNext
                  ? '2px solid rgba(96, 165, 250, 0.4)'
                  : '2px solid rgba(75, 85, 99, 0.3)',
                backdropFilter: 'blur(12px)',
                boxShadow: canScrollNext ? '0 8px 24px rgba(59, 130, 246, 0.3)' : 'none',
              }}
              whileHover={canScrollNext ? { scale: 1.1, x: 2 } : {}}
              whileTap={canScrollNext ? { scale: 0.95 } : {}}
              aria-label="Sonraki"
            >
              <ChevronRight 
                className="w-5 h-5" 
                style={{ 
                  color: canScrollNext ? 'rgba(96, 165, 250, 1)' : 'rgba(156, 163, 175, 0.5)' 
                }} 
              />
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ item }: { item: HomepageItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/epin/${item.slug}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative rounded-2xl border-2 overflow-hidden h-full flex flex-col"
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))'
            : 'linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.9))',
          border: isHovered
            ? '2px solid rgba(96, 165, 250, 0.6)'
            : '2px solid rgba(59, 130, 246, 0.3)',
          boxShadow: isHovered
            ? '0 20px 60px rgba(59, 130, 246, 0.4), 0 0 80px rgba(236, 72, 153, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Diagonal Accent */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.3))',
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          }}
        />

        {/* Shine Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ x: '-100%', rotate: -45 }}
            animate={{ x: '200%', rotate: -45 }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
            }}
          />
        )}

        {/* Image Section */}
        <div className="relative h-40 overflow-hidden">
          {item.url && !imageError ? (
            <motion.img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-pink-500/20 flex items-center justify-center">
              <Gamepad2 className="h-12 w-12 text-blue-300" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Rating Badge - Top Left */}
          {typeof item.rating === 'number' && (
            <motion.div
              className="absolute top-3 left-3 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 z-10"
              style={{
                background: 'rgba(59, 130, 246, 0.3)',
                border: '1px solid rgba(96, 165, 250, 0.5)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Star className="h-3.5 w-3.5 text-yellow-300 fill-current" />
              <span className="text-white text-xs font-bold">{item.rating}</span>
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category Badge */}
          {item.categoryName && (
            <div className="mb-2">
              <span
                className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg"
                style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  color: 'rgba(96, 165, 250, 1)',
                }}
              >
                {item.categoryName}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-white font-bold text-sm mb-3 line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors">
            {item.name}
          </h3>

          {/* Bottom Section */}
          <div className="mt-auto pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-blue-300 font-black text-lg">
                  {typeof item.price === 'string' ? item.price : `${item.price}₺`}
                </span>
              </div>
              {item.people !== undefined && item.people > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Users className="h-3.5 w-3.5" />
                  <span>{item.people}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PopularProductsSection;
