import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Clock, ShieldCheck, Sparkles, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

interface CallToActionSectionProps {
  variant?: 'compact' | 'full';
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ variant = 'full' }) => {
  const content = (
    <div className="flex flex-col">
      {/* Header */}
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
                <Headphones className="h-7 w-7 text-blue-300" />
              </div>
            </motion.div>
            <div>
              <h3 className="text-3xl font-black text-white mb-1">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Hâlâ Sorularınız mı Var?
                </span>
              </h3>
              <p className="text-sm text-gray-400">7/24 uzman ekibimiz yanınızda</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="relative rounded-2xl border-2 overflow-hidden p-4"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
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
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                border: '2px solid rgba(96, 165, 250, 0.4)',
              }}
            >
              <ShieldCheck className="h-5 w-5 text-blue-300" />
            </div>
            <p className="text-sm font-bold text-white">Güvenli Ödeme</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="relative rounded-2xl border-2 overflow-hidden p-4"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
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
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                border: '2px solid rgba(96, 165, 250, 0.4)',
              }}
            >
              <Sparkles className="h-5 w-5 text-blue-300" />
            </div>
            <p className="text-sm font-bold text-white">Hızlı Teslimat</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ y: -4 }}
          className="relative rounded-2xl border-2 overflow-hidden p-4"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
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
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                border: '2px solid rgba(96, 165, 250, 0.4)',
              }}
            >
              <Clock className="h-5 w-5 text-blue-300" />
            </div>
            <p className="text-sm font-bold text-white">7/24 Destek</p>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/canli-destek" aria-label="Canlı Destek sayfasına git" className="group">
          <motion.button
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.6)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <MessageCircle className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Canlı Destek</span>
          </motion.button>
        </Link>

        <Link to="/iletisim" aria-label="İletişim sayfasına git" className="group">
          <motion.button
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm border-2 transition-all"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(96, 165, 250, 0.4)',
              backdropFilter: 'blur(12px)',
            }}
            whileHover={{ 
              scale: 1.02,
              background: 'rgba(30, 41, 59, 0.8)',
              border: '2px solid rgba(96, 165, 250, 0.6)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Clock className="h-5 w-5" />
            <span>İletişim</span>
          </motion.button>
        </Link>
      </div>
    </div>
  );

  // Ana sayfada compact variant kullanılıyorsa, sadece içeriği döndür
  if (variant === 'compact') {
    return content;
  }

  // Diğer sayfalarda full variant için container ve max-width ekle
  return (
    <section className="relative py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl"
          >
            {content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
