import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  ArrowLeft,
  ChevronRight,
  Tag,
  ChevronLeft,
  MoreHorizontal
} from 'lucide-react';
// Varsayılan API servislerinizi ve component'lerinizi import edin
import { getCategoryDetail, getCategoryProducts } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import CallToActionSection from '../components/CallToActionSection';
import CommonBackground from '../components/CommonBackground'; 


// --- Interface'ler (Aynı Kaldı) ---

interface Product {
  id: string;
  name: string;
  price: string; 
  originalPrice?: string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  rating?: number;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

// --- Ana Component ---

const CategoryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Reset page when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  // API Çağrıları (Aynı Kaldı)
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      try {
        const [categoryResponse, productsResponse] = await Promise.all([
          getCategoryDetail(slug),
          getCategoryProducts(slug)
        ]);
        
        setCategory(categoryResponse.data);
        setProducts(productsResponse.data || []);
      } catch (error) {
        console.error('Kategori verileri yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Loading Ekranı
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <CommonBackground />
        <LoadingSpinner 
          size="xl" 
          text="Veriler Yükleniyor..." 
          variant="gaming"
        />
      </div>
    );
  }

  // Kategori Bulunamadı Ekranı
  if (!category) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <CommonBackground />
        <div 
          className="text-center p-8 rounded-xl border relative z-10"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(75, 85, 99, 0.2)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Gamepad2 className="h-12 w-12 text-purple-300/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Kategori Bulunamadı
          </h2>
          <p className="text-gray-400 mb-6">Aradığınız kategori arayüzde mevcut değil.</p>
          <Link 
            to="/oyunlar" 
            className="group inline-flex items-center px-6 py-3 font-bold text-black rounded-xl transition-all bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.7)]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Kategoriler Sayfasına Dön</span>
          </Link>
        </div>
      </div>
    );
  }

  // Ana İçerik Sayfası
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
      {/* Common Background */}
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
                  <Tag className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                    Kategori
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
                    {category.name}
                  </motion.span>
                </h1>
                
                {category.description && (
                  <motion.p
                    className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {category.description}
                  </motion.p>
                )}
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
                        Toplam Ürün
                      </span>
                      <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {products.length}
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Gamepad2 className="h-12 w-12 text-blue-400/40" />
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

        {/* Products Grid */}
        <section className="relative py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {products.length === 0 ? (
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
                      Bu kategoride ürün bulunmamaktadır
                    </h3>
                    <p className="text-gray-400">Yakında yeni ürünler eklenecektir.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {currentProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Pagination */}
        {products.length > itemsPerPage && (
          <section className="relative py-8">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-center">
                <div 
                  className="flex items-center gap-2 rounded-xl border p-4"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(75, 85, 99, 0.2)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Previous Button */}
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: currentPage === 1 
                        ? 'rgba(75, 85, 99, 0.3)'
                        : 'rgba(139, 92, 246, 0.2)',
                      border: currentPage === 1 
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : '1px solid rgba(168, 85, 247, 0.3)',
                    }}
                    whileHover={currentPage !== 1 ? { scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' } : {}}
                    whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Önceki</span>
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {/* First page */}
                    {currentPage > 3 && (
                      <>
                        <motion.button
                          onClick={() => setCurrentPage(1)}
                          className="w-10 h-10 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                          style={{
                            background: 'rgba(139, 92, 246, 0.2)',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                          }}
                          whileHover={{ scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          1
                        </motion.button>
                        {currentPage > 4 && (
                          <span className="text-white/40 px-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </span>
                        )}
                      </>
                    )}

                    {/* Page range around current page */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      if (pageNum < 1 || pageNum > totalPages) return null;

                      const isActive = pageNum === currentPage;
                      return (
                        <motion.button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10 h-10 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                          style={{
                            background: isActive
                              ? 'rgba(139, 92, 246, 0.4)'
                              : 'rgba(139, 92, 246, 0.2)',
                            border: isActive
                              ? '1px solid rgba(168, 85, 247, 0.5)'
                              : '1px solid rgba(168, 85, 247, 0.3)',
                          }}
                          whileHover={{ scale: 1.05, background: isActive ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    })}

                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <span className="text-white/40 px-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </span>
                        )}
                        <motion.button
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-10 h-10 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                          style={{
                            background: 'rgba(139, 92, 246, 0.2)',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                          }}
                          whileHover={{ scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {totalPages}
                        </motion.button>
                      </>
                    )}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: currentPage === totalPages 
                        ? 'rgba(75, 85, 99, 0.3)'
                        : 'rgba(139, 92, 246, 0.2)',
                      border: currentPage === totalPages 
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : '1px solid rgba(168, 85, 247, 0.3)',
                    }}
                    whileHover={currentPage !== totalPages ? { scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' } : {}}
                    whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                  >
                    <span>Sonraki</span>
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action Section */}
           <CallToActionSection />
      </div>
    </div>
  );
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link 
        to={`/epin/${product.slug}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.01 }}
          className="relative rounded-3xl border-2 overflow-hidden h-full flex flex-col"
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98))'
              : 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
            border: isHovered
              ? '2px solid rgba(59, 130, 246, 0.5)'
              : '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: isHovered
              ? '0 30px 80px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.2), 0 0 60px rgba(139, 92, 246, 0.2)'
              : '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(20px)',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Glow Effect on Hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.3), transparent 70%)',
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Diagonal Accent */}
          <motion.div 
            className="absolute top-0 right-0 w-40 h-40"
            style={{
              background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
            }}
            animate={{ opacity: isHovered ? 0.3 : 0.2 }}
            transition={{ duration: 0.3 }}
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

          {/* Product Image */}
          <div className="relative h-52 overflow-hidden">
            {product.url && !imageError ? (
              <>
                <motion.img
                  src={product.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  loading="lazy"
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Image Overlay on Hover */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                  }}
                  animate={{ opacity: isHovered ? 0.4 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 flex items-center justify-center">
                <Gamepad2 className="h-20 w-20 text-blue-400/70" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Popular Badge */}
            {product.isPopular && (
              <motion.div
                className="absolute top-4 right-4 rounded-xl px-4 py-2 z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.6)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="text-white text-xs font-bold">POPÜLER</span>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col relative z-10">
            {/* Title */}
            <motion.h3 
              className="text-white font-black text-lg mb-3 line-clamp-2 leading-tight"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {product.name}
            </motion.h3>
            
            {/* Description */}
            {product.description && (
              <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Price & Action */}
            <div className="mt-auto pt-4 border-t" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through mb-1">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                </div>
                <motion.div
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 relative overflow-hidden"
                  style={{
                    background: isHovered
                      ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
                      : 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: isHovered ? '0 8px 24px rgba(59, 130, 246, 0.5)' : 'none',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shine Effect */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  <span className="relative z-10">İncele</span>
                  <ChevronRight className="h-4 w-4 relative z-10" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryDetailPage;