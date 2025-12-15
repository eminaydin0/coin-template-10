import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Zap, Gamepad2, Shield, Tag } from 'lucide-react';
import { getProductDetail } from '../services/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';
import CommonBackground from '../components/CommonBackground';

interface ProductResponse {
  product: {
    id: string;
    name: string;
    slug: string;
    url?: string;
    detail?: string;
    price: string; // "₺1.325,00" formatında
  };
  category: {
    name: string;
    slug: string;
    url?: string;
  };
}

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" as const
    } 
  },
};

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await getProductDetail(slug);
        setProductData(response.data);
      } catch (error) {
        console.error('Ürün detayı yüklenirken hata:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, navigate]);

  const handleAddToCart = () => {
    if (productData) addItem(productData.product.id, 1);
  };

  const handleBuyNow = () => {
    if (productData) {
      addItem(productData.product.id, 1);
      navigate('/sepet');
    }
  };

  const { product, category } = productData || {} as ProductResponse;

  // TL fiyat metnini güvenli şekilde göster (stringi aynen koruyoruz; parse etmiyoruz ki API sözleşmesi bozulmasın)
  const displayPrice = useMemo(() => product?.price ?? '—', [product?.price]);

  if (loading) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
          <CommonBackground />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <LoadingSpinner size="xl" text="Ürün Yükleniyor..." variant="gaming" />
          </motion.div>
      </div>
      </>
    );
  }

  if (!productData) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
          <CommonBackground />
          <motion.div 
            variants={fadeIn} 
            initial="hidden" 
            animate="show" 
            className="text-center p-8 rounded-3xl border-2 max-w-md mx-auto relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
              backdropFilter: 'blur(20px)',
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
              <Gamepad2 className="w-16 h-16 text-blue-400/50 mx-auto mb-6" />
              <h2 className="text-2xl font-black text-white mb-3">Ürün Bulunamadı</h2>
              <p className="text-gray-400 mb-6">Aradığınız ürün mevcut değil.</p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white rounded-xl transition-all relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                Ana sayfaya dön
              </Link>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead />
    <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
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
                    {category.name}
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
                    {product.name}
                  </motion.span>
                </h1>
                
                <motion.p
                  className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {category.name} kategorisinde premium ürün
                </motion.p>
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

        {/* Product Details Section */}
        <section className="relative py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <div 
                  className="relative rounded-3xl border-2 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                    backdropFilter: 'blur(20px)',
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

                  <div className="aspect-video relative overflow-hidden">
                    <AnimatePresence initial={false}>
                      {!imgError && product.url ? (
                        <motion.img
                          key={product.url}
                          src={product.url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <motion.div 
                          key="fallback" 
                          className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30"
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                        >
                          <Gamepad2 className="w-20 h-20 text-blue-400/70 mb-3" />
                          <span className="text-gray-400 text-sm">Görsel bulunamadı</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div 
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.6)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {category.name?.toUpperCase()}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-1"
              >
                <div 
                  className="relative rounded-3xl border-2 p-6 sm:p-7 h-full flex flex-col"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                    backdropFilter: 'blur(20px)',
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

                  {/* Price */}
                  <div className="text-center mb-6 relative z-10">
                    <div className="flex items-center justify-center gap-2 text-blue-400 text-sm mb-3">
                      <motion.div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: '#3B82F6' }}
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="font-semibold">Anlık Fiyat</span>
                    </div>
                    <div className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider mb-4">
                      {displayPrice}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>Güvenli Ödeme</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-auto space-y-3 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBuyNow}
                      className="w-full font-bold text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                      }}
                    >
                      {/* Animated Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <Zap className="h-5 w-5 relative z-10" />
                      <span className="relative z-10">HEMEN SATIN AL</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="w-full px-6 py-4 rounded-xl text-white font-bold transition-all duration-300 flex items-center justify-center gap-2"
                      style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        border: '2px solid rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>SEPETE EKLE</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              </div>

              {/* Product Description */}
              {product.detail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6"
                >
                  <div 
                    className="rounded-3xl border-2 p-6 sm:p-7 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                      backdropFilter: 'blur(20px)',
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
                      <h2 className="text-2xl font-black text-white mb-5">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Ürün Açıklaması
                        </span>
                      </h2>
                      <div 
                        className="text-gray-300 text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: product.detail }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default ProductDetailPage;
