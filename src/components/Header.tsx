import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  Gamepad2,
  History,
  Zap,
  HelpCircle,
  MessageCircle,
  ChevronDown,
  Settings,
  Home,
  ArrowRight,
  Sparkles,
  Crown,
  Gift,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWebsite } from '../context/WebsiteContext';
import { useCheckout } from '../context/CheckoutContext';
import { getCategories } from '../services/api';

interface HeaderProps {
  hideHeader?: boolean;
}

const navLinks = [
  { href: '/', label: 'Ana Sayfa', icon: Home },
  { href: '/oyunlar', label: 'Oyunlar', icon: Zap, hasMegaMenu: true },
  { href: '/rehber', label: 'Rehber', icon: HelpCircle },
  { href: '/iletisim', label: 'İletişim', icon: MessageCircle },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

const Header = ({ hideHeader = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileGamesOpen, setIsMobileGamesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCompact, setIsCompact] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const { isCheckoutModalOpen } = useCheckout();
  const navigate = useNavigate();
  const location = useLocation();
  const { getInfoValue } = useWebsite();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((s) => !s);
  const toggleUserMenu = () => setIsUserMenuOpen((s) => !s);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150);
  };

  // Kategorileri yükle
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      }
    };
    loadCategories();
  }, []);

  // Dış tıklama ile menüler kapanır
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [isUserMenuOpen]);

  // Scroll olduğunda kompakt moda geç
  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (hideHeader || isCheckoutModalOpen) return null;

  // Kategorileri gruplara böl (3 kolon için)
  const categoryGroups = [];
  const itemsPerGroup = Math.ceil(categories.length / 3);
  for (let i = 0; i < categories.length; i += itemsPerGroup) {
    categoryGroups.push(categories.slice(i, i + itemsPerGroup));
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
      role="banner"
    >
      {/* Header Background */}
      <div 
        className="absolute inset-0 backdrop-blur-xl border-b-2"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      />

      {/* Animated Top Accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Header Content */}
      <div className={`relative transition-all duration-300 ${isCompact ? 'py-2' : 'py-3'}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group" aria-label="Ana sayfa">
                <motion.div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.5)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Gamepad2 className="h-6 w-6 text-white" />
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {getInfoValue('TITLE')}
                    </span>
                  </h1>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map(({ href, label, icon: Icon, hasMegaMenu }) => {
                  if (hasMegaMenu) {
                    return (
                      <div 
                        key={href} 
                        className="relative"
                        ref={megaMenuRef}
                        onMouseEnter={handleMegaMenuEnter}
                        onMouseLeave={handleMegaMenuLeave}
                      >
                        <Link
                          to={href}
                          className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all group"
                          style={{
                            color: isActive(href) || isMegaMenuOpen ? '#fff' : 'rgba(203, 213, 225, 1)',
                            background: isActive(href) || isMegaMenuOpen ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                            border: isActive(href) || isMegaMenuOpen ? '2px solid rgba(59, 130, 246, 0.4)' : '2px solid transparent',
                          }}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{label}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={href}
                      to={href}
                      className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                      style={{
                        color: isActive(href) ? '#fff' : 'rgba(203, 213, 225, 1)',
                        background: isActive(href) ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                        border: isActive(href) ? '2px solid rgba(59, 130, 246, 0.4)' : '2px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(href)) {
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                          e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(href)) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                        }
                      }}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  );
                })}

                {isAuthenticated && (
                  <Link
                    to="/siparislerim"
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    style={{
                      color: isActive('/siparislerim') ? '#fff' : 'rgba(203, 213, 225, 1)',
                      background: isActive('/siparislerim') ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                      border: isActive('/siparislerim') ? '2px solid rgba(59, 130, 246, 0.4)' : '2px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive('/siparislerim')) {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive('/siparislerim')) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                      }
                    }}
                  >
                    <History className="h-4 w-4" />
                    <span>Siparişlerim</span>
                  </Link>
                )}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-3">
                {isAuthenticated ? (
                  <>
                    {/* Cart */}
                    <Link
                      to="/sepet"
                      className="relative flex items-center justify-center w-11 h-11 rounded-xl transition-all"
                      style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '2px solid rgba(59, 130, 246, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                      }}
                    >
                      <ShoppingCart className="h-5 w-5 text-blue-400" />
                      {getItemCount() > 0 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[22px] h-[22px] px-1.5 text-xs font-bold text-white rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
                            boxShadow: '0 2px 10px rgba(236, 72, 153, 0.5)',
                          }}
                        >
                          {getItemCount() > 99 ? '99+' : getItemCount()}
                        </motion.span>
                      )}
                    </Link>

                    {/* User Menu */}
                    <div className="relative" ref={userMenuRef}>
                      <motion.button
                        onClick={toggleUserMenu}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '2px solid rgba(59, 130, 246, 0.2)',
                        }}
                      >
                        <div 
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                          }}
                        >
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-white max-w-[100px] truncate">
                          {user?.firstName || 'Kullanıcı'}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                      </motion.button>

                      <AnimatePresence>
                        {isUserMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden z-50"
                            style={{
                              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.99))',
                              border: '2px solid rgba(59, 130, 246, 0.3)',
                              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                            }}
                          >
                            {/* User Info */}
                            <div className="px-5 py-4 border-b-2" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                                  style={{
                                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                                  }}
                                >
                                  <User className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-black text-white truncate">
                                    {user?.firstName} {user?.lastName}
                                  </h3>
                                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                </div>
                              </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-3 space-y-1">
                              <Link
                                to="/profil"
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 transition-all hover:bg-blue-500/10 hover:text-blue-300"
                              >
                                <Settings className="h-5 w-5" />
                                <span>Profil Ayarları</span>
                              </Link>
                              <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 transition-all hover:bg-red-500/10"
                              >
                                <LogOut className="h-5 w-5" />
                                <span>Çıkış Yap</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/giris-yap"
                      className="px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-300 transition-all hover:text-white hover:bg-white/5"
                    >
                      Giriş Yap
                    </Link>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to="/kayit-ol"
                        className="px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                        }}
                      >
                        Kayıt Ol
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Mobile Actions */}
              <div className="lg:hidden flex items-center gap-2">
                {isAuthenticated && (
                  <Link
                    to="/sepet"
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '2px solid rgba(59, 130, 246, 0.2)',
                    }}
                  >
                    <ShoppingCart className="h-5 w-5 text-blue-400" />
                    {getItemCount() > 0 && (
                      <span 
                        className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold text-white rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
                        }}
                      >
                        {getItemCount()}
                      </span>
                    )}
                  </Link>
                )}

                <motion.button
                  onClick={toggleMenu}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '2px solid rgba(59, 130, 246, 0.2)',
                  }}
                >
                  {isMenuOpen ? <X className="h-5 w-5 text-blue-400" /> : <Menu className="h-5 w-5 text-blue-400" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block absolute left-0 right-0 z-40"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <div 
              className="mx-4 sm:mx-6 lg:mx-8 mt-1 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.99))',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(59, 130, 246, 0.15)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Mega Menu Top Border */}
              <motion.div
                className="h-1"
                style={{
                  background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
                }}
              />

              <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-12 gap-6">
                  
                  {/* Left Section - Featured */}
                  <div className="col-span-3">
                    <div 
                      className="h-full rounded-2xl p-5 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1))',
                        border: '2px solid rgba(59, 130, 246, 0.2)',
                      }}
                    >
                      {/* Decorative */}
                      <div 
                        className="absolute top-0 right-0 w-32 h-32 opacity-30"
                        style={{
                          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)',
                        }}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="h-5 w-5 text-purple-400" />
                          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Öne Çıkanlar</span>
                        </div>
                        
                        <h3 className="text-xl font-black text-white mb-2">
                          Oyun Dünyasına Hoş Geldiniz
                        </h3>
                        <p className="text-sm text-gray-400 mb-6">
                          En popüler oyunların e-pin ve bakiye kodlarını anında satın alın.
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
                            <Crown className="h-5 w-5 text-yellow-400" />
                            <span className="text-sm text-gray-300">Premium Ürünler</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
                            <Gift className="h-5 w-5 text-pink-400" />
                            <span className="text-sm text-gray-300">Özel İndirimler</span>
                          </div>
                        </div>

                        <Link
                          to="/oyunlar"
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <span>Tüm Kategoriler</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Categories Grid */}
                  <div className="col-span-9">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="h-5 w-5 text-blue-400" />
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Kategoriler</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {categoryGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-1">
                          {group.map((category, index) => (
                            <motion.div
                              key={category.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (groupIndex * group.length + index) * 0.03 }}
                            >
                              <Link
                                to={`/oyunlar/${category.slug}`}
                                onClick={() => setIsMegaMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-blue-500/10 group"
                              >
                                {category.url ? (
                                  <img
                                    src={category.url}
                                    alt={category.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div 
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{
                                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                                      border: '1px solid rgba(59, 130, 246, 0.3)',
                                    }}
                                  >
                                    <Gamepad2 className="h-5 w-5 text-blue-400" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-semibold text-gray-300 group-hover:text-blue-300 truncate block">
                                    {category.name}
                                  </span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 backdrop-blur-sm"
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 overflow-y-auto"
              style={{
                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.99))',
                borderLeft: '2px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header */}
              <div className="px-5 py-4 border-b-2 flex items-center justify-between" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                <h2 className="text-lg font-black">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Menü
                  </span>
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                  }}
                >
                  <X className="h-5 w-5 text-red-400" />
                </button>
              </div>

              {/* User Section */}
              {isAuthenticated && (
                <div className="px-4 py-4 border-b-2" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                  <div 
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '2px solid rgba(59, 130, 246, 0.2)',
                    }}
                  >
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                      }}
                    >
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-xs text-gray-400 truncate">{user?.email}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="px-4 py-4 space-y-2">
                {navLinks.map(({ href, label, icon: Icon, hasMegaMenu }) => {
                  if (hasMegaMenu) {
                    return (
                      <div key={href}>
                        <button
                          onClick={() => setIsMobileGamesOpen(!isMobileGamesOpen)}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-gray-300"
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-9 h-9 rounded-lg flex items-center justify-center"
                              style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                              }}
                            >
                              <Icon className="h-5 w-5 text-blue-400" />
                            </div>
                            <span>{label}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${isMobileGamesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isMobileGamesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-6 pr-3 py-2 space-y-1">
                                <Link
                                  to="/oyunlar"
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-blue-400"
                                >
                                  <Zap className="h-4 w-4" />
                                  <span>Tüm Kategoriler</span>
                                </Link>
                                {categories.map((category) => (
                                  <Link
                                    key={category.id}
                                    to={`/oyunlar/${category.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5"
                                  >
                                    {category.url ? (
                                      <img src={category.url} alt={category.name} className="w-5 h-5 rounded object-cover" />
                                    ) : (
                                      <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                                        <Gamepad2 className="h-2.5 w-2.5 text-blue-300" />
                                      </div>
                                    )}
                                    <span className="truncate">{category.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={href}
                      to={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-gray-300"
                      style={{
                        background: isActive(href) ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                        border: isActive(href) ? '2px solid rgba(59, 130, 246, 0.4)' : '2px solid transparent',
                        color: isActive(href) ? 'rgba(147, 197, 253, 1)' : undefined,
                      }}
                    >
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                        }}
                      >
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <span>{label}</span>
                    </Link>
                  );
                })}

                {isAuthenticated && (
                  <>
                    <div className="h-px my-3" style={{ background: 'rgba(59, 130, 246, 0.2)' }} />
                    
                    <Link
                      to="/siparislerim"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-gray-300"
                    >
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                        }}
                      >
                        <History className="h-5 w-5 text-blue-400" />
                      </div>
                      <span>Siparişlerim</span>
                    </Link>

                    <Link
                      to="/profil"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-gray-300"
                    >
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                        }}
                      >
                        <Settings className="h-5 w-5 text-blue-400" />
                      </div>
                      <span>Profil Ayarları</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-4 border-t-2 mt-auto" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-400"
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '2px solid rgba(239, 68, 68, 0.3)',
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Çıkış Yap</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/giris-yap"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl text-sm font-semibold text-center text-gray-300 border-2 border-blue-500/20 hover:bg-white/5"
                    >
                      Giriş Yap
                    </Link>
                    <Link
                      to="/kayit-ol"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl text-sm font-bold text-center text-white"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                      }}
                    >
                      Kayıt Ol
                    </Link>
                  </div>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
