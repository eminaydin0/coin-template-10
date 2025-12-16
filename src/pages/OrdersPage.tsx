import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  CreditCard,
  ShoppingCart,
  Tag
} from 'lucide-react';
import { getOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

interface Order {
  id: string;
  orderId: string;
  status: {
    text: string;
    color: string;
  };
  price: string;
  date: string;
}

// Get status info helper
const getStatusInfo = (statusText: string) => {
  switch (statusText) {
    case 'Ödeme Bekleniyor':
      return {
        text: 'Ödeme Bekleniyor',
        color: '#facc15',
        bgColor: 'rgba(234, 179, 8, 0.15)',
        borderColor: 'rgba(234, 179, 8, 0.3)',
        icon: Clock
      };
    case 'Tamamlandı':
      return {
        text: 'Tamamlandı',
        color: '#4ade80',
        bgColor: 'rgba(34, 197, 94, 0.15)',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        icon: CheckCircle
      };
    case 'İptal Edildi':
      return {
        text: 'İptal Edildi',
        color: '#f87171',
        bgColor: 'rgba(239, 68, 68, 0.15)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        icon: XCircle
      };
    default:
      return {
        text: statusText,
        color: '#9ca3af',
        bgColor: 'rgba(107, 114, 128, 0.15)',
        borderColor: 'rgba(107, 114, 128, 0.3)',
        icon: Clock
      };
  }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Component mount olduğunda çalışacak
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setOrders([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await getOrders();
        setOrders(response.data || []);
      } catch (error) {
        console.error('Orders fetch error:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  // Storage event'ini dinle (login/logout için)
  useEffect(() => {
    const handleStorageChange = () => {
      // Storage değiştiğinde component'i yeniden render et
      window.location.reload();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 relative overflow-hidden">
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
                      <Package className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Sipariş Yönetimi
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
                        Siparişlerim
                      </motion.span>
                    </h1>
                    
                    <motion.p
                      className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Tüm siparişlerinizi görüntüleyin, takip edin ve yönetin
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
                            Toplam Sipariş
                          </span>
                          <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {orders.length}
                          </span>
                        </div>
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ShoppingCart className="h-12 w-12 text-blue-400/40" />
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

            {/* Empty State */}
            <section className="relative py-4">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
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
                      <ShoppingCart className="h-16 w-16 text-blue-400/50 mx-auto mb-6" />
                      <h3 className="text-2xl font-black text-white mb-3">
                        Siparişlerinizi görüntülemek için giriş yapın
                      </h3>
                      <p className="text-gray-400 text-base mb-8">
                        Hesabınıza giriş yaparak siparişlerinizi takip edebilirsiniz.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/giris-yap">
                          <motion.button
                            className="font-bold text-white py-3 px-6 rounded-xl transition-all duration-300 relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Animated Background */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{ x: ['-200%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="relative z-10">GİRİŞ YAP</span>
                          </motion.button>
                        </Link>
                        
                        <Link to="/kayit-ol">
                          <motion.button
                            className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all"
                            style={{
                              background: 'rgba(59, 130, 246, 0.15)',
                              border: '2px solid rgba(59, 130, 246, 0.3)',
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            KAYIT OL
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
          <CommonBackground />
          <LoadingSpinner 
            size="xl" 
            text="Siparişler yükleniyor..." 
            variant="gaming" 
          />
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
                    <Package className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                      Sipariş Yönetimi
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
                      Siparişlerim
                    </motion.span>
                  </h1>
                  
                  <motion.p
                    className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Tüm siparişlerinizi görüntüleyin, takip edin ve yönetin
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
                          Toplam Sipariş
                        </span>
                        <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {orders.length}
                        </span>
                      </div>
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ShoppingCart className="h-12 w-12 text-blue-400/40" />
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

          {/* Orders List or Empty State */}
          <section className="relative py-4">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                {orders.length === 0 ? (
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
                      <ShoppingCart className="h-16 w-16 text-blue-400/50 mx-auto mb-6" />
                      <h3 className="text-2xl font-black text-white mb-3">
                        Henüz siparişiniz yok
                      </h3>
                      <p className="text-gray-400 text-base mb-8">
                        İlk siparişinizi vermek için ürünlerimizi keşfedin ve sepetinize ekleyin.
                      </p>
                      
                      <Link to="/oyunlar">
                        <motion.button
                          className="font-bold text-white py-3 px-6 rounded-xl transition-all duration-300 relative overflow-hidden inline-flex items-center gap-2"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Animated Background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <Package className="h-5 w-5 relative z-10" />
                          <span className="relative z-10">ÜRÜNLERİ KEŞFET</span>
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const statusInfo = getStatusInfo(order.status.text);
                      const StatusIcon = statusInfo.icon;
                      
                      return (
                        <OrderCard 
                          key={order.id} 
                          order={order} 
                          statusInfo={statusInfo} 
                          StatusIcon={StatusIcon}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <CallToActionSection />
        </div>
      </div>
    </>
  );
};

// Order Card Component
interface StatusInfo {
  text: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const OrderCard = ({ 
  order, 
  statusInfo, 
  StatusIcon 
}: { 
  order: Order; 
  statusInfo: StatusInfo; 
  StatusIcon: React.ComponentType<{ className?: string }>;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="relative rounded-3xl border-2 overflow-hidden transition-all duration-300" 
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
          border: '2px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(20px)',
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

        <div className="p-5 sm:p-6 relative z-10">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            {/* Left: Order Info */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Order Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                <Package className="h-6 w-6 text-blue-400" />
              </div>
              
              {/* Order Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-black text-lg mb-1 leading-tight">
                  Sipariş #{order.orderId}
                </h3>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Calendar className="h-4 w-4 flex-shrink-0 text-blue-400" />
                  <span>{order.date}</span>
                </div>
              </div>
            </div>

            {/* Right: Status Badge */}
            <motion.div 
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              style={{
                background: statusInfo.bgColor,
                border: `2px solid ${statusInfo.borderColor}`,
                boxShadow: `0 4px 12px ${statusInfo.color}40`,
              }}
            >
              <StatusIcon className="h-4 w-4" style={{ color: statusInfo.color }} />
              <span style={{ color: statusInfo.color }}>{statusInfo.text}</span>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: 'rgba(59, 130, 246, 0.2)' }}></div>

          {/* Bottom Row: Price and Payment */}
          <div className="flex items-center justify-between gap-3">
            {/* Price */}
            <div className="flex-1 min-w-0">
              <div 
                className="rounded-xl p-4 border-2"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '2px solid rgba(59, 130, 246, 0.2)',
                }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Toplam</span>
                  <span className="text-white font-black text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{order.price}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-shrink-0" 
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <CreditCard className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <span className="text-gray-300 text-xs font-semibold whitespace-nowrap">Banka</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">Sipariş Detayı</span>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xs font-bold text-blue-400">Görüntüle</span>
                <Tag className="h-4 w-4 text-blue-400" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrdersPage;
