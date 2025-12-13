import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Gamepad2, 
  ShoppingCart, 
  CreditCard, 
  Download,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const steps = [
    { 
      id: 1, 
      title: "Hesap Oluştur", 
      icon: CheckCircle
    },
    { 
      id: 2, 
      title: "Oyun Seç", 
      icon: Gamepad2
    },
    { 
      id: 3, 
      title: "Sepete Ekle", 
      icon: ShoppingCart
    },
    { 
      id: 4, 
      title: "Ödeme Yap", 
      icon: CreditCard
    },
    { 
      id: 5, 
      title: "Kodunu Al", 
      icon: Download
    }
  ];

  return (
    <section className="relative w-full">
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
                  <Sparkles className="h-7 w-7 text-blue-300" />
                </div>
              </motion.div>
              <div>
                <h3 className="text-3xl font-black text-white mb-1">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Nasıl Çalışır?
                  </span>
                </h3>
                <p className="text-sm text-gray-400">5 kolay adımda oyunlarınızı alın</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <StepCard step={step} index={index} totalSteps={steps.length} />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Link
            to="/rehber"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Detaylı Rehber</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const StepCard = ({ step, index, totalSteps }: { step: { id: number; title: string; icon: any }; index: number; totalSteps: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative rounded-2xl border-2 overflow-hidden transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        boxShadow: isHovered
          ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.3)'
          : '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
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

      {/* Diagonal Accent */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-20"
        style={{
          background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
        {/* Step Number */}
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-4"
          style={{
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
          }}
        >
          {step.id}
        </div>
        
        {/* Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
            border: '2px solid rgba(96, 165, 250, 0.3)',
          }}
        >
          <step.icon className="h-7 w-7 text-blue-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-white font-bold text-base">
          {step.title}
        </h3>

        {/* Connection Arrow */}
        {step.id < totalSteps && (
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block">
            <ArrowRight className="h-6 w-6 text-blue-400 opacity-50" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HowItWorksSection;
