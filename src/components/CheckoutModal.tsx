import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Banknote,
  Shield,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { checkout } from '../services/api';
import toast from 'react-hot-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: string;
}

const CheckoutModal = ({ isOpen, onClose, totalAmount }: CheckoutModalProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const { setIsCheckoutModalOpen } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    iban: string;
    name: string;
    amount: string;
    description: string;
    orderId: string;
  } | null>(null);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  // Modal açıldığında checkout verilerini al
  useEffect(() => {
    if (isOpen && !checkoutData && !isLoadingCheckout) {
      const fetchCheckoutData = async () => {
        setIsLoadingCheckout(true);
        try {
          const response = await checkout();
          
          if (response.data) {
            // Havale ödemesi kontrolü
            if (response.data.specialText) {
              toast.error(response.data.specialText);
              return;
            }
            
            // Checkout verilerini kaydet - API response'una göre düzelt
            setCheckoutData({
              iban: response.data.iban || '',
              name: response.data.name || '',
              amount: response.data.totalPrice || response.data.amount || response.data.total || response.data.price || totalAmount,
              description: response.data.description || '',
              orderId: response.data.orderId || response.data.id || ''
            });
          } else {
            toast.error('API\'den veri gelmedi');
          }
        } catch (error: any) {
          console.error('Checkout data fetch error:', error);
          
          // Kullanıcıya hata mesajı göster
          const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error || 
                              error.message || 
                              'Ödeme bilgileri yüklenemedi. Lütfen tekrar deneyin.';
          toast.error(errorMessage);
        } finally {
          setIsLoadingCheckout(false);
        }
      };
      
      fetchCheckoutData();
    }
  }, [isOpen, checkoutData, isLoadingCheckout, totalAmount]);

  // Modal kapandığında state'leri temizle
  useEffect(() => {
    if (!isOpen) {
      setCheckoutData(null);
      setIsLoadingCheckout(false);
    }
  }, [isOpen]);

  // Checkout modal state'ini güncelle
  useEffect(() => {
    setIsCheckoutModalOpen(isOpen);
  }, [isOpen, setIsCheckoutModalOpen]);

  // Body scroll'unu engelle (modal açıkken)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyIBAN = async () => {
    const ibanToCopy = checkoutData?.iban;
    if (ibanToCopy) {
      try {
        await navigator.clipboard.writeText(ibanToCopy);
        toast.success('IBAN kopyalandı!');
      } catch (err) {
        toast.error('IBAN kopyalanamadı');
      }
    }
  };



  const handleCopyBankName = async () => {
    const bankNameToCopy = checkoutData?.name;
    if (bankNameToCopy) {
      try {
        await navigator.clipboard.writeText(bankNameToCopy);
        toast.success('Hesap adı kopyalandı!');
      } catch (err) {
        toast.error('Hesap adı kopyalanamadı');
      }
    }
  };

  const handleConfirmPayment = async () => {
    // Checkout verisi yoksa işlemi durdur
    if (!checkoutData) {
      toast.error('Ödeme bilgileri henüz yüklenmedi. Lütfen bekleyin...');
      return;
    }

    setIsProcessing(true);
    try {
      // Sepeti temizle
      await clearCart();
      
      // Başarı toast'u göster
      toast.success('Ödeme başarıyla tamamlandı!');
      
      // Modalı kapat
      onClose();
      
      // Siparişler sayfasına yönlendir
      navigate('/siparislerim');
      
    } catch (error: any) {
      console.error('Checkout error:', error);
      
      // API'den gelen hata mesajını kontrol et
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Ödeme işlemi sırasında hata oluştu';
      
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        {/* Backdrop - Non-clickable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
        />

        {/* Modal - Compact, no scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl rounded-3xl border-2 pointer-events-auto overflow-hidden"
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

          {/* Header - Compact */}
          <div 
            className="relative z-10 p-4 border-b"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderColor: 'rgba(59, 130, 246, 0.2)',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                  border: '1px solid rgba(96, 165, 250, 0.4)',
                }}
              >
                <CreditCard className="h-6 w-6 text-blue-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ödeme Bilgileri
                </h3>
                <div 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg mt-1"
                  style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(96, 165, 250, 0.3)',
                  }}
                >
                  <span className="text-gray-300 text-xs font-semibold">Toplam:</span>
                  <span className="text-white font-black text-sm">
                    {checkoutData?.amount || totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content - Compact, no scroll */}
          <div className="relative z-10 p-4 space-y-3">
            {/* Payment Instructions - Grid Layout */}
            <div 
              className="rounded-xl p-3 border"
              style={{
                background: 'rgba(30, 41, 59, 0.4)',
                border: '1px solid rgba(96, 165, 250, 0.2)',
              }}
            >
              <h4 className="text-white font-bold text-xs mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-300" />
                ÖDEME TALİMATLARI
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <p className="text-gray-300 text-xs leading-tight">Aşağıdaki banka hesabına ödeme yapın</p>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'rgba(234, 179, 8, 0.1)' }}>
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                  <p className="text-yellow-300 text-xs leading-tight font-semibold">ÖNEMLİ: Açıklamaya sipariş no yazın</p>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full flex-shrink-0"></div>
                  <p className="text-gray-300 text-xs leading-tight">"Ödemeyi Yaptım" butonuna basın</p>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                  <p className="text-gray-300 text-xs leading-tight">Siparişiniz otomatik işleme alınacak</p>
                </div>
              </div>
            </div>

            {/* Bank Account - Wide Grid Layout */}
            {isLoadingCheckout ? (
              <div className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-gray-400 text-xs">Yükleniyor...</span>
                </div>
              </div>
            ) : !checkoutData ? (
              <div className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                  <span className="text-red-400 text-xs font-semibold">Veri yüklenemedi</span>
                </div>
              </div>
            ) : (
              <div 
                className="rounded-xl border-2 p-3"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Banknote className="h-4 w-4 text-blue-300" />
                  <h4 className="text-white font-bold text-xs">Banka Hesabı</h4>
                  <CheckCircle className="h-3 w-3 text-green-400 ml-auto" />
                </div>
                
                {/* Grid Layout for Bank Info */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {/* Bank Name */}
                  <div>
                    <label className="text-gray-400 text-xs font-semibold mb-1 block">Hesap Adı</label>
                    <div className="flex items-center gap-2">
                      <div 
                        className="flex-1 p-2.5 rounded-lg border"
                        style={{
                          background: 'rgba(0, 0, 0, 0.5)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                        }}
                      >
                        <p className="text-white font-bold text-xs truncate">
                          {checkoutData.name}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyBankName}
                        className="p-2 rounded-lg transition-all"
                        style={{
                          background: 'rgba(59, 130, 246, 0.2)',
                          border: '1px solid rgba(96, 165, 250, 0.3)',
                        }}
                        title="Kopyala"
                      >
                        <Copy className="h-3.5 w-3.5 text-blue-300" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="text-gray-400 text-xs font-semibold mb-1 block">Ödeme Tutarı</label>
                    <div 
                      className="p-2.5 rounded-lg border h-[42px] flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(236, 72, 153, 0.1))',
                        border: '1px solid rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <span className="text-white text-lg font-black">{checkoutData.amount}</span>
                    </div>
                  </div>
                </div>

                {/* IBAN - Full Width */}
                <div>
                  <label className="text-gray-400 text-xs font-semibold mb-1 block">IBAN</label>
                  <div className="flex items-center gap-2">
                    <div 
                      className="flex-1 p-2.5 rounded-lg border font-mono text-xs"
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      <p className="text-white font-semibold break-all leading-tight">
                        {checkoutData.iban}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopyIBAN}
                      className="p-2 rounded-lg transition-all"
                      style={{
                        background: 'rgba(59, 130, 246, 0.2)',
                        border: '1px solid rgba(96, 165, 250, 0.3)',
                      }}
                      title="Kopyala"
                    >
                      <Copy className="h-3.5 w-3.5 text-blue-300" />
                    </motion.button>
                  </div>
                </div>

                {/* Description - only if exists */}
                {checkoutData.description && (
                  <div 
                    className="mt-3 p-2 rounded-lg border"
                    style={{
                      background: 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                    }}
                  >
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {checkoutData.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            <motion.button
              whileHover={isProcessing || !checkoutData || isLoadingCheckout ? {} : { scale: 1.01, y: -1 }}
              whileTap={isProcessing || !checkoutData || isLoadingCheckout ? {} : { scale: 0.99 }}
              onClick={handleConfirmPayment}
              disabled={isProcessing || !checkoutData || isLoadingCheckout}
              className="group relative w-full font-bold text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                boxShadow: '0 6px 24px rgba(59, 130, 246, 0.4)',
              }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {isProcessing ? (
                <span className="relative z-10 flex items-center gap-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-sm">İşleniyor...</span>
                </span>
              ) : isLoadingCheckout ? (
                <span className="relative z-10 flex items-center gap-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-sm">Yükleniyor...</span>
                </span>
              ) : !checkoutData ? (
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">Veri Yükleniyor</span>
                </span>
              ) : (
                <span className="relative z-10 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-bold">ÖDEMEYİ YAPTIM</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </motion.button>

            {/* Security Info */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <Shield className="h-3 w-3 text-blue-300" />
              <span className="text-gray-400 text-xs">Güvenli ödeme garantisi</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
