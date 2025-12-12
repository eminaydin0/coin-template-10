import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Check, Bell, Sparkles, Zap, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Lütfen email adresinizi girin!', {
        duration: 2000,
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
      
      toast.success('Bültene başarıyla kaydoldunuz!', {
        duration: 3000,
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10">
        {/* Asymmetric Header Design */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start gap-4 mb-3">
            {/* Large Icon with Glow */}
            <motion.div 
              className="relative flex-shrink-0"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                  border: '2px solid rgba(96, 165, 250, 0.4)',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(236, 72, 153, 0.2)',
                }}
              >
                <Bell className="h-8 w-8 text-blue-300 relative z-10" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Text Content - Asymmetric */}
            <div className="flex-1 pt-1">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Özel Fırsatlar
                </span>
                <span className="block text-white/90 text-lg font-bold mt-1">
                  Bültene Katıl
                </span>
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                <p className="text-sm text-gray-300">
                  En yeni oyun haberleri ve özel indirimler
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modern Form Design */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input - Split Design */}
                <div className="relative group">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div 
                    className="relative rounded-2xl border-2 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <div className="flex items-center">
                      <div className="px-4 py-4 flex items-center justify-center border-r-2 border-blue-500/30">
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-posta adresiniz"
                        className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm font-medium"
                        required
                      />
                      <motion.div
                        className="px-2"
                        animate={{
                          scale: email ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {email && (
                          <Zap className="h-4 w-4 text-pink-400" />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Submit Button - Diagonal Design */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden rounded-2xl font-bold text-white py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 12px 40px rgba(59, 130, 246, 0.6)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Diagonal Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 transform rotate-45 translate-x-10 -translate-y-10" />
                  
                  {isLoading ? (
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="text-sm">Gönderiliyor...</span>
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Send className="h-5 w-5" />
                      <span className="text-sm">Hemen Kaydol</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="relative w-20 h-20 mx-auto mb-4"
              >
                <div 
                  className="absolute inset-0 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                    border: '2px solid rgba(96, 165, 250, 0.5)',
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  <Check className="h-10 w-10 text-green-400" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-green-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <h3 className="text-2xl font-black text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Başarılı!
              </h3>
              <p className="text-gray-300 text-sm">
                Bültenimize başarıyla kaydoldunuz. 🎉
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer - Minimal Design */}
        <motion.div 
          className="text-center mt-6 pt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-gray-400">
            <span className="text-gray-300">Spam göndermiyoruz.</span> İstediğiniz zaman{' '}
            <span className="text-blue-400">abonelikten çıkabilirsiniz.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
