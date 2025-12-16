import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Package, 
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import SEOHead from '../components/SEOHead';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const ReturnsPage = () => {
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
              {/* Epic Title Section */}
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
                    <RotateCcw className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                      İade İşlemleri
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
                      Geri İade
                    </motion.span>
                  </h1>
                  
                  <motion.p
                    className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Kolay ve hızlı iade süreci ile memnuniyetiniz bizim için önemli
                  </motion.p>
                </motion.div>

                {/* Premium Stats Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
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
                          İade Süresi
                        </span>
                        <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          24 Saat
                        </span>
                      </div>
                      <motion.div
                        animate={{
                          rotate: [0, -360],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <RotateCcw className="h-12 w-12 text-blue-400/40" />
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

          {/* Features Section */}
          <section className="relative py-4">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Clock,
                      title: "24 Saat İade",
                      description: "Satın alma tarihinden itibaren 24 saat içinde iade talebinde bulunabilirsiniz",
                      features: ["24 saat süre", "Koşulsuz iade hakkı"],
                    },
                    {
                      icon: Package,
                      title: "Anında Geri Ödeme",
                      description: "İade talebiniz onaylandıktan sonra anında geri ödeme yapılır",
                      features: ["Anında işlem", "Güvenli ödeme"],
                    },
                    {
                      icon: CheckCircle,
                      title: "Otomatik İşlem",
                      description: "İade talebiniz otomatik olarak işleme alınır ve hızlıca sonuçlandırılır",
                      features: ["Otomatik onay", "Hızlı işlem"],
                    }
                  ].map((feature, index) => (
                    <ReturnFeatureCard key={index} feature={feature} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="relative py-8">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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

                  <div className="p-6 sm:p-8 relative z-10">
                    <ContactForm
                      title="Geri İade"
                      description="Satın aldığınız oyun içi ürünler için geri iade talebinizi gönderin. En kısa sürede size dönüş yapacağız."
                      method="Geri İade"
                      backLink="/"
                      backText="Ana sayfaya dön"
                    />
                  </div>
                </motion.div>
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

// Return Feature Card Component
interface ReturnFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}

const ReturnFeatureCard = ({ feature, index }: { feature: ReturnFeature; index: number }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="relative rounded-3xl border-2 overflow-hidden transition-all duration-300 h-full"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
          border: '2px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(20px)',
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

        <div className="p-5 sm:p-6 relative z-10">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <Icon className="h-6 w-6 text-blue-400" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-black text-lg mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: 'rgba(59, 130, 246, 0.2)' }}></div>

          {/* Features List */}
          <div className="space-y-2">
            {feature.features.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                }}
              >
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReturnsPage;