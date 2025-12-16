import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Save,
  Eye,
  EyeOff,
  Shield,
  UserCircle,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyData, updateName, updateEmail, updatePassword } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';
import toast from 'react-hot-toast';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfilePage = () => {
  const { isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Form states
  const [nameForm, setNameForm] = useState({
    firstName: '',
    lastName: ''
  });
  const [emailForm, setEmailForm] = useState({
    email: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // UI states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        console.log('Loading user data...');
        
        // /my-data endpoint'ini kullanarak güncel veri al
        console.log('Fetching user data from /my-data endpoint...');
        const response = await getMyData();
        console.log('User data response:', response);
        const data = response.data;
        console.log('User data from API:', data);
        
        // API'den gelen veriyi kullan
        setUserData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || ''
        });
        
        setNameForm({
          firstName: data.firstName || '',
          lastName: data.lastName || ''
        });
        
        setEmailForm({
          email: data.email || ''
        });
        
        console.log('User data loaded successfully from API');
      } catch (error: any) {
        console.error('Error loading user data from API:', error);
        console.error('Error response:', error.response);
        console.error('Error data:', error.response?.data);
        
        // API'den veri alınamazsa AuthContext'ten veri al
        console.log('Falling back to AuthContext data...');
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          try {
            const user = JSON.parse(savedUser);
            console.log('Using AuthContext data:', user);
            
            setUserData({
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email || ''
            });
            
            setNameForm({
              firstName: user.firstName || '',
              lastName: user.lastName || ''
            });
            
            setEmailForm({
              email: user.email || ''
            });
            
            console.log('User data loaded from AuthContext successfully');
          } catch (parseError) {
            console.error('Error parsing user data from localStorage:', parseError);
            toast.error('Kullanıcı bilgileri yüklenirken hata oluştu');
          }
        } else {
          toast.error('Kullanıcı bilgileri yüklenirken hata oluştu');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [isAuthenticated, navigate]);


  // Update name
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nameForm.firstName.trim() || !nameForm.lastName.trim()) {
      toast.error('Ad ve soyad alanları zorunludur');
      return;
    }

    try {
      setUpdating('name');
      const firstName = nameForm.firstName.trim();
      const lastName = nameForm.lastName.trim();
      
      console.log('Updating name with data:', {
        method: 1,
        firstName,
        lastName
      });
      
      // Token kontrolü
      const token = localStorage.getItem('token');
      console.log('Current token:', token ? 'Token exists' : 'No token found');
      
      const response = await updateName(firstName, lastName);
      console.log('Name update response:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      // API'den başarılı yanıt geldi mi kontrol et
      if (response.status === 200 || response.status === 201) {
        setUserData(prev => ({
          ...prev,
          firstName,
          lastName
        }));
        
        // AuthContext'i güncelle
        updateUser({
          firstName,
          lastName
        });
        
        toast.success('Ad ve soyad başarıyla güncellendi');
      } else {
        console.error('Unexpected response status:', response.status);
        toast.error('Beklenmeyen yanıt durumu: ' + response.status);
      }
    } catch (error: any) {
      console.error('Error updating name:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      console.error('Error response status:', error.response?.status);
      console.error('Error response data:', error.response?.data);
      console.error('Error response headers:', error.response?.headers);
      
      // Daha detaylı hata mesajı
      let errorMessage = 'Ad ve soyad güncellenirken hata oluştu';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      if (error.response?.status === 401) {
        errorMessage = 'Oturum süresi dolmuş. Lütfen tekrar giriş yapın.';
      } else if (error.response?.status === 403) {
        errorMessage = 'Bu işlem için yetkiniz bulunmuyor.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Geçersiz veri gönderildi.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
      }
      
      toast.error(errorMessage);
    } finally {
      setUpdating(null);
    }
  };

  // Update email
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailForm.email.trim()) {
      toast.error('E-posta alanı zorunludur');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailForm.email)) {
      toast.error('Geçerli bir e-posta adresi giriniz');
      return;
    }

    try {
      setUpdating('email');
      const email = emailForm.email.trim();
      
      console.log('Updating email with data:', {
        method: 2,
        email
      });
      
      const response = await updateEmail(email);
      console.log('Email update response:', response);
      
      setUserData(prev => ({
        ...prev,
        email
      }));
      
      // AuthContext'i güncelle
      updateUser({
        email
      });
      
      toast.success('E-posta başarıyla güncellendi');
    } catch (error: any) {
      console.error('Error updating email:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      toast.error(error.response?.data?.message || error.response?.data?.error || 'E-posta güncellenirken hata oluştu');
    } finally {
      setUpdating(null);
    }
  };

  // Update password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('Tüm şifre alanları zorunludur');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Yeni şifre en az 6 karakter olmalıdır');
      return;
    }

    try {
      setUpdating('password');
      const password = passwordForm.newPassword;
      
      console.log('Updating password with data:', {
        method: 3,
        password
      });
      
      const response = await updatePassword(password);
      console.log('Password update response:', response);
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast.success('Şifre başarıyla güncellendi');
    } catch (error: any) {
      console.error('Error updating password:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Şifre güncellenirken hata oluştu');
    } finally {
      setUpdating(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 relative overflow-hidden">
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
                      <UserCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Profil Yönetimi
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
                        Profil Ayarları
                      </motion.span>
                    </h1>
                    
                    <motion.p
                      className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Hesap bilgilerinizi güncelleyin ve güvenliğinizi yönetin
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
                      <div 
                        className="absolute top-0 right-0 w-32 h-32 opacity-20"
                        style={{
                          background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
                          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        }}
                      />
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
                            Hesap
                          </span>
                          <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Ayarları
                          </span>
                        </div>
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Settings className="h-12 w-12 text-blue-400/40" />
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
                      style={{
                        background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
                      }}
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <div className="relative z-10">
                      <UserCircle className="h-16 w-16 text-blue-400/50 mx-auto mb-6" />
                      <h3 className="text-2xl font-black text-white mb-3">
                        Profil sayfasına erişmek için giriş yapın
                      </h3>
                      <p className="text-gray-400 text-base mb-8">
                        Hesabınıza giriş yaparak profil ayarlarınızı yönetebilirsiniz.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/giris-yap">
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
                            <span className="relative z-10">GİRİŞ YAP</span>
                          </motion.button>
                        </Link>
                        
                        <Link to="/kayit-ol">
                          <motion.button
                            className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all"
                            style={{
                              background: 'rgba(59, 130, 246, 0.15)',
                              border: '2px solid rgba(59, 130, 246, 0.3)',
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            KAYIT OL
                          </motion.button>
                        </Link>
                      </div>
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

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CommonBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <LoadingSpinner 
            size="xl" 
            text="Profil Yükleniyor..." 
            variant="gaming" 
          />
        </div>
      </div>
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
                    <UserCircle className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                      Profil Yönetimi
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
                      Profil Ayarları
                    </motion.span>
                  </h1>
                  
                  <motion.p
                    className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Hesap bilgilerinizi güncelleyin ve güvenliğinizi yönetin
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
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 opacity-20"
                      style={{
                        background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                      }}
                    />
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
                          Hesap
                        </span>
                        <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          Ayarları
                        </span>
                      </div>
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Settings className="h-12 w-12 text-blue-400/40" />
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

          {/* Profile Sections */}
          <section className="relative py-4">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                {/* Name Update Section */}
                <ProfileFormCard
                  number={1}
                  icon={User}
                  title="Ad ve Soyad"
                  description={`Mevcut: ${userData.firstName} ${userData.lastName}`}
                  onSubmit={handleUpdateName}
                  updating={updating === 'name'}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-300">
                        Ad
                      </label>
                      <input
                        type="text"
                        value={nameForm.firstName}
                        onChange={(e) => setNameForm(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '2px solid rgba(59, 130, 246, 0.2)',
                          boxShadow: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        }}
                        placeholder="Adınızı girin"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-300">
                        Soyad
                      </label>
                      <input
                        type="text"
                        value={nameForm.lastName}
                        onChange={(e) => setNameForm(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '2px solid rgba(59, 130, 246, 0.2)',
                          boxShadow: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        }}
                        placeholder="Soyadınızı girin"
                        required
                      />
                    </div>
                  </div>
                </ProfileFormCard>

                {/* Email Update Section */}
                <ProfileFormCard
                  number={2}
                  icon={Mail}
                  title="E-posta"
                  description={`Mevcut: ${userData.email}`}
                  onSubmit={handleUpdateEmail}
                  updating={updating === 'email'}
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                      Yeni E-posta
                    </label>
                    <input
                      type="email"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium"
                      style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '2px solid rgba(59, 130, 246, 0.2)',
                        boxShadow: 'none',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                      }}
                      placeholder="Yeni e-posta adresinizi girin"
                      required
                    />
                  </div>
                </ProfileFormCard>
              </div>

              {/* Password Update Section - Full Width */}
              <ProfileFormCard
                number={3}
                icon={Shield}
                title="Şifre"
                description="Güvenliğiniz için şifrenizi güncelleyin"
                onSubmit={handleUpdatePassword}
                updating={updating === 'password'}
                className="mt-4 sm:mt-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                      Mevcut Şifre
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-11 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '2px solid rgba(59, 130, 246, 0.2)',
                          boxShadow: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        }}
                        placeholder="Mevcut şifrenizi girin"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-300 transition-all duration-200 p-1.5 rounded-lg hover:bg-purple-300/10"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                      Yeni Şifre
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-11 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '2px solid rgba(59, 130, 246, 0.2)',
                          boxShadow: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        }}
                        placeholder="Yeni şifrenizi girin"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-300 transition-all duration-200 p-1.5 rounded-lg hover:bg-purple-300/10"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                      Yeni Şifre Tekrar
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-11 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '2px solid rgba(59, 130, 246, 0.2)',
                          boxShadow: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        }}
                        placeholder="Yeni şifrenizi tekrar girin"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-300 transition-all duration-200 p-1.5 rounded-lg hover:bg-purple-300/10"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </ProfileFormCard>
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

// Profile Form Card Component
interface ProfileFormCardProps {
  number: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  onSubmit: (e: React.FormEvent) => void;
  updating: boolean;
  children: React.ReactNode;
  className?: string;
}

const ProfileFormCard = ({ number, icon: Icon, title, description, onSubmit, updating, children, className = '' }: ProfileFormCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: number * 0.1 }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-3xl border-2 overflow-hidden transition-all duration-300 ${className}`}
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

      <div className="p-5 sm:p-6 relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Left: Icon and Title */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
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
            
            {/* Title and Description */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-black text-lg mb-1 leading-tight">
                {title}
              </h3>
              <p className="text-gray-400 text-sm">
                {description}
              </p>
            </div>
          </div>

          {/* Right: Number Badge */}
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            style={{
              background: 'rgba(59, 130, 246, 0.15)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
            }}
          >
            <span className="text-blue-400">#{number}</span>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: 'rgba(59, 130, 246, 0.2)' }}></div>

        {/* Form */}
        <form onSubmit={onSubmit} className="flex-1 flex flex-col space-y-4">
          {children}
          
          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={updating}
            className="relative w-full font-bold text-white py-3 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-4"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
            }}
            whileHover={{ scale: updating ? 1 : 1.05, y: updating ? 0 : -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {updating ? (
              <>
                <div className="w-5 h-5 border-[3px] border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                <span className="text-sm relative z-10">Güncelleniyor...</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5 relative z-10" />
                <span className="text-sm relative z-10">Güncelle</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ProfilePage;

