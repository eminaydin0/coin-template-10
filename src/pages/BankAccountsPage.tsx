import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard,
  Copy,
  CheckCircle,
  Building2
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const BankAccountsPage = () => {
  const { websiteData, refreshData } = useWebsite();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!websiteData || !websiteData.bankAccounts) {
          refreshData();
        }
      } catch (error) {
        console.error('Bank accounts fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [websiteData, refreshData]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const bankAccounts = websiteData?.bankAccounts || [];

  if (loading) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
          <CommonBackground />
          <LoadingSpinner 
            size="xl" 
            text="BANKA HESAPLARI YÜKLENİYOR..." 
            variant="gaming" 
          />
        </div>
      </>
    );
  }

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
                    <CreditCard className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                      Ödeme Bilgileri
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
                      Banka Hesapları
                    </motion.span>
                  </h1>
                  
                  <motion.p
                    className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Güvenli ödeme için banka hesap bilgilerimiz
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
                          Toplam Hesap
                        </span>
                        <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {bankAccounts.length}
                        </span>
                      </div>
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Building2 className="h-12 w-12 text-blue-400/40" />
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

          {/* Bank Accounts List or Empty State */}
          <section className="relative py-4">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                {bankAccounts.length === 0 ? (
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
                      <CreditCard className="h-16 w-16 text-blue-400/50 mx-auto mb-6" />
                      <h3 className="text-2xl font-black text-white mb-3">
                        Banka hesabı bulunamadı
                      </h3>
                      <p className="text-gray-400 text-base">
                        Yakında yeni banka hesapları eklenecektir.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {bankAccounts.map((account, index) => (
                      <BankAccountCard
                        key={index}
                        account={account}
                        index={index}
                        copiedIndex={copiedIndex}
                        onCopy={copyToClipboard}
                      />
                    ))}
                  </div>
                )}
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

// Bank Account Card Component
interface BankAccount {
  name: string;
  iban: string;
}

interface BankAccountCardProps {
  account: BankAccount;
  index: number;
  copiedIndex: number | null;
  onCopy: (text: string, index: number) => void;
}

const BankAccountCard = ({ account, index, copiedIndex, onCopy }: BankAccountCardProps) => {
  const isCopied = copiedIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="relative rounded-3xl border-2 overflow-hidden transition-all duration-300" 
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

        <div className="p-5 sm:p-6 relative z-10">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            {/* Left: Bank Info */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Bank Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                <Building2 className="h-6 w-6 text-blue-400" />
              </div>
              
              {/* Bank Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-black text-lg mb-1 leading-tight">
                  {account.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  Güvenli banka hesabı ile hızlı ödeme
                </p>
              </div>
            </div>

            {/* Right: Copy Button */}
            <motion.button
              onClick={() => onCopy(account.iban, index)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all"
              style={{
                background: isCopied 
                  ? 'rgba(34, 197, 94, 0.15)' 
                  : 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                border: isCopied ? '2px solid rgba(34, 197, 94, 0.3)' : 'none',
                boxShadow: isCopied ? '0 4px 12px rgba(34, 197, 94, 0.4)' : '0 8px 32px rgba(59, 130, 246, 0.4)',
                color: isCopied ? '#4ade80' : 'white',
              }}
              whileHover={{ scale: isCopied ? 1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {isCopied ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>KOPYALA</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: 'rgba(59, 130, 246, 0.2)' }}></div>

          {/* IBAN Display */}
          <div 
            className="rounded-xl p-4 border-2"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '2px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">IBAN</span>
              <span className="text-white font-mono font-bold text-sm sm:text-base bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {account.iban}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BankAccountsPage;
