import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Evet',
  cancelText = 'Hayır',
}: ConfirmModalProps) => {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') {
        e.preventDefault();
        doConfirm();
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || !focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const doConfirm = () => {
    if (confirming) return;
    setConfirming(true);
    try {
      onConfirm();
    } finally {
      setConfirming(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-live="polite">
        {/* Backdrop */}
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Pencereyi kapat"
        />

        {/* Modal */}
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-desc"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-3xl border-2 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.99))',
            border: '2px solid rgba(239, 68, 68, 0.4)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Animated Top Border */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: 'linear-gradient(90deg, #EF4444, #F97316, #EF4444)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Diagonal Accent */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-20"
            style={{
              background: 'linear-gradient(135deg, transparent, rgba(239, 68, 68, 0.4))',
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
            }}
          />

          {/* Close Button */}
          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.9 }}
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-xl p-2 text-gray-400 hover:text-white transition-all"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </motion.button>

          {/* Header with Icon */}
          <div className="p-6 pt-8 text-center relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2))',
                border: '2px solid rgba(239, 68, 68, 0.4)',
                boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)',
              }}
            >
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </motion.div>
            <h3 id="confirm-title" className="text-2xl font-black text-white mb-2">
              {title}
            </h3>
            <p id="confirm-desc" className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
              {message}
            </p>
          </div>

          {/* Warning Badge */}
          <div className="px-6 pb-4 text-center relative z-10">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
              }}
            >
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-red-400 text-xs font-bold">Bu işlem geri alınamaz!</span>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-6 h-px" style={{ background: 'rgba(239, 68, 68, 0.2)' }}></div>

          {/* Actions */}
          <div className="p-6 flex gap-3 relative z-10">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-4 py-3.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              {cancelText}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              onClick={doConfirm}
              disabled={confirming}
              className="flex-1 px-4 py-3.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #EF4444, #F97316)',
                boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
              }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {confirming ? (
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <motion.div 
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>İşleniyor...</span>
                </div>
              ) : (
                <span className="relative z-10">{confirmText}</span>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
