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
      <div className="relative z-10">
        {/* Split Layout: Header Left, Form Right */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:flex-row items-center gap-8"
            >
              {/* Left: Header */}
              <motion.div 
                className="lg:w-1/3 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="relative flex-shrink-0"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring" }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                        border: '2px solid rgba(96, 165, 250, 0.4)',
                        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      <Bell className="h-6 w-6 text-blue-300" />
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-0.5">
                      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Bültene Katıl
                      </span>
                    </h3>
                    <p className="text-xs text-gray-400">Özel fırsatlar ve haberler</p>
                  </div>
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                className="lg:w-2/3 w-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Email Input */}
                    <div className="flex-1">
                      <div 
                        className="relative rounded-lg border-2 overflow-hidden h-12"
                        style={{
                          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                          border: '2px solid rgba(59, 130, 246, 0.3)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
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
                        
                        <div className="flex items-center relative z-10 h-full">
                          <div 
                            className="px-3 h-full flex items-center justify-center border-r-2"
                            style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
                          >
                            <Mail className="h-4 w-4 text-blue-400" />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-posta adresiniz"
                            className="flex-1 px-3 h-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm font-medium"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="group relative overflow-hidden rounded-lg font-bold text-white h-12 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 6px 24px rgba(59, 130, 246, 0.6)',
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
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 transform rotate-45 translate-x-8 -translate-y-8" />
                      
                      {isLoading ? (
                        <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-sm">Gönderiliyor...</span>
                        </span>
                      ) : (
                        <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                          <Send className="h-4 w-4" />
                          <span className="text-sm">Kaydol</span>
                        </span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center py-12 max-w-2xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="relative w-24 h-24 mx-auto mb-6"
              >
                <div 
                  className="absolute inset-0 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                    border: '2px solid rgba(96, 165, 250, 0.5)',
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  <Check className="h-12 w-12 text-green-400" />
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
              <h3 className="text-3xl font-black text-white mb-3 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Başarılı!
              </h3>
              <p className="text-gray-300 text-base">
                Bültenimize başarıyla kaydoldunuz. 🎉
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8 pt-6 border-t"
          style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-400">
            <span className="text-gray-300 font-medium">Spam göndermiyoruz.</span> İstediğiniz zaman{' '}
            <span className="text-blue-400 font-medium">abonelikten çıkabilirsiniz.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
