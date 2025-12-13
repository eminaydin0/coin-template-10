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
  Search,
  ChevronDown,
  Keyboard,
  Settings,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWebsite } from '../context/WebsiteContext';
import { useCheckout } from '../context/CheckoutContext';
import { getCategories } from '../services/api';

interface HeaderProps {
  onOpenSearch: () => void;
  hideHeader?: boolean;
}

const navLinks = [
  { href: '/', label: 'Ana Sayfa', icon: Gamepad2 },
  { href: '/oyunlar', label: 'Oyunlar', icon: Zap },
  { href: '/rehber', label: 'Rehber', icon: HelpCircle },
  { href: '/iletisim', label: 'İletişim', icon: MessageCircle },
];

/**
 * CLEAN MODERN HEADER
 * - Minimal, geometric design
 * - Subtle animations
 * - Clean typography
 * - Modern spacing and layout
 */
interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

const Header = ({ onOpenSearch, hideHeader = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = useState(false);
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
  const gamesDropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((s) => !s);
  const toggleUserMenu = () => setIsUserMenuOpen((s) => !s);

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

  // Dış tıklama ile kullanıcı menüsü ve games dropdown kapanır
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (isGamesDropdownOpen && gamesDropdownRef.current && !gamesDropdownRef.current.contains(e.target as Node)) {
        setIsGamesDropdownOpen(false);
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [isUserMenuOpen, isGamesDropdownOpen]);

  // Ctrl/⌘+K ile arama
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenSearch]);

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

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
      role="banner"
    >
      {/* Modern Background */}
      <div 
        className="absolute inset-0 backdrop-blur-xl border-b-2"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      />

      {/* Main Header */}
      <div className={`relative transition-all duration-300 ${isCompact ? 'py-3' : 'py-4'}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="Ana sayfa">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                  boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                }}
              >
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-black text-white tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {getInfoValue('TITLE')}
                </span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map(({ href, label, icon: Icon }) => {
                // Oyunlar için dropdown
                if (href === '/oyunlar') {
                  return (
                    <div key={href} className="relative" ref={gamesDropdownRef}>
                      <button
                        onMouseEnter={(e) => {
                          setIsGamesDropdownOpen(true);
                          if (!isActive(href)) {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                            e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          setIsGamesDropdownOpen(false);
                          if (!isActive(href)) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                          }
                        }}
                        className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                        style={{
                          color: isActive(href) ? '#fff' : 'rgba(203, 213, 225, 1)',
                          background: isActive(href)
                            ? 'rgba(59, 130, 246, 0.2)'
                            : 'transparent',
                          border: isActive(href)
                            ? '2px solid rgba(59, 130, 246, 0.4)'
                            : '2px solid transparent',
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isGamesDropdownOpen ? 'rotate-180' : ''}`} />
                        {isActive(href) && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                            style={{
                              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>

                      {/* Categories Dropdown */}
                      <AnimatePresence>
                        {isGamesDropdownOpen && categories.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={() => setIsGamesDropdownOpen(true)}
                            onMouseLeave={() => setIsGamesDropdownOpen(false)}
                            className="absolute top-full left-0 mt-3 w-72 rounded-2xl overflow-hidden z-50 backdrop-blur-xl"
                            style={{
                              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                              border: '2px solid rgba(59, 130, 246, 0.3)',
                              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                            }}
                          >
                            <div className="p-3 max-h-[400px] overflow-y-auto">
                              <Link
                                to="/oyunlar"
                                onClick={() => setIsGamesDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold text-blue-300 transition-all mb-3 border-b-2"
                                style={{
                                  borderColor: 'rgba(59, 130, 246, 0.3)',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                }}
                              >
                                <Zap className="h-4 w-4" />
                                <span>Tüm Kategoriler</span>
                              </Link>
                              <div className="space-y-1.5">
                                {categories.map((category) => (
                                  <Link
                                    key={category.id}
                                    to={`/oyunlar/${category.slug}`}
                                    onClick={() => setIsGamesDropdownOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 transition-all"
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                                      e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = 'transparent';
                                      e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                                    }}
                                  >
                                    {category.url ? (
                                      <img
                                        src={category.url}
                                        alt={category.name}
                                        className="w-6 h-6 rounded object-cover"
                                      />
                                    ) : (
                                      <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center">
                                        <Gamepad2 className="h-3 w-3 text-blue-300" />
                                      </div>
                                    )}
                                    <span className="truncate">{category.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Diğer linkler normal
                return (
                <Link
                  key={href}
                  to={href}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    color: isActive(href) ? '#fff' : 'rgba(203, 213, 225, 1)',
                    background: isActive(href)
                      ? 'rgba(59, 130, 246, 0.2)'
                      : 'transparent',
                    border: isActive(href)
                      ? '2px solid rgba(59, 130, 246, 0.4)'
                      : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(href)) {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                      e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(href)) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                    }
                  }}
                >
                    <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {isActive(href) && (
                    <motion.div
                        layoutId={`activeIndicator-${href}`}
                        className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
                        }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
                );
              })}

              {isAuthenticated && (
                <Link
                  to="/siparislerim"
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    color: isActive('/siparislerim') ? '#fff' : 'rgba(203, 213, 225, 1)',
                    background: isActive('/siparislerim')
                      ? 'rgba(59, 130, 246, 0.2)'
                      : 'transparent',
                    border: isActive('/siparislerim')
                      ? '2px solid rgba(59, 130, 246, 0.4)'
                      : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/siparislerim')) {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                      e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/siparislerim')) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                    }
                  }}
                >
                  <History className="h-4 w-4" />
                  <span>Siparişlerim</span>
                  {isActive('/siparislerim') && (
                    <motion.div
                      layoutId="activeIndicatorOrders"
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  color: 'rgba(203, 213, 225, 1)',
                  border: '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                }}
                aria-label="Oyun ara"
              >
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Ara</span>
              </button>

              {isAuthenticated ? (
                <>
                  {/* Cart Button */}
                  <Link
                    to="/sepet"
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all"
                    style={{
                      color: 'rgba(203, 213, 225, 1)',
                      border: '2px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                      e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                    }}
                    aria-label="Sepet"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {getItemCount() > 0 && (
                      <span 
                        className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #3B82F6, #EC4899)',
                          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
                        }}
                      >
                        {getItemCount() > 99 ? '99+' : getItemCount()}
                      </span>
                    )}
                  </Link>

                  {/* User Menu */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold text-sm transition-all"
                      style={{
                        color: 'rgba(203, 213, 225, 1)',
                        border: '2px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                        e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                      }}
                      aria-expanded={isUserMenuOpen}
                      aria-haspopup="menu"
                    >
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                          boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                        }}
                      >
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span className="hidden lg:inline max-w-[120px] truncate">
                        {user?.firstName || 'Kullanıcı'}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden z-50 backdrop-blur-xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                            border: '2px solid rgba(59, 130, 246, 0.3)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                          }}
                          role="menu"
                        >
                          {/* User Header */}
                          <div className="px-4 py-4 border-b-2" style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}>
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
                              <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-bold text-white truncate">
                                  {user?.firstName} {user?.lastName}
                                </h3>
                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="p-3 space-y-1.5">
                            <Link
                              to="/profil"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 transition-all"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                                e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                              }}
                            >
                              <Settings className="h-5 w-5" />
                              <span>Profil Ayarları</span>
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 transition-all"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                              }}
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
                    className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    style={{
                      color: 'rgba(203, 213, 225, 1)',
                      border: '2px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                      e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                    }}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/kayit-ol"
                    className="px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.4)';
                    }}
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="p-2.5 rounded-xl transition-all"
                style={{
                  color: 'rgba(203, 213, 225, 1)',
                  border: '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                }}
                aria-label="Ara"
              >
                <Search className="h-5 w-5" />
              </button>

              {isAuthenticated && (
                <Link
                  to="/sepet"
                  className="relative p-2.5 rounded-xl transition-all"
                  style={{
                    color: 'rgba(203, 213, 225, 1)',
                    border: '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                  }}
                  aria-label="Sepet"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {getItemCount() > 0 && (
                    <span 
                      className="absolute top-0 right-0 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6, #EC4899)',
                        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
                      }}
                    >
                      {getItemCount() > 99 ? '99+' : getItemCount()}
                    </span>
                  )}
                </Link>
              )}

              <button
                onClick={toggleMenu}
                className="p-2.5 rounded-xl transition-all"
                style={{
                  color: 'rgba(203, 213, 225, 1)',
                  border: '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                }}
                aria-label="Menü"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 backdrop-blur-sm"
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
              }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                borderLeft: '2px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
              }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="px-5 py-4 border-b-2" style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-white">
                      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Menü
                      </span>
                    </h2>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-xl transition-all"
                      style={{
                        color: 'rgba(203, 213, 225, 1)',
                        border: '2px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                        e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                      }}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {/* Search */}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenSearch();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all mb-4"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '2px solid rgba(59, 130, 246, 0.2)',
                      color: 'rgba(203, 213, 225, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                      e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                    }}
                  >
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                        border: '1px solid rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <Search className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white">Oyun Ara</div>
                      <div className="text-xs text-gray-400">Ctrl+K</div>
                    </div>
                    <Keyboard className="h-4 w-4 text-gray-500" />
                  </button>

                  {/* Navigation Links */}
                  <div className="space-y-2 mb-4">
                    {navLinks.map(({ href, label, icon: Icon }) => {
                      // Oyunlar için dropdown
                      if (href === '/oyunlar') {
                        return (
                          <div key={href}>
                            <button
                              onClick={() => setIsMobileGamesOpen(!isMobileGamesOpen)}
                              className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                              style={{
                                color: isActive(href) ? 'rgba(147, 197, 253, 1)' : 'rgba(203, 213, 225, 1)',
                                background: isActive(href) ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                border: isActive(href) ? '2px solid rgba(59, 130, 246, 0.4)' : '2px solid transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive(href)) {
                                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                                  e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive(href)) {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.borderColor = 'transparent';
                                  e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                                }
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="h-5 w-5" />
                                <span>{label}</span>
                              </div>
                              <ChevronDown className={`h-4 w-4 transition-transform ${isMobileGamesOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                              {isMobileGamesOpen && categories.length > 0 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-6 pr-3 py-2 space-y-1.5">
                                    <Link
                                      to="/oyunlar"
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsMobileGamesOpen(false);
                                      }}
                                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-blue-300 transition-all"
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                      }}
                                    >
                                      <Zap className="h-4 w-4" />
                                      <span>Tüm Kategoriler</span>
                                    </Link>
                                    {categories.map((category) => (
                                      <Link
                                        key={category.id}
                                        to={`/oyunlar/${category.slug}`}
                                        onClick={() => {
                                          setIsMenuOpen(false);
                                          setIsMobileGamesOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 transition-all"
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                                          e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background = 'transparent';
                                          e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                                        }}
                                      >
                                        {category.url ? (
                                          <img
                                            src={category.url}
                                            alt={category.name}
                                            className="w-5 h-5 rounded object-cover"
                                          />
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

                      // Diğer linkler normal
                      return (
                      <Link
                        key={href}
                        to={href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{
                          color: isActive(href) ? 'rgba(147, 197, 253, 1)' : 'rgba(203, 213, 225, 1)',
                          background: isActive(href) ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                          border: isActive(href) ? '2px solid rgba(59, 130, 246, 0.4)' : '2px solid transparent',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive(href)) {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                            e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(href)) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                          }
                        }}
                      >
                          <Icon className="h-5 w-5" />
                        <span>{label}</span>
                      </Link>
                      );
                    })}

                    {isAuthenticated && (
                      <Link
                        to="/siparislerim"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{
                          color: isActive('/siparislerim') ? 'rgba(147, 197, 253, 1)' : 'rgba(203, 213, 225, 1)',
                          background: isActive('/siparislerim') ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                          border: isActive('/siparislerim') ? '2px solid rgba(59, 130, 246, 0.4)' : '2px solid transparent',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive('/siparislerim')) {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                            e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive('/siparislerim')) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                          }
                        }}
                      >
                        <History className="h-5 w-5" />
                        <span>Siparişlerim</span>
                      </Link>
                    )}

                    {isAuthenticated && (
                      <Link
                        to="/sepet"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 transition-all"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                          e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                        }}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Sepet</span>
                        {getItemCount() > 0 && (
                          <span 
                            className="ml-auto flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white rounded-full"
                            style={{
                              background: 'linear-gradient(135deg, #3B82F6, #EC4899)',
                              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
                            }}
                          >
                            {getItemCount() > 99 ? '99+' : getItemCount()}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* User Section */}
                  {isAuthenticated ? (
                    <div className="pt-4 border-t-2 space-y-2" style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                      <div className="px-4 py-3 mb-3 rounded-xl" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.2)' }}>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
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
                      <Link
                        to="/profil"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 transition-all"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                          e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                        }}
                      >
                        <Settings className="h-5 w-5" />
                        <span>Profil Ayarları</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 transition-all"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t-2 space-y-2" style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                      <Link
                        to="/giris-yap"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all"
                        style={{
                          color: 'rgba(203, 213, 225, 1)',
                          border: '2px solid transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                          e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.color = 'rgba(203, 213, 225, 1)';
                        }}
                      >
                        Giriş Yap
                      </Link>
                      <Link
                        to="/kayit-ol"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full px-4 py-3 rounded-xl text-sm font-bold text-center text-white transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.4)';
                        }}
                      >
                        Kayıt Ol
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
