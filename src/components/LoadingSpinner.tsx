import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import CommonBackground from './CommonBackground';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'default' | 'gaming' | 'minimal' | 'compact' | 'inline';
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'amber';
  gradient?: boolean;
  className?: string;
  showBackground?: boolean;
}

const LoadingSpinner = ({ 
  size = 'lg', 
  text = 'Yükleniyor...', 
  variant = 'gaming',
  color = 'blue',
  className = '',
  showBackground = false,
  gradient = true
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  // Color mapping - LoginPage style (blue-purple-pink gradient theme)
  const colorClasses = {
    blue: { border: 'border-blue-400', icon: 'text-blue-400', dot: 'bg-blue-400/60', style: { borderColor: 'rgba(59, 130, 246, 0.2)', borderTopColor: 'rgba(96, 165, 250, 0.9)', boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)' } },
    red: { border: 'border-red-400', icon: 'text-red-400', dot: 'bg-red-400/60', style: { borderColor: 'rgba(239, 68, 68, 0.2)', borderTopColor: 'rgba(248, 113, 113, 0.9)', boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)' } },
    green: { border: 'border-green-400', icon: 'text-green-400', dot: 'bg-green-400/60', style: { borderColor: 'rgba(34, 197, 94, 0.2)', borderTopColor: 'rgba(74, 222, 128, 0.9)', boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)' } },
    yellow: { border: 'border-yellow-400', icon: 'text-yellow-400', dot: 'bg-yellow-400/60', style: { borderColor: 'rgba(234, 179, 8, 0.2)', borderTopColor: 'rgba(250, 204, 21, 0.9)', boxShadow: '0 0 25px rgba(234, 179, 8, 0.4)' } },
    purple: { border: 'border-purple-400', icon: 'text-purple-400', dot: 'bg-purple-400/60', style: { borderColor: 'rgba(139, 92, 246, 0.2)', borderTopColor: 'rgba(192, 132, 252, 0.9)', boxShadow: '0 0 25px rgba(139, 92, 246, 0.4)' } },
    amber: { border: 'border-amber-400', icon: 'text-amber-400', dot: 'bg-amber-400/60', style: { borderColor: 'rgba(251, 191, 36, 0.2)', borderTopColor: 'rgba(251, 191, 36, 0.9)', boxShadow: '0 0 25px rgba(251, 191, 36, 0.4)' } }
  };

  const selectedColor = colorClasses[color] || colorClasses.blue;

  // Inline variant - just the spinner without container
  if (variant === 'inline') {
    return (
      <motion.div
        className={`${sizeClasses[size]} border-2 border-gray-600 ${selectedColor.border.replace('border-', 'border-t-')} rounded-full ${className}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        role="status"
        aria-label="Yükleniyor"
      />
    );
  }

  // Compact variant - minimal spinner with optional text
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} border-2 border-gray-600 ${selectedColor.border.replace('border-', 'border-t-')} rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          role="status"
          aria-label="Yükleniyor"
        />
        {text && (
          <span className={`${textSizes[size]} text-gray-300 font-medium`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} border-4 border-gray-600 ${selectedColor.border.replace('border-', 'border-t-')} rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          role="status"
          aria-label="Yükleniyor"
        />
        {text && (
          <motion.p 
            className={`${textSizes[size]} text-gray-300 font-medium`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'gaming') {
    const spinnerContent = (
      <div className={`flex flex-col items-center justify-center space-y-6 relative min-h-screen ${className}`}>
        {/* LoginPage Style Spinner */}
        <div className="relative">
          {/* Outer Glow Ring */}
          {gradient && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
                filter: 'blur(8px)',
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          
          {/* Main Spinner Ring */}
          <motion.div
            className={`${sizeClasses[size]} border-4 rounded-full relative`}
            style={gradient ? {
              borderColor: 'rgba(59, 130, 246, 0.2)',
              borderTopColor: '#3B82F6',
              borderRightColor: '#8B5CF6',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)'
            } : selectedColor.style}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Loader2 className={`${iconSizes[size]} ${gradient ? 'text-blue-400' : selectedColor.icon}`} />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <motion.p 
            className={`${textSizes[size]} font-bold`}
            style={{
              background: gradient ? 'linear-gradient(90deg, #60A5FA, #A78BFA, #F472B6)' : undefined,
              WebkitBackgroundClip: gradient ? 'text' : undefined,
              WebkitTextFillColor: gradient ? 'transparent' : undefined,
              color: gradient ? undefined : 'rgb(209, 213, 219)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
          
          {/* Animated Dots - Gradient Colors */}
          <div className="flex justify-center space-x-2">
            {[
              gradient ? 'bg-blue-400' : selectedColor.dot,
              gradient ? 'bg-purple-400' : selectedColor.dot,
              gradient ? 'bg-pink-400' : selectedColor.dot
            ].map((dotColor, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${dotColor}`}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );

    if (showBackground) {
      return (
        <div className="relative w-full h-full">
          <CommonBackground />
          {spinnerContent}
        </div>
      );
    }

    return spinnerContent;
  }

  // Default variant - LoginPage style
  const defaultContent = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* LoginPage Style Spinner */}
      <div className="relative">
        {/* Outer Glow */}
        {gradient && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
              filter: 'blur(6px)',
            }}
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {/* Main Spinner Ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 rounded-full relative`}
          style={gradient ? {
            borderColor: 'rgba(59, 130, 246, 0.2)',
            borderTopColor: '#3B82F6',
            borderRightColor: '#8B5CF6',
            boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)'
          } : selectedColor.style}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          role="status"
          aria-label="Yükleniyor"
        />
        
        {/* Center Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Loader2 className={`${iconSizes[size]} ${gradient ? 'text-blue-400' : selectedColor.icon}`} />
        </div>
      </div>
      
      {/* Loading Text */}
      {text && (
        <div className="text-center space-y-2">
          <motion.p 
            className={`${textSizes[size]} font-bold`}
            style={{
              background: gradient ? 'linear-gradient(90deg, #60A5FA, #A78BFA, #F472B6)' : undefined,
              WebkitBackgroundClip: gradient ? 'text' : undefined,
              WebkitTextFillColor: gradient ? 'transparent' : undefined,
              color: gradient ? undefined : 'rgb(209, 213, 219)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
          
          {/* Animated Dots - Gradient Colors */}
          <div className="flex justify-center space-x-2">
            {[
              gradient ? 'bg-blue-400' : selectedColor.dot,
              gradient ? 'bg-purple-400' : selectedColor.dot,
              gradient ? 'bg-pink-400' : selectedColor.dot
            ].map((dotColor, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${dotColor}`}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (showBackground) {
    return (
      <div className="relative w-full h-full">
        <CommonBackground />
        {defaultContent}
      </div>
    );
  }

  return defaultContent;
};

export default LoadingSpinner;
