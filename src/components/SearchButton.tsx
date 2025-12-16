import { motion } from 'framer-motion';
import { Search, Command } from 'lucide-react';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 group"
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {/* Outer Pulsing Glow */}
      <motion.div 
        className="absolute -inset-3 rounded-2xl blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.4))'
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Main Button */}
      <div 
        className="relative flex items-center gap-3 text-white font-bold py-3 px-5 transition-all duration-300 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
          border: '2px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Animated Top Border */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Diagonal Accent */}
        <div 
          className="absolute top-0 right-0 w-16 h-16 opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          }}
        />
        
        {/* Search Icon */}
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}
        >
          <Search className="w-5 h-5 text-blue-400" />
        </div>
        
        {/* Text */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Oyun Ara
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Hızlı arama</span>
        </div>
        
        {/* Keyboard Shortcut Badge */}
        <div 
          className="flex items-center gap-1 px-2 py-1 rounded-lg ml-2"
          style={{
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <Command className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] text-blue-400 font-bold">K</span>
        </div>
        
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-200%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.button>
  );
};

export default SearchButton;
