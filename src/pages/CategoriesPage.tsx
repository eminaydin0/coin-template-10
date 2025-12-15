import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { getCategories } from '../services/api';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
  productCount?: number;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Kategoriler yükleniyor...');
        const response = await getCategories();
        console.log('API Response:', response);
        setCategories(response.data || []);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <CommonBackground />
        <LoadingSpinner 
          size="xl" 
          text="Kategoriler Yükleniyor..." 
          variant="gaming" 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
      <SEOHead />
      <CommonBackground />

      <div className="w-full relative z-10">
        {/* Ultra Premium Hero Section */}
        <div className="w-full mb-8 px-4 sm:px-6 lg:px-8 pt-8 pb-6 relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-20 right-1/4 w-80 h-80 rounded-full opacity-30 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
              }}
              animate={{
                y: [0, 30, 0],
                scale: [1.1, 1, 1.1],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-1/2 w-72 h-72 rounded-full opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)',
              }}
              animate={{
                x: [-30, 30, -30],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative">
            {/* Epic Title Section - Modern & Minimal */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1"
              >
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                    Oyun Dünyası
                  </span>
                </motion.div>

                {/* Main Title */}
                <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none mb-4">
                  <motion.span
                    className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Kategoriler
                  </motion.span>
                </h1>
                
                <motion.p
                  className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  En sevdiğin oyun türünü keşfet, maceraya atıl ve efsanevi deneyimler yaşa
                </motion.p>
              </motion.div>

              {/* Premium Stats Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Main Stats Card */}
                <div
                  className="px-8 py-5 rounded-3xl backdrop-blur-xl relative overflow-hidden border-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                  }}
                >
                  {/* Diagonal Accent */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-20"
                    style={{
                      background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
                      clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                    }}
                  />

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
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-1.5">
                        Toplam Kategori
                      </span>
                      <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {categories.length}
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Layers className="h-12 w-12 text-blue-400/40" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 rounded-full mb-4"
              style={{
                background: 'linear-gradient(90deg, transparent, #3B82F6, #8B5CF6, #EC4899, transparent)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              }}
            />
          </div>
        </div>

        {/* Categories Section */}
        <section className="relative py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {categories.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 rounded-3xl border-2 backdrop-blur-xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                  }}
                >
                  {/* Diagonal Accent */}
                  <div 
                    className="absolute top-0 right-0 w-64 h-64 opacity-20"
                    style={{
                      background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
                      clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                    }}
                  />

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

                  <div className="relative z-10">
                    <Gamepad2 className="h-16 w-16 text-blue-400/50 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-white mb-3">
                      Kategori bulunamadı
                    </h3>
                    <p className="text-gray-400">Yakında yeni kategoriler eklenecektir.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-4"
                >
                  {categories.map((category, index) => (
                    <ListView key={category.id} category={category} index={index} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <CallToActionSection />
      </div>
    </div>
  );
};

// List View Component
const ListView = ({ category, index }: { category: Category; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link 
        to={`/oyunlar/${category.slug}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative rounded-3xl overflow-hidden border-2"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(20px)',
          }}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Diagonal Accent */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 opacity-20"
            style={{
              background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
            }}
          />

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

          {/* Glow Bar */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl"
            style={{
              background: 'linear-gradient(180deg, #3B82F6, #8B5CF6, #EC4899)',
            }}
            animate={{ 
              scaleY: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          <div className="flex items-center gap-6 p-6 sm:p-7 relative z-10">
            {/* Image Thumbnail */}
            <div className="relative flex-shrink-0">
              <div className="w-40 h-40 rounded-3xl overflow-hidden relative">
                {category.url && !imageError ? (
                  <motion.img
                    src={category.url}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    loading="lazy"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 flex items-center justify-center">
                    <Gamepad2 className="h-16 w-16 text-blue-400/70" />
                  </div>
                )}
              </div>
              
              {/* Corner Badge */}
              {category.productCount && category.productCount > 0 && (
                <motion.div
                  className="absolute -top-3 -right-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.08, type: "spring" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl backdrop-blur-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.6)',
                    }}
                  >
                    <span className="text-white text-lg font-black">{category.productCount}</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-3xl font-black text-white mb-3 leading-tight">
                {category.name}
              </h3>
              
              {category.description && (
                <p className="text-gray-300 text-base line-clamp-2 mb-4 leading-relaxed">
                  {category.description}
                </p>
              )}

              <div className="flex items-center gap-3">
                <div
                  className="px-4 py-2 rounded-xl backdrop-blur-xl"
                  style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
                    Kategori
                  </span>
                </div>
                
                <motion.div
                  className="flex items-center gap-2 text-blue-400 font-bold"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm">Keşfet</span>
                </motion.div>
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              className="flex-shrink-0"
              animate={{ 
                x: isHovered ? 6 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-16 h-16 rounded-2xl backdrop-blur-xl flex items-center justify-center"
                style={{
                  background: isHovered
                    ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  boxShadow: isHovered ? '0 8px 24px rgba(59, 130, 246, 0.5)' : 'none',
                }}
              >
                <ChevronRight className="h-7 w-7 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoriesPage;