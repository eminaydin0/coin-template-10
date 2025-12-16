import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  Users, 
  ShoppingCart, 
  Truck
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import { getContractDetail } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const ContractPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { websiteData, loading } = useWebsite();
  const [contractDetail, setContractDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(true);

  const contract = websiteData?.contracts?.find(c => c.slug === slug);

  useEffect(() => {
    const fetchContractDetail = async () => {
      if (!slug) return;
      
      try {
        setDetailLoading(true);
        const response = await getContractDetail(slug);
        setContractDetail(response.data);
      } catch (error) {
        console.error('Error fetching contract detail:', error);
      } finally {
        setDetailLoading(false);
      }
    };

    fetchContractDetail();
  }, [slug]);

  const getContractIcon = (contractName: string) => {
    if (contractName.includes('Gizlilik')) {
      return Shield;
    } else if (contractName.includes('Satış')) {
      return ShoppingCart;
    } else if (contractName.includes('Teslimat')) {
      return Truck;
    } else if (contractName.includes('Üyelik')) {
      return Users;
    } else {
      return FileText;
    }
  };

  if (loading || detailLoading) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
          <CommonBackground />
          <LoadingSpinner 
            size="xl" 
            text="SÖZLEŞME YÜKLENİYOR..." 
            variant="gaming" 
          />
        </div>
      </>
    );
  }

  if (!contract) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
          <CommonBackground />
          
          <div className="w-full relative z-10">
            {/* Hero Section */}
            <div className="w-full mb-8 px-4 sm:px-6 lg:px-8 pt-8 pb-6 relative">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
                  style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
                  animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="max-w-7xl mx-auto relative">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Sözleşme</span>
                  </motion.div>

                  <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none mb-4">
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Bulunamadı
                    </span>
                  </h1>
                </motion.div>

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
                    <div 
                      className="absolute top-0 right-0 w-64 h-64 opacity-20"
                      style={{
                        background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                      }}
                    />

                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)' }}
                      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <div className="relative z-10">
                      <FileText className="h-16 w-16 text-blue-400/50 mx-auto mb-6" />
                      <h3 className="text-2xl font-black text-white mb-3">
                        Sözleşme bulunamadı
                      </h3>
                      <p className="text-gray-400 text-base mb-8">
                        Aradığınız sözleşme mevcut değil.
                      </p>
                      
                      <Link to="/">
                        <motion.button
                          className="font-bold text-white py-3 px-6 rounded-xl transition-all duration-300 relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="relative z-10">ANA SAYFAYA DÖN</span>
                        </motion.button>
                      </Link>
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

  const IconComponent = getContractIcon(contract.name);

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
                    <IconComponent className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                      Yasal Sözleşme
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
                      {contract.name}
                    </motion.span>
                  </h1>
                  
                  <motion.p
                    className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Yasal sözleşme detayları ve kullanım koşulları
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
                          Durum
                        </span>
                        <span className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          Geçerli
                        </span>
                      </div>
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Shield className="h-12 w-12 text-blue-400/40" />
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

          {/* Contract Content Section */}
          <section className="relative py-4">
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
                    {/* Contract Header */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                      <div 
                        className="w-14 h-14 flex items-center justify-center rounded-xl flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                        }}
                      >
                        <IconComponent className="h-7 w-7 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                          {contractDetail?.name || contract.name}
                        </h2>
                        <p className="text-gray-400 text-sm">Yasal sözleşme detayları</p>
                      </div>
                    </div>
                  
                    {/* Contract Text Content */}
                    {contractDetail?.text ? (
                      <div 
                        className="space-y-6 text-gray-300 prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-strong:text-white prose-code:text-blue-400 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-blue-400/20"
                        dangerouslySetInnerHTML={{ __html: contractDetail.text }}
                        style={{
                          '--tw-prose-body': '#d1d5db',
                          '--tw-prose-headings': '#ffffff',
                          '--tw-prose-links': '#60a5fa',
                          '--tw-prose-bold': '#ffffff',
                          '--tw-prose-counters': '#9ca3af',
                          '--tw-prose-bullets': '#60a5fa',
                          '--tw-prose-hr': '#4b5563',
                          '--tw-prose-quotes': '#f3f4f6',
                          '--tw-prose-quote-borders': '#60a5fa',
                          '--tw-prose-captions': '#9ca3af',
                          '--tw-prose-code': '#60a5fa',
                          '--tw-prose-pre-code': '#d1d5db',
                          '--tw-prose-pre-bg': '#111827',
                          '--tw-prose-th-borders': '#4b5563',
                          '--tw-prose-td-borders': '#4b5563'
                        } as React.CSSProperties}
                      />
                    ) : (
                      <div className="space-y-4 text-gray-400">
                        <p>Sözleşme yüklenemedi.</p>
                      </div>
                    )}
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

export default ContractPage;
