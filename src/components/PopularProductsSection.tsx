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
              {item.categoryName && (
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
                    {item.categoryName}
                  </span>
                </div>
              )}
              {item.people !== undefined && item.people > 0 && (
                <div 
                  className="flex items-center gap-1 px-2 py-1 rounded-md"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Users className="h-3 w-3 text-blue-400" />
                  <span className="text-[10px] font-bold text-gray-300">{item.people}</span>
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
              {item.name}
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
                      {typeof item.price === 'string' ? item.price : `${item.price}₺`}
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
  );
};

export default PopularProductsSection;
