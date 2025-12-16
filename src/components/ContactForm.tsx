import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MessageSquare, Send, ArrowRight } from 'lucide-react';
import { createMessage } from '../services/api';
import toast from 'react-hot-toast';

interface ContactFormProps {
  title: string;
  description: string;
  method: string;
  backLink: string;
  backText: string;
}

const ContactForm = ({ title, description, method }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    text: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const messageData = {
        ...formData,
        method
      };

      await createMessage(messageData);
      toast.success('Mesajınız başarıyla gönderildi!');
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        text: ''
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Mesaj gönderilirken bir hata oluştu';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
              }}
            >
              <MessageSquare className="h-6 w-6 text-blue-400" />
            </motion.div>
            <h2 className="text-2xl font-black mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-gray-300 mb-2">
                  Ad
                </label>
                <div className="relative">
                  <div 
                    className="absolute left-0 h-full w-12 flex items-center justify-center border-r rounded-l-xl"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderColor: 'rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <User className="h-4 w-4 text-blue-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full text-white pl-14 pr-4 py-3.5 rounded-xl outline-none transition-all text-sm font-medium"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.6)';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                    }}
                    placeholder="Adınız"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-gray-300 mb-2">
                  Soyad
                </label>
                <div className="relative">
                  <div 
                    className="absolute left-0 h-full w-12 flex items-center justify-center border-r rounded-l-xl"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderColor: 'rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <User className="h-4 w-4 text-blue-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full text-white pl-14 pr-4 py-3.5 rounded-xl outline-none transition-all text-sm font-medium"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.6)';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                    }}
                    placeholder="Soyadınız"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <div 
                  className="absolute left-0 h-full w-12 flex items-center justify-center border-r rounded-l-xl"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-white pl-14 pr-4 py-3.5 rounded-xl outline-none transition-all text-sm font-medium"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.6)';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                  }}
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-gray-300 mb-2">
                Konu
              </label>
              <div className="relative">
                <div 
                  className="absolute left-0 h-full w-12 flex items-center justify-center border-r rounded-l-xl"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full text-white pl-14 pr-4 py-3.5 rounded-xl outline-none transition-all text-sm font-medium"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.6)';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                  }}
                  placeholder="Mesajınızın konusu"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="text" className="block text-sm font-bold text-gray-300 mb-2">
                Mesaj
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                rows={5}
                className="w-full text-white px-4 py-3.5 rounded-xl outline-none transition-all text-sm font-medium resize-none"
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                }}
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="group relative w-full font-bold text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
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
                  <span className="text-sm">Gönderiliyor...</span>
                </span>
              ) : (
                <span className="relative z-10 flex items-center gap-3">
                  <Send className="h-5 w-5" />
                  <span className="text-sm">MESAJ GÖNDER</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;
