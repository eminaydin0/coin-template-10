import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Headphones
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);
  const { getInfoValue } = useWebsite();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const contactPhone = getInfoValue('CONTACT_PHONE');
  const contactEmail = getInfoValue('CONTACT_EMAIL');
  const contactAddress = getInfoValue('CONTACT_ADDRESS');

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CommonBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <LoadingSpinner 
            size="xl" 
            text="İletişim Yükleniyor..." 
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
                  <Headphones className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                    Destek Merkezi
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
                    İletişim & Destek
                  </motion.span>
                </h1>
                
                <motion.p
                  className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  7/24 müşteri desteği ile yanınızdayız. Sorularınız için bize ulaşın
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
                        7/24 Destek
                      </span>
                      <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        24/7
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Headphones className="h-12 w-12 text-blue-400/40" />
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

        {/* Contact Information Section */}
        <section className="relative py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {(!contactPhone && !contactEmail && !contactAddress) ? (
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
                    <Headphones className="h-16 w-16 text-blue-400/50 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-white mb-3">
                      İletişim bilgileri bulunamadı
                    </h3>
                    <p className="text-gray-400">Yakında iletişim bilgileri eklenecektir.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contactPhone && (
                <ContactCard
                  icon={Phone}
                  title="Telefon Desteği"
                  description="7/24 müşteri hizmetleri ile yanınızdayız"
                  contact={contactPhone}
                  contactLabel="Arama Yapın"
                  badgeText="TELEFON"
                  features={[
                    'Anında yanıt garantisi',
                    'Profesyonel destek ekibi',
                    'Türkçe müşteri hizmetleri'
                  ]}
                  buttonText="Hemen Ara"
                  buttonIcon={Phone}
                />
              )}

              {contactEmail && (
                <ContactCard
                  icon={Mail}
                  title="E-posta Desteği"
                  description="24 saat içinde detaylı yanıt alın"
                  contact={contactEmail}
                  contactLabel="E-posta Gönderin"
                  badgeText="E-POSTA"
                  features={[
                    'Detaylı yanıt garantisi',
                    'Teknik destek ekibi',
                    'Dosya ekleme imkanı'
                  ]}
                  buttonText="E-posta Gönder"
                  buttonIcon={Mail}
                />
              )}

              {contactAddress && (
                <ContactCard
                  icon={MapPin}
                  title="Ofis Adresi"
                  description="Merkez ofisimiz ve operasyon merkezi"
                  contact={contactAddress}
                  contactLabel="Ziyaret Edin"
                  badgeText="OFİS"
                  features={[
                    'Profesyonel ekip merkezi',
                    'Güvenli ve modern ofis',
                    'Kolay ulaşım imkanı'
                  ]}
                  buttonText="Konumu Gör"
                  buttonIcon={MapPin}
                />
              )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection />
      </div>
    </div>
  );
};

// Contact Card Component
interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: string;
  contactLabel: string;
  badgeText: string;
  features: string[];
  buttonText: string;
  buttonIcon: LucideIcon;
}

const ContactCard = ({
  icon: Icon,
  title,
  description,
  contact,
  contactLabel,
  badgeText,
  features,
  buttonText,
  buttonIcon: ButtonIcon
}: ContactCardProps) => {
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
          <div className="flex items-center justify-between gap-3 mb-4">
            {/* Icon */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <Icon className="h-6 w-6 text-blue-400" />
            </div>
            
            {/* Badge */}
            <motion.div 
              className="px-3 py-1.5 rounded-xl text-xs font-bold flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
              }}
            >
              {badgeText}
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col space-y-3">
            {/* Title & Description */}
            <div>
              <h3 className="text-white font-black text-lg mb-2 leading-tight">
                {title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Contact Info */}
            <div 
              className="rounded-xl p-4 border-2"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">{contactLabel}</p>
              <p className="text-white font-black text-base break-all leading-relaxed">{contact}</p>
            </div>

            {/* Features */}
            <div className="space-y-2 flex-1">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
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
                <span className="text-xs font-medium text-gray-400">{buttonText}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-400">İletişim</span>
                  <ButtonIcon className="h-4 w-4 text-blue-400" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;
