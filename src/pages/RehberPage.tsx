import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  ShoppingCart, 
  Download, 
  CheckCircle, 
  Gamepad2,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const RehberPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Hesap Oluştur",
      description: "İlk olarak sitemize üye olun veya mevcut hesabınızla giriş yapın.",
      icon: CheckCircle,
      details: [
        "Sağ üst köşedeki 'Kayıt Ol' butonuna tıklayın",
        "Gerekli bilgileri doldurun",
        "E-posta doğrulaması yapın",
        "Hesabınız aktif hale gelir"
      ]
    },
    {
      id: 2,
      title: "Oyun Kategorisini Seç",
      description: "Aradığınız oyunu kategoriler arasından bulun.",
      icon: Gamepad2,
      details: [
        "Ana menüden 'Oyunlar' sekmesine tıklayın",
        "İstediğiniz oyun kategorisini seçin",
        "Oyun listesini inceleyin",
        "Fiyat ve özelliklerini karşılaştırın"
      ]
    },
    {
      id: 3,
      title: "Ürünü Sepete Ekle",
      description: "Beğendiğiniz ürünü sepetinize ekleyin.",
      icon: ShoppingCart,
      details: [
        "Ürün detay sayfasında özellikleri inceleyin",
        "'Sepete Ekle' butonuna tıklayın",
        "Miktar seçimi yapın",
        "Sepetinizi kontrol edin"
      ]
    },
    {
      id: 4,
      title: "Ödeme Yap",
      description: "Güvenli ödeme yöntemleriyle siparişinizi tamamlayın.",
      icon: CreditCard,
      details: [
        "Sepet sayfasından 'Ödemeye Geç' butonuna tıklayın",
        "Ödeme bilgilerinizi girin",
        "Banka transferi veya EFT ile ödeme yapın",
        "Ödeme onayını bekleyin"
      ]
    },
    {
      id: 5,
      title: "Kodunuzu Alın",
      description: "Ödeme onaylandıktan sonra oyun kodunuz teslim edilir.",
      icon: Download,
      details: [
        "Ödeme onaylandıktan sonra",
        "E-posta adresinize kod gönderilir",
        "Hesabınızdan siparişlerinizi takip edin",
        "Anında teslimat garantisi"
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CommonBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <LoadingSpinner 
            size="xl" 
            text="Rehber Yükleniyor..." 
            variant="gaming" 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
      <SEOHead />
      
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
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                    Kullanım Rehberi
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
                    Rehber
                  </motion.span>
                </h1>
                
                <motion.p
                  className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Sipariş verme sürecini 5 kolay adımda öğrenin ve hemen alışverişe başlayın
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
                        Toplam Adım
                      </span>
                      <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        5
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <CheckCircle className="h-12 w-12 text-blue-400/40" />
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

        {/* Steps Section */}
        <section className="relative py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {steps.map((step) => (
                  <StepCard key={step.id} step={step} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection />
      </div>
    </div>
  );
};

// Step Card Component
interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
}

interface StepCardProps {
  step: Step;
}

const StepCard = ({ step }: StepCardProps) => {
  const Icon = step.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: step.id * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="relative rounded-3xl border-2 overflow-hidden transition-all duration-300 h-full flex flex-col"
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

        <div className="p-5 sm:p-6 flex-1 flex flex-col relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            {/* Step Number Badge */}
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
              }}
            >
              {step.id}
            </div>
            
            {/* Icon */}
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <Icon className="h-5 w-5 text-blue-400" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col space-y-3">
            {/* Title & Description */}
            <div>
              <h3 className="text-white font-black text-lg mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Details List */}
            <div className="space-y-2 flex-1">
              {step.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="mt-auto pt-3 border-t" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              <motion.div
                className="flex items-center justify-between"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xs font-medium text-gray-400">Adım {step.id}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-400">Detay</span>
                  <ArrowRight className="h-4 w-4 text-blue-400" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RehberPage;

