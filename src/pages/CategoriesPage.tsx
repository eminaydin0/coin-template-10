import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  ArrowRight,
  Home,
  ChevronRight,
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
      
      {/* Common Background */}
      <CommonBackground />

      <div className="w-full relative z-10">
        {/* Header Section - Simple & Clean */}
        <div className="w-full mb-8 px-4 sm:px-6 lg:px-8 pt-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link 
                to="/" 
                className="flex items-center gap-1.5 text-gray-400 hover:text-blue-300 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Ana Sayfa</span>
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-600" />
              <span className="text-white font-medium">Kategoriler</span>
            </div>

            {/* Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-white mb-2">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Kategoriler
                  </span>
                </h1>
                <p className="text-gray-400">Tüm oyun kategorilerini keşfedin</p>
              </div>
              
              <div className="hidden sm:block">
                <div
                  className="px-4 py-2 rounded-xl"
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <span className="text-sm font-bold text-blue-300">
                    {categories.length} Kategori
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <section className="relative py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {categories.length === 0 ? (
                <div 
                  className="text-center py-16 rounded-2xl border"
                  style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Gamepad2 className="h-12 w-12 text-purple-300/50 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Kategori bulunamadı
                  </h3>
                  <p className="text-gray-400 text-sm">Yakında yeni kategoriler eklenecektir.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {categories.map((category, index) => (
                    <CategoryCard key={category.id} category={category} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection />
      </div>
    </div>
  );
};

const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link 
        to={`/oyunlar/${category.slug}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative rounded-3xl overflow-hidden h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: isHovered
              ? '0 30px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.4)'
              : '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Animated Gradient Border */}
          <motion.div
            className="absolute inset-0 rounded-3xl z-0"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)',
              backgroundSize: '300% 300%',
              opacity: isHovered ? 0.3 : 0,
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Image Section - Larger */}
          <div className="relative h-64 overflow-hidden">
            {category.url && !imageError ? (
              <motion.img
                src={category.url}
                alt={category.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                loading="lazy"
                animate={{ 
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 2 : 0,
                }}
                transition={{ duration: 0.6 }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Gamepad2 className="h-16 w-16 text-blue-300" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.95) 100%)',
              }}
            />

            {/* Floating Badge */}
            {category.productCount && category.productCount > 0 && (
              <motion.div
                className="absolute top-4 right-4 z-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
              >
                <div
                  className="rounded-2xl px-4 py-2 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))',
                    border: '2px solid rgba(96, 165, 250, 0.6)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  <Gamepad2 className="h-4 w-4 text-blue-300" />
                  <span className="text-white text-sm font-black">{category.productCount}+</span>
                </div>
              </motion.div>
            )}

            {/* Category Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <motion.h3 
                className="text-white font-black text-2xl mb-2 leading-tight"
                animate={{
                  y: isHovered ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {category.name}
              </motion.h3>
              
              {category.description && (
                <motion.p 
                  className="text-gray-300 text-sm line-clamp-2 leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    height: isHovered ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {category.description}
                </motion.p>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div 
            className="relative z-10 px-6 py-4"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderTop: '1px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            <motion.div
              className="flex items-center justify-between"
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-bold text-blue-300">Kategoriye Git</span>
              <motion.div
                animate={{
                  x: isHovered ? 4 : 0,
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-5 w-5 text-blue-300" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoriesPage;
