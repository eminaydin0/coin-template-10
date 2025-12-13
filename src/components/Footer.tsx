import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { motion } from 'framer-motion';
import { Gamepad2, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { websiteData, getInfoValue } = useWebsite();

  return (
    <footer className="relative py-12 mt-16 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border overflow-hidden backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
            }}
          >
            <div className="p-8 sm:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                
                {/* Column 1 - Brand Info */}
                <motion.div 
                  className="space-y-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <Gamepad2 className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {getInfoValue('TITLE')}
                        </span>
                      </h2>
                    </div>
                    <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                  </div>
                  
                  <div className="space-y-3">
                    
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <span>© {new Date().getFullYear()}</span>
                      <span>•</span>
                      <span>Tüm hakları saklıdır</span>
                    </div>
                   
                    <a 
                      href="https://maxiipins.com/" 
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Designed by Maxiipins</span>
                      <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>

                {/* Column 2 - Sözleşmeler */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-pink-500" />
                    <span className="bg-gradient-to-r from-blue-300 to-pink-300 bg-clip-text text-transparent">
                      Sözleşmeler
                    </span>
                  </h3>
                  <ul className="space-y-2.5">
                    {websiteData?.contracts?.map((contract, index) => (
                      <motion.li 
                        key={contract.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      >
                        <Link
                          to={`/sozlesme/${contract.slug}`}
                          className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                          <span className="group-hover:translate-x-1 transition-transform">{contract.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Column 3 - Müşteri Hizmetleri */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-pink-500" />
                    <span className="bg-gradient-to-r from-blue-300 to-pink-300 bg-clip-text text-transparent">
                      Müşteri Hizmetleri
                    </span>
                  </h3>
                  <ul className="space-y-2.5">
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Link
                        to="/iletisim"
                        className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform">İletişim & Ulaşım</span>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.45 }}
                    >
                      <Link
                        to="/banka-hesaplari"
                        className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform">Banka Hesapları</span>
                      </Link>
                    </motion.li>
                  </ul>
                </motion.div>

                {/* Column 4 - Satış Hizmetleri */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-pink-500" />
                    <span className="bg-gradient-to-r from-blue-300 to-pink-300 bg-clip-text text-transparent">
                      Satış Hizmetleri
                    </span>
                  </h3>
                  <ul className="space-y-2.5">
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <Link
                        to="/toplu-satin-alim"
                        className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform">Toplu Satın Alım</span>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.55 }}
                    >
                      <Link
                        to="/geri-iade"
                        className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform">Geri İade</span>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <Link
                        to="/canli-destek"
                        className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform">Canlı Destek</span>
                      </Link>
                    </motion.li>
                  </ul>
                </motion.div>

              </div>
            </div>
            
            {/* Bottom Border with Gradient */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            
            {/* Footer Bottom */}
            <div className="px-8 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-xs text-center sm:text-left">
                Güvenli ödeme • Hızlı teslimat • 7/24 destek
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Sistem Aktif</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
