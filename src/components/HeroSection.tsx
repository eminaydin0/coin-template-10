import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Eye, ArrowRight, Play, Pause, Star, Sparkles, Zap, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroItem {
  slogan: string;
  short1: string;
  short2: string;
  short3: string;
  url: string;
}

interface Props {
  heroList: HeroItem[];
  currentHeroIndex: number;
  setCurrentHeroIndex: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
}

export default function HeroSection({
  heroList,
  currentHeroIndex,
  setCurrentHeroIndex,
  isPlaying,
  setIsPlaying,
}: Props) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const DURATION = 8000;
  const progressRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(performance.now());
  const current = heroList[currentHeroIndex];
  
  const clamp = (i: number) => {
    const length = heroList.length;
    return ((i % length) + length) % length;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isPlaying || heroList.length <= 1) return;
    startTimeRef.current = performance.now();
    if (progressRef.current) {
      progressRef.current.style.setProperty("--p", "0");
    }

    let raf: number | null = null;
    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / DURATION);
      if (progressRef.current) {
        progressRef.current.style.setProperty("--p", t.toString());
      }
      if (t >= 1) {
        setCurrentHeroIndex((p) => ((p + 1) % heroList.length));
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [isPlaying, currentHeroIndex, heroList.length, setCurrentHeroIndex]);

  const goToSlide = (index: number) => {
    setCurrentHeroIndex(clamp(index));
  };

  const goToPrev = () => setCurrentHeroIndex((p) => clamp(p - 1));
  const goToNext = () => setCurrentHeroIndex((p) => clamp(p + 1));

  if (!current || !heroList.length) {
    return null;
  }

  const featureIcons = [Star, Sparkles, Zap];

  return (
    <section 
      className="relative h-full w-full overflow-hidden rounded-3xl border-2 mt-2"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
      }}
    >
      {/* Animated Top Border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 z-30"
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
        className="absolute top-0 right-0 w-96 h-96 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
        }}
      />

      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.url}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px) scale(1.05)`,
            }}
          >
            <img
              src={current.url}
              alt={current.slogan}
              className="w-full h-full object-cover"
              style={{ 
                opacity: imageLoaded ? 1 : 0,
                filter: 'brightness(1) saturate(1.15)',
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/30 to-slate-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/50" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content - Two Column Layout */}
      <div className="relative z-10 h-full flex items-center px-8 sm:px-12 lg:px-16 py-6 sm:py-8">
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Left Side - Title & Description */}
          <motion.div
            key={current.slogan}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 max-w-xl"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-2xl backdrop-blur-xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.15))',
                border: '1px solid rgba(96, 165, 250, 0.3)',
              }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(96, 165, 250, 0.5)' }}
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span className="text-xs font-bold text-white tracking-wider uppercase">Öne Çıkan</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {current.slogan}
              </span>
            </h1>

            {/* Feature Pills - Under Title */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {[current.short1, current.short2, current.short3].map((text, idx) => {
                if (!text) return null;
                const Icon = featureIcons[idx];
                const colors = ['blue', 'purple', 'pink'];
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ x: 3, borderColor: 'rgba(96, 165, 250, 0.5)' }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-xl border cursor-pointer"
                    style={{
                      background: 'rgba(30, 41, 59, 0.5)',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                    }}
                  >
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))`,
                        border: '1px solid rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <Icon className={`w-3.5 h-3.5 text-${colors[idx]}-300`} />
                    </div>
                    <span className="text-xs font-medium text-white">{text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link to="/oyunlar">
                <motion.button
                  className="group relative font-bold text-white py-3.5 px-6 rounded-xl overflow-hidden flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                  }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <Rocket className="w-5 h-5 relative z-10" />
                  <span className="text-sm relative z-10">HEMEN BAŞLA</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/rehber">
                <motion.button
                  className="py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-2 transition-all"
                  style={{
                    border: '2px solid rgba(96, 165, 250, 0.4)',
                    color: 'rgba(96, 165, 250, 1)',
                    background: 'rgba(59, 130, 246, 0.1)',
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    background: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(96, 165, 250, 0.6)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-5 h-5" />
                  <span>DETAYLAR</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Features Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden lg:block"
          >
            <div 
              className="p-6 rounded-2xl backdrop-blur-xl border space-y-4"
              style={{
                background: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              {[
                { icon: Zap, title: 'Anında Teslimat', desc: 'Ödeme sonrası hemen teslim', color: 'text-yellow-400' },
                { icon: Star, title: 'Orijinal Ürünler', desc: 'Lisanslı ve güvenilir', color: 'text-blue-400' },
                { icon: Sparkles, title: '7/24 Destek', desc: 'Her zaman yanınızdayız', color: 'text-pink-400' },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.2))',
                      border: '1px solid rgba(96, 165, 250, 0.3)',
                    }}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-gray-400 text-xs">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {heroList.length > 1 && (
        <>
          <motion.button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-lg backdrop-blur-md flex items-center justify-center border"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
            }}
            whileHover={{ 
              scale: 1.1,
              background: 'rgba(59, 130, 246, 0.3)',
              borderColor: 'rgba(96, 165, 250, 0.6)',
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-lg backdrop-blur-md flex items-center justify-center border"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
            }}
            whileHover={{ 
              scale: 1.1,
              background: 'rgba(59, 130, 246, 0.3)',
              borderColor: 'rgba(96, 165, 250, 0.6)',
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>

          {/* Dot Indicators - Bottom Center */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroList.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div 
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: index === currentHeroIndex 
                      ? 'linear-gradient(135deg, #3B82F6, #EC4899)' 
                      : 'rgba(255, 255, 255, 0.3)',
                    boxShadow: index === currentHeroIndex 
                      ? '0 0 12px rgba(59, 130, 246, 0.8)' 
                      : 'none',
                    width: index === currentHeroIndex ? '24px' : '8px',
                  }}
                />
              </motion.button>
            ))}
          </div>

        </>
      )}

    </section>
  );
}