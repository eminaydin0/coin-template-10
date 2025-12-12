import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, UserCircle, UserCircle2, Calendar, Fingerprint, UserPlus, ArrowRight, Sparkles, Zap, Gamepad2, Shield, Rocket, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/SEOHead';
import CommonBackground from '../components/CommonBackground';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    tcNo: '',
    birthDate: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Şifre en az 8 karakter olmalıdır');
      return false;
    }

    if (formData.tcNo.length !== 11 || !/^\d{11}$/.test(formData.tcNo)) {
      setError('TC kimlik numarası 11 haneli olmalıdır');
      return false;
    }

    if (!formData.birthDate) {
      setError('Doğum tarihi gereklidir');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      
      if (result.success) {
        navigate('/giris-yap');
      } else {
        setError(result.error || 'Kayıt başarısız');
      }
    } catch (err) {
      setError('Kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead />
      <div className="min-h-screen pt-20 relative overflow-hidden">
        <CommonBackground />

        <div className="w-full relative z-10">
          {/* Split Screen Layout */}
          <div className="min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row lg:gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Left Side - Creative Design */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 relative overflow-hidden hidden lg:flex items-center justify-center pt-8 pb-8 pr-4"
            >

              {/* Content */}
              <div className="relative z-10 max-w-lg w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-5"
                >
                  <h1 className="text-3xl font-black text-white mb-3 leading-tight">
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Hesabını Oluştur
                    </span>
                    <span className="block text-white">Oyunlara Başla!</span>
                  </h1>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Ücretsiz hesap oluştur, özel indirimlerden faydalan ve en iyi oyun deneyimini yaşa.
                  </p>
                </motion.div>

                {/* Features List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-3"
                >
                  {[
                    { icon: Shield, text: 'Güvenli ve Hızlı Kayıt', color: 'blue' },
                    { icon: Rocket, text: 'Anında Erişim', color: 'pink' },
                    { icon: CheckCircle, text: 'Özel Üye Avantajları', color: 'purple' },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-xl border"
                      style={{
                        background: 'rgba(30, 41, 59, 0.4)',
                        border: '1px solid rgba(96, 165, 250, 0.2)',
                      }}
                      whileHover={{ x: 5, borderColor: 'rgba(96, 165, 250, 0.4)' }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))`,
                          border: '1px solid rgba(96, 165, 250, 0.4)',
                        }}
                      >
                        <feature.icon className={`h-5 w-5 text-${feature.color}-300`} />
                      </div>
                      <span className="text-white font-medium text-sm">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Register Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-3/5 flex items-center justify-center pt-8 pb-8 px-4 sm:px-6 lg:px-4"
            >
              <div className="w-full">
                {/* Mobile Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 lg:hidden text-center"
                >
                  <div className="inline-flex items-center gap-3 mb-4 px-5 py-2.5 rounded-2xl backdrop-blur-xl border"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.15))',
                      border: '1px solid rgba(96, 165, 250, 0.3)',
                    }}
                  >
                    <Gamepad2 className="h-5 w-5 text-blue-300" />
                    <span className="text-sm font-bold text-white">Kayıt Ol</span>
                  </div>
                  <h1 className="text-3xl font-black text-white mb-2">
                    <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                      Hesap Oluştur
                    </span>
                  </h1>
                  <p className="text-gray-400 text-sm">Oyun dünyasına katıl! Hemen ücretsiz hesap oluştur.</p>
                </motion.div>

                {/* Desktop Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 hidden lg:block"
                >
                  <h2 className="text-3xl font-black text-white mb-2">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Kayıt Ol
                    </span>
                  </h2>
                  <p className="text-gray-400 text-sm">Hesabını oluştur ve oyunlara başla</p>
                </motion.div>

                {/* Register Form Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
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

                  <div className="relative z-10 p-6 sm:p-7">
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      {/* Error Message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="px-4 py-3 rounded-xl border flex items-center gap-3"
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                            }}
                          >
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-red-300">{error}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Name Fields - Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: 'firstName', label: 'Ad', icon: UserCircle, placeholder: 'Adınız' },
                          { id: 'lastName', label: 'Soyad', icon: UserCircle2, placeholder: 'Soyadınız' },
                        ].map(({ id, label, icon: Icon, placeholder }) => (
                          <div key={id}>
                            <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor={id}>
                              {label}
                            </label>
                            <div className="relative group">
                              <div 
                                className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                                  focusedField === id ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{
                                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.15))',
                                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                                }}
                              />
                              <div className="relative flex items-center">
                                <div 
                                  className="absolute left-0 h-full w-12 flex items-center justify-center border-r-2 rounded-l-xl"
                                  style={{
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    borderColor: 'rgba(59, 130, 246, 0.3)',
                                  }}
                                >
                                  <Icon className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                  type="text"
                                  id={id}
                                  name={id}
                                  value={(formData as any)[id]}
                                  onChange={handleChange}
                                  onFocus={() => handleFocus(id)}
                                  onBlur={handleBlur}
                                  required
                                  className="w-full pl-14 pr-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all font-medium text-sm"
                                  style={{
                                    background: focusedField === id ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                                    border: focusedField === id
                                      ? '2px solid rgba(96, 165, 250, 0.6)'
                                      : '2px solid rgba(59, 130, 246, 0.3)',
                                    boxShadow: focusedField === id
                                      ? '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)'
                                      : '0 4px 16px rgba(0, 0, 0, 0.2)',
                                  }}
                                  placeholder={placeholder}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Email Input */}
                      <div>
                          <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="email">
                          E-posta Adresi
                        </label>
                        <div className="relative group">
                          <div 
                            className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                              focusedField === 'email' ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.15))',
                              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                            }}
                          />
                          <div className="relative flex items-center">
                            <div 
                              className="absolute left-0 h-full w-14 flex items-center justify-center border-r-2 rounded-l-xl"
                              style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderColor: 'rgba(59, 130, 246, 0.3)',
                              }}
                            >
                              <Mail className="h-5 w-5 text-blue-400" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => handleFocus('email')}
                              onBlur={handleBlur}
                              required
                              className="w-full pl-16 pr-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all font-medium text-sm"
                              style={{
                                background: focusedField === 'email' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                                border: focusedField === 'email'
                                  ? '2px solid rgba(96, 165, 250, 0.6)'
                                  : '2px solid rgba(59, 130, 246, 0.3)',
                                boxShadow: focusedField === 'email'
                                  ? '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)'
                                  : '0 4px 16px rgba(0, 0, 0, 0.2)',
                              }}
                              placeholder="ornek@email.com"
                            />
                          </div>
                        </div>
                      </div>

                      {/* TC No and Birth Date - Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="tcNo">
                            TC Kimlik No
                          </label>
                          <div className="relative group">
                            <div 
                              className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                                focusedField === 'tcNo' ? 'opacity-100' : 'opacity-0'
                              }`}
                              style={{
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.15))',
                                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                              }}
                            />
                            <div className="relative flex items-center">
                              <div 
                                className="absolute left-0 h-full w-14 flex items-center justify-center border-r-2 rounded-l-xl"
                                style={{
                                  background: 'rgba(0, 0, 0, 0.3)',
                                  borderColor: 'rgba(59, 130, 246, 0.3)',
                                }}
                              >
                                <Fingerprint className="h-5 w-5 text-blue-400" />
                              </div>
                              <input
                                type="text"
                                id="tcNo"
                                name="tcNo"
                                value={formData.tcNo}
                                onChange={handleChange}
                                onFocus={() => handleFocus('tcNo')}
                                onBlur={handleBlur}
                                required
                                maxLength={11}
                                pattern="[0-9]{11}"
                                className="w-full pl-16 pr-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all font-medium text-sm"
                                style={{
                                  background: focusedField === 'tcNo' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                                  border: focusedField === 'tcNo'
                                    ? '2px solid rgba(96, 165, 250, 0.6)'
                                    : '2px solid rgba(59, 130, 246, 0.3)',
                                  boxShadow: focusedField === 'tcNo'
                                    ? '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)'
                                    : '0 4px 16px rgba(0, 0, 0, 0.2)',
                                }}
                                placeholder="12345678901"
                              />
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                            <span>⚠</span> 11 haneli TC kimlik numarası
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="birthDate">
                            Doğum Tarihi
                          </label>
                          <div className="relative group">
                            <div 
                              className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                                focusedField === 'birthDate' ? 'opacity-100' : 'opacity-0'
                              }`}
                              style={{
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.15))',
                                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                              }}
                            />
                            <div className="relative flex items-center">
                              <div 
                                className="absolute left-0 h-full w-14 flex items-center justify-center border-r-2 rounded-l-xl"
                                style={{
                                  background: 'rgba(0, 0, 0, 0.3)',
                                  borderColor: 'rgba(59, 130, 246, 0.3)',
                                }}
                              >
                                <Calendar className="h-5 w-5 text-blue-400" />
                              </div>
                              <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                onFocus={() => handleFocus('birthDate')}
                                onBlur={handleBlur}
                                required
                                className="w-full pl-16 pr-4 py-3.5 rounded-xl text-white focus:outline-none transition-all font-medium"
                                style={{
                                  background: focusedField === 'birthDate' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                                  border: focusedField === 'birthDate'
                                    ? '2px solid rgba(96, 165, 250, 0.6)'
                                    : '2px solid rgba(59, 130, 246, 0.3)',
                                  boxShadow: focusedField === 'birthDate'
                                    ? '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)'
                                    : '0 4px 16px rgba(0, 0, 0, 0.2)',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Password Fields - Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: 'password', label: 'Şifre', value: formData.password, setter: setShowPassword, show: showPassword },
                          { id: 'confirmPassword', label: 'Şifre Tekrar', value: formData.confirmPassword, setter: setShowConfirmPassword, show: showConfirmPassword },
                        ].map(({ id, label, value, setter, show }) => (
                          <div key={id}>
                            <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor={id}>
                              {label}
                            </label>
                            <div className="relative group">
                              <div 
                                className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                                  focusedField === id ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{
                                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.15))',
                                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                                }}
                              />
                              <div className="relative flex items-center">
                                <div 
                                  className="absolute left-0 h-full w-14 flex items-center justify-center border-r-2 rounded-l-xl"
                                  style={{
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    borderColor: 'rgba(59, 130, 246, 0.3)',
                                  }}
                                >
                                  <Lock className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                  type={show ? 'text' : 'password'}
                                  id={id}
                                  name={id}
                                  value={value}
                                  onChange={handleChange}
                                  onFocus={() => handleFocus(id)}
                                  onBlur={handleBlur}
                                  required
                                  minLength={id === 'password' ? 8 : undefined}
                                  className="w-full pl-16 pr-12 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all font-medium text-sm"
                                  style={{
                                    background: focusedField === id ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                                    border: focusedField === id
                                      ? '2px solid rgba(96, 165, 250, 0.6)'
                                      : '2px solid rgba(59, 130, 246, 0.3)',
                                    boxShadow: focusedField === id
                                      ? '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)'
                                      : '0 4px 16px rgba(0, 0, 0, 0.2)',
                                  }}
                                  placeholder="••••••••"
                                />
                                <button
                                  type="button"
                                  onClick={() => setter((s) => !s)}
                                  className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-400 transition-all hover:bg-blue-500/10"
                                  aria-label={show ? 'Şifreyi gizle' : 'Şifreyi göster'}
                                >
                                  {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                              </div>
                            </div>
                            {id === 'password' && (
                              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                                <Zap className="h-3.5 w-3.5 text-blue-400" />
                                <span>En az 8 karakter olmalıdır</span>
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full font-bold text-white py-3.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-5"
                        style={{
                          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                        }}
                        whileHover={loading ? {} : { scale: 1.02, y: -2 }}
                        whileTap={loading ? {} : { scale: 0.98 }}
                      >
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        
                        {/* Diagonal Accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 transform rotate-45 translate-x-12 -translate-y-12" />
                        
                        {loading ? (
                          <span className="relative z-10 flex items-center gap-3">
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="text-sm">Hesap Oluşturuluyor...</span>
                          </span>
                        ) : (
                          <span className="relative z-10 flex items-center gap-3">
                            <UserPlus className="h-5 w-5" />
                            <span className="text-sm">HESAP OLUŞTUR</span>
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </motion.button>

                      {/* Login Link */}
                      <div className="text-center pt-6 border-t border-white/10">
                        <p className="text-gray-400 text-sm mb-4">Zaten hesabın var mı?</p>
                        <Link
                          to="/giris-yap"
                          className="group inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl border-2 transition-all"
                          style={{
                            border: '2px solid rgba(96, 165, 250, 0.4)',
                            color: 'rgba(96, 165, 250, 1)',
                            background: 'rgba(59, 130, 246, 0.1)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                            e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.4)';
                          }}
                        >
                          <span className="text-sm">GİRİŞ YAP</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
