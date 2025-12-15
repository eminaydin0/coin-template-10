import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Trash2, 
  CreditCard,
  Shield,
  Gamepad2,
  Plus,
  Minus,
  Package,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';
import CheckoutModal from '../components/CheckoutModal';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const CartPage = () => {
  const { cart, loading, removeItem, clearCart, updateItemQuantity, getTotal: getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Component mount kontrolü
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const parsePrice = (priceString: string): number => {
    if (!priceString) return 0;
    
    // Önce ₺ işaretini ve boşlukları kaldır
    let cleanPrice = priceString.replace('₺', '').replace(/\s/g, '');
    
    // Binlik ayırıcı noktaları kaldır (örn: 1.325,00 -> 1325,00)
    cleanPrice = cleanPrice.replace(/\./g, '');
    
    // Virgülü noktaya çevir (1325,00 -> 1325.00)
    cleanPrice = cleanPrice.replace(',', '.');
    
    const parsed = parseFloat(cleanPrice);
    return isNaN(parsed) ? 0 : parsed;
  };

  // API'den gelen fiyatın birim fiyat mı toplam fiyat mı olduğunu kontrol et
  // Eğer API toplam fiyat döndürüyorsa, birim fiyatı hesapla
  // Eğer API birim fiyat döndürüyorsa, doğrudan kullan
  // API'den gelen fiyatın birim fiyat mı toplam fiyat mı olduğunu tespit et
  const getUnitPrice = (price: string, quantity: number): number => {
    const parsedPrice = parsePrice(price);
    
    // Eğer quantity 1'den büyükse ve fiyat quantity ile çarpıldığında makul bir değer çıkıyorsa
    // bu muhtemelen toplam fiyattır
    if (quantity > 1) {
      // Fiyatın makul bir birim fiyat olup olmadığını kontrol et
      // Örnek: 1700 ÷ 2 = 850 (makul birim fiyat)
      const potentialUnitPrice = parsedPrice / quantity;
      if (potentialUnitPrice >= 50 && potentialUnitPrice <= 5000) {
        console.log(`getUnitPrice - Toplam fiyat tespit edildi: ${parsedPrice} ÷ ${quantity} = ${potentialUnitPrice}`);
        return potentialUnitPrice;
      }
    }
    
    console.log(`getUnitPrice - Birim fiyat olarak kabul edildi: ${parsedPrice}`);
    return parsedPrice;
  };

  // Toplam fiyatı hesapla (birim fiyat × miktar)
  const calculateItemTotal = (price: string, quantity: number): string => {
    const unitPrice = getUnitPrice(price, quantity);
    const total = unitPrice * quantity;
    console.log(`calculateItemTotal - Birim: ${unitPrice}, Quantity: ${quantity}, Total: ${total}`);
    return `₺${total.toFixed(2).replace('.', ',')}`;
  };

  const formatUnitPrice = (price: string, quantity: number): string => {
    const unitPrice = getUnitPrice(price, quantity);
    return `₺${unitPrice.toFixed(2).replace('.', ',')}`;
  };

  const getTotalQuantity = (): number => {
    return cart.reduce((total, item) => total + item.piece, 0);
  };

  // CartContext'teki getTotal fonksiyonunu kullan
  const getTotal = (): string => {
    return getCartTotal();
  };

  const handleRemoveItem = async (basketId: string) => {
    setUpdatingItem(basketId);
    await removeItem(basketId);
    setUpdatingItem(null);
  };

  const handleClearCart = async () => {
    setShowClearModal(true);
  };

  const handleConfirmClearCart = async () => {
    await clearCart();
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/giris-yap');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleQuantityUpdate = async (basketId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdatingItem(basketId);
    await updateItemQuantity(basketId, newQuantity);
    setUpdatingItem(null);
  };

  // Component mount olana kadar bekle
  if (!isMounted) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen relative overflow-hidden">
          <CommonBackground />
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <LoadingSpinner 
              size="xl" 
              text="YÜKLENİYOR..." 
              variant="gaming" 
            />
          </div>
        </div>
      </>
    );
  }

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
                      <ShoppingCart className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Alışveriş
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
                        Sepetim
                      </motion.span>
                    </h1>
                    
                    <motion.p
                      className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Alışveriş sepetinizdeki ürünleri görüntüleyin ve ödemeye geçin
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
                            Toplam Ürün
                          </span>
                          <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {cart.length}
                          </span>
                        </div>
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Package className="h-12 w-12 text-blue-400/40" />
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

            {/* Not Authenticated Message */}
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
                        Sepeti görüntülemek için giriş yapın
                      </h3>
                      <p className="text-gray-400 text-base mb-8">Hesabınıza giriş yaparak sepetinizi yönetebilirsiniz.</p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link 
                          to="/giris-yap" 
                          className="inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-xl transition-all relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                          }}
                        >
                          <span>GİRİŞ YAP</span>
                        </Link>
                        
                        <Link 
                          to="/kayit-ol" 
                          className="inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-xl transition-all"
                          style={{
                            background: 'rgba(59, 130, 246, 0.15)',
                            border: '2px solid rgba(59, 130, 246, 0.3)',
                          }}
                        >
                          <span>KAYIT OL</span>
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
        <div className="min-h-screen relative overflow-hidden">
          <CommonBackground />
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <LoadingSpinner 
              size="xl" 
              text="SEPET YÜKLENİYOR..." 
              variant="gaming" 
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead />
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
                      <ShoppingCart className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Alışveriş
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
                        Sepetim
                      </motion.span>
                    </h1>
                    
                    <motion.p
                      className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Alışveriş sepetinizdeki ürünleri görüntüleyin ve ödemeye geçin
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
                            Toplam Ürün
                          </span>
                          <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {cart.length}
                          </span>
                        </div>
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Package className="h-12 w-12 text-blue-400/40" />
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

          {cart.length === 0 ? (
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
                        Sepetiniz boş
                      </h3>
                      <p className="text-gray-400 text-base mb-8">
                        Sepetinizde henüz ürün bulunmuyor. Hemen alışverişe başlayın!
                      </p>
                      
                      <Link to="/oyunlar">
                        <motion.div
                          className="inline-flex items-center gap-3 font-bold text-white py-4 px-8 rounded-xl transition-all duration-300 relative overflow-hidden"
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
                          <ShoppingCart className="h-5 w-5 relative z-10" />
                          <span className="relative z-10">ALIŞVERİŞE BAŞLA</span>
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          ) : (
            <section className="relative py-8">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
              {/* Flex Layout for Cart Items and Order Summary */}
              <div className="flex flex-col xl:flex-row gap-6 relative z-10">
                {/* Cart Items - Left Side */}
                <div className="flex-1 space-y-4">
                  {/* Cart Items Header - Compact */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="group"
                  >
                    {/* Cart Header Card */}
                    <motion.div
                      className="relative rounded-3xl border-2 p-5 transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                        border: '2px solid rgba(59, 130, 246, 0.3)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                        backdropFilter: 'blur(20px)',
                      }}
                      whileHover={{ y: -2 }}
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
                      {/* Cart Header */}
                      <div className="flex items-center justify-between gap-4 relative z-10">
                          {/* Left: Icon & Info */}
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{
                                background: 'rgba(139, 92, 246, 0.2)',
                                border: '1px solid rgba(168, 85, 247, 0.3)',
                              }}
                            >
                              <ShoppingCart className="h-5 w-5 text-purple-300" />
                            </div>
                            
                            <div>
                              <h3 className="text-white font-bold text-base">
                                Sepet Ürünleri
                              </h3>
                              <p className="text-gray-400 text-xs">
                                {cart.length} ürün sepetinizde
                              </p>
                            </div>
                          </div>

                        {/* Clear Cart Button */}
                          <motion.button
                            onClick={handleClearCart}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all duration-300"
                            style={{
                              background: 'rgba(239, 68, 68, 0.2)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                            }}
                            whileHover={{ scale: 1.05, background: 'rgba(239, 68, 68, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                          >
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                          <span className="text-red-400 font-semibold text-xs">
                                TÜMÜNÜ SİL
                              </span>
                          </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="group"
                      >
                        {/* Cart Item Card - Compact */}
                        <motion.div
                          className="relative rounded-3xl border-2 p-5 transition-all duration-300"
                          style={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                            border: '2px solid rgba(59, 130, 246, 0.3)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                            backdropFilter: 'blur(20px)',
                          }}
                          whileHover={{ 
                            y: -4,
                            border: '2px solid rgba(59, 130, 246, 0.5)',
                            boxShadow: '0 30px 80px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.2)',
                          }}
                        >
                          {/* Diagonal Accent */}
                          <div 
                            className="absolute top-0 right-0 w-24 h-24 opacity-20"
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
                          <div className="flex items-center gap-3 relative z-10">
                            {/* Product Image */}
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <div className="relative w-full h-full overflow-hidden rounded-lg border" style={{ borderColor: 'rgba(75, 85, 99, 0.3)' }}>
                                {item.url ? (
                                  <img 
                                    src={item.url} 
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.currentTarget as HTMLElement;
                                      target.style.display = 'none';
                                      const fallback = target.nextElementSibling as HTMLElement;
                                      if (fallback) fallback.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center" style={{ display: item.url ? 'none' : 'flex' }}>
                                  <Gamepad2 className="h-8 w-8 text-purple-300/50" />
                                </div>
                              </div>
                            </div>
                            
                            {/* Product Info & Price */}
                            <div className="flex-1 flex items-center justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold text-sm line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors mb-1">
                                  {item.name}
                                </h3>
                                <p className="text-gray-400 text-xs">
                                  {formatUnitPrice(item.price, item.piece)} × {item.piece}
                                </p>
                              </div>

                              {/* Total Price */}
                              <div className="flex-shrink-0 text-right">
                                <p className="text-lg font-black text-white">{calculateItemTotal(item.price, item.piece)}</p>
                              </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {/* Quantity Controls */}
                              <div className="flex items-center rounded-lg border" style={{ background: 'rgba(0, 0, 0, 0.5)', borderColor: 'rgba(75, 85, 99, 0.3)' }}>
                                <motion.button
                                  onClick={() => handleQuantityUpdate(item.basketId, item.piece - 1)}
                                  disabled={updatingItem === item.basketId || item.piece <= 1}
                                  className="w-7 h-7 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                                  style={{
                                    background: 'rgba(139, 92, 246, 0.2)',
                                    border: 'none',
                                  }}
                                  whileHover={{ background: 'rgba(139, 92, 246, 0.3)' }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus className="h-3.5 w-3.5 text-purple-300" />
                                </motion.button>
                                <span className="w-8 text-center text-white font-bold text-xs px-1">
                                  {updatingItem === item.basketId ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-300 mx-auto"></div>
                                  ) : (
                                    item.piece
                                  )}
                                </span>
                                <motion.button
                                  onClick={() => handleQuantityUpdate(item.basketId, item.piece + 1)}
                                  disabled={updatingItem === item.basketId}
                                  className="w-7 h-7 rounded-r-lg disabled:opacity-50 transition-all duration-300 flex items-center justify-center"
                                  style={{
                                    background: 'rgba(139, 92, 246, 0.2)',
                                    border: 'none',
                                  }}
                                  whileHover={{ background: 'rgba(139, 92, 246, 0.3)' }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus className="h-3.5 w-3.5 text-purple-300" />
                                </motion.button>
                              </div>
                              
                              {/* Remove Button */}
                              <motion.button
                                onClick={() => handleRemoveItem(item.basketId)}
                                disabled={updatingItem === item.basketId}
                                className="w-8 h-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                                style={{
                                  background: 'rgba(239, 68, 68, 0.2)',
                                  border: '1px solid rgba(239, 68, 68, 0.3)',
                                }}
                                whileHover={{ scale: 1.1, background: 'rgba(239, 68, 68, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {updatingItem === item.basketId ? (
                                  <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Trash2 className="h-4 w-4 text-red-400" />
                                )}
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Order Summary - Right Side - Sticky */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="w-full xl:w-80 xl:sticky xl:top-24 xl:self-start"
                >
                  {/* Order Summary Card - Elegant Design */}
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
                    {/* Header with Gradient */}
                    <div 
                      className="p-5 border-b relative z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.05))',
                        borderColor: 'rgba(59, 130, 246, 0.2)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'rgba(139, 92, 246, 0.25)',
                            border: '1px solid rgba(168, 85, 247, 0.4)',
                          }}
                        >
                          <Package className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">Sipariş Özeti</h3>
                          <p className="text-purple-300/80 text-xs mt-0.5">{cart.length} ürün • {getTotalQuantity()} adet</p>
                        </div>
                      </div>
                    </div>

                    {/* Summary Details */}
                    <div className="p-5 space-y-4 relative z-10">
                      {/* Summary Items */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Ara Toplam</span>
                          <span className="text-white font-semibold">{getTotal()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">İndirim</span>
                          <span className="text-red-400 font-semibold">₺0,00</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px" style={{ background: 'rgba(75, 85, 99, 0.3)' }}></div>

                      {/* Total */}
                      <div 
                        className="rounded-lg p-4"
                        style={{
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(168, 85, 247, 0.2)',
                        }}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-purple-300 font-bold text-sm">Genel Toplam</span>
                          <span className="text-2xl font-black text-white">{getTotal()}</span>
                        </div>
                        <p className="text-gray-400 text-xs text-right">KDV Dahil</p>
                      </div>

                      {/* Checkout Button */}
                      <motion.button
                        onClick={handleCheckout}
                        className="w-full font-bold text-white py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <CreditCard className="h-4 w-4 relative z-10" />
                        <span className="text-sm relative z-10">ÖDEMEYE GEÇ</span>
                        <ChevronRight className="h-4 w-4 relative z-10" />
                      </motion.button>
                    </div>

                    {/* Features Footer */}
                    <div 
                      className="p-4 border-t space-y-2 relative z-10"
                      style={{
                        background: 'rgba(59, 130, 246, 0.05)',
                        borderColor: 'rgba(59, 130, 246, 0.15)',
                      }}
                    >
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Shield className="h-4 w-4 text-purple-300 flex-shrink-0" />
                        <span>Güvenli Ödeme</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Package className="h-4 w-4 text-purple-300 flex-shrink-0" />
                        <span>Anında Teslimat</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                </div>
                </div>
              </div>
            </section>
          )}

          {/* Call to Action Section */}
          <CallToActionSection />
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleConfirmClearCart}
        title="Sepeti Temizle"
        message="Sepetinizdeki tüm ürünleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        confirmText="Sepeti Temizle"
        cancelText="İptal"
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        totalAmount={getTotal()}
      />
    </>
  );
};

export default CartPage;