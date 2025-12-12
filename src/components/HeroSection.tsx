import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Eye, ArrowRight, Play, Pause, Sparkles, Zap, Star } from "lucide-react";

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
  const clamp = (i: number, l: number) => ((i % l) + l) % l;
  const current = heroList[currentHeroIndex];

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isPlaying || heroList.length <= 1) return;
    startTimeRef.current = performance.now();
    if (progressRef.current) {
      progressRef.current.style.setProperty("--p", "0");
    }

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / DURATION);
      if (progressRef.current) {
        progressRef.current.style.setProperty("--p", t.toString());
      }
      if (t >= 1) {
        setCurrentHeroIndex((p) => clamp(p + 1, heroList.length));
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, currentHeroIndex, heroList.length, setCurrentHeroIndex]);

  const goToSlide = (index: number) => {
    setCurrentHeroIndex(clamp(index, heroList.length));
  };

  const goToPrev = () => setCurrentHeroIndex((p) => clamp(p - 1, heroList.length));
  const goToNext = () => setCurrentHeroIndex((p) => clamp(p + 1, heroList.length));

  if (!current || !heroList.length) {
    return null;
  }

  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden rounded-3xl">
      {/* Animated Background with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.url}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
        >
          <motion.img
            src={current.url}
            alt={current.slogan}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: imageLoaded ? 0.85 : 0,
              transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(1.05)`
            }}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          
          {/* Floating Orbs - More Subtle */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]"
              animate={{
                x: [0, 80, 0],
                y: [0, -40, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px]"
              animate={{
                x: [0, -60, 0],
                y: [0, 60, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Floating Particles - Reduced */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Content - Better Proportions */}
      <div className="relative z-10 text-center max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Badge - Smaller and More Proportional */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full backdrop-blur-xl border"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.15))',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)',
          }}
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-300" />
          <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">
            Premium Gaming
          </span>
          <Zap className="h-3.5 w-3.5 text-pink-300" />
        </motion.div>

        {/* Headline - Better Proportions */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
        >
          <motion.span 
            className="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 20px rgba(236, 72, 153, 0.3))',
            }}
          >
            {current.slogan}
          </motion.span>
        </motion.h1>

        {/* Feature Pills - Better Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {[current.short1, current.short2, current.short3].filter(Boolean).map((text, i) => (
            <motion.div
              key={i}
              className="px-4 py-2 rounded-xl backdrop-blur-xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
                borderColor: 'rgba(96, 165, 250, 0.5)'
              }}
            >
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-yellow-300" />
                <span className="text-xs sm:text-sm font-semibold text-white">{text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons - Better Proportions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link to="/oyunlar">
            <motion.button
              className="group relative px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.6)' }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="h-4 w-4 sm:h-5 sm:w-5" />
                Keşfet
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>

          <Link to="/rehber">
            <motion.button
              className="group px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-white backdrop-blur-xl border-2"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              }}
              whileHover={{ 
                scale: 1.03,
                background: 'rgba(255, 255, 255, 0.15)',
                borderColor: 'rgba(96, 165, 250, 0.5)',
                boxShadow: '0 8px 28px rgba(96, 165, 250, 0.3)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                Nasıl Çalışır
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Navigation Buttons - Smaller and More Proportional */}
      {heroList.length > 1 && (
        <>
          <motion.button
            onClick={goToPrev}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(96, 165, 250, 0.5)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Önceki slide"
          >
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-white rotate-180 mx-auto" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(96, 165, 250, 0.5)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Sonraki slide"
          >
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-white mx-auto" />
          </motion.button>

          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? "Duraklat" : "Oynat"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 sm:h-5 sm:w-5 text-white mx-auto" />
            ) : (
              <Play className="h-4 w-4 sm:h-5 sm:w-5 text-white mx-auto ml-0.5" />
            )}
          </motion.button>
        </>
      )}

      {/* Dots Indicator - Better Position */}
      {heroList.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroList.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Slide ${index + 1}`}
            >
              <div 
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                  index === currentHeroIndex ? 'bg-blue-400' : 'bg-white/40'
                }`}
                style={{
                  boxShadow: index === currentHeroIndex ? '0 0 12px rgba(59, 130, 246, 0.8)' : 'none',
                }}
              />
              {index === currentHeroIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-400"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Progress Bar - Thinner */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20 bg-white/10">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all"
          style={{
            width: "calc(var(--p,0)*100%)",
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
          }}
        />
      </div>
    </section>
  );
}
