import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Eye, ArrowRight, Play, Pause, Star } from "lucide-react";

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

  return (
    <section 
      className="relative h-full w-full flex items-center justify-center overflow-hidden rounded-3xl border-2"
      style={{
        border: '2px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Animated Top Border - Like Login Form */}
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

      {/* Diagonal Accent - Like Login Form */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 opacity-20 z-10"
        style={{
          background: 'linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.4))',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
        }}
      />

      {/* Split Background - Photo Left, Gradient Right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.url}
          className="absolute inset-0 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Left Side - Large Photo */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-full lg:w-3/5"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.img
              src={current.url}
              alt={current.slogan}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                opacity: imageLoaded ? 1 : 0,
                transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px) scale(1.05)`,
                filter: 'brightness(1.05) contrast(1.1) saturate(1.1)',
              }}
              onLoad={() => setImageLoaded(true)}
            />
            {/* Subtle overlay on photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </motion.div>

          {/* Right Side - Gradient Background */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-full lg:w-2/5 hidden lg:block"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
            }}
          >
            {/* Animated gradient orbs */}
            <motion.div 
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-[100px]"
              animate={{
                x: [0, -50, 0],
                y: [0, 50, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>

          {/* Diagonal Divider Line */}
          <div 
            className="absolute left-0 lg:left-[60%] top-0 bottom-0 w-1 hidden lg:block"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
            }}
          />
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

      {/* Main Content - Split Layout */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Side - Photo Area (60%) */}
            <div className="lg:col-span-3 relative flex items-center">
              {/* Mobile: Content over photo */}
              <div className="lg:hidden text-center space-y-4 py-8 w-full">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-3xl sm:text-4xl font-black"
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {current.slogan}
                  </span>
                </motion.h1>
              </div>
            </div>

            {/* Right Side - Content (40%) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight hidden lg:block">
                <span 
                  className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                  }}
                >
                  {current.slogan}
                </span>
              </h1>

              {/* Feature Cards */}
              <div className="space-y-2.5">
                {current.short1 && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border-2"
                    style={{
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                        border: '1px solid rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <Star className="h-4 w-4 text-yellow-300" />
                    </div>
                    <span className="text-sm font-semibold text-white">{current.short1}</span>
                  </div>
                )}
                {current.short2 && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border-2"
                    style={{
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                        border: '1px solid rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <Star className="h-4 w-4 text-yellow-300" />
                    </div>
                    <span className="text-sm font-semibold text-white">{current.short2}</span>
                  </div>
                )}
                {current.short3 && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border-2"
                    style={{
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                        border: '1px solid rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <Star className="h-4 w-4 text-yellow-300" />
                    </div>
                    <span className="text-sm font-semibold text-white">{current.short3}</span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/oyunlar" className="flex-1">
                  <button
                    className="group relative w-full px-6 py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.5)',
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Rocket className="h-5 w-5" />
                      Keşfet
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </button>
                </Link>

                <Link to="/rehber" className="flex-1">
                  <button
                    className="group w-full px-6 py-3.5 rounded-xl font-semibold text-sm text-white border-2"
                    style={{
                      background: 'rgba(30, 41, 59, 0.7)',
                      border: '2px solid rgba(59, 130, 246, 0.4)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Eye className="h-5 w-5" />
                      Nasıl Çalışır
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Modern Design */}
      {heroList.length > 1 && (
        <>
          <motion.button
            onClick={goToPrev}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-xl backdrop-blur-xl border-2"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
            whileHover={{ 
              scale: 1.1, 
              borderColor: 'rgba(96, 165, 250, 0.5)',
              boxShadow: '0 12px 32px rgba(59, 130, 246, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Önceki slide"
          >
            <ArrowRight className="h-6 w-6 text-white rotate-180 mx-auto" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-xl backdrop-blur-xl border-2"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
            whileHover={{ 
              scale: 1.1,
              borderColor: 'rgba(96, 165, 250, 0.5)',
              boxShadow: '0 12px 32px rgba(59, 130, 246, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Sonraki slide"
          >
            <ArrowRight className="h-6 w-6 text-white mx-auto" />
          </motion.button>

          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-xl backdrop-blur-xl border-2 flex items-center justify-center"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
            whileHover={{ 
              scale: 1.1,
              borderColor: 'rgba(96, 165, 250, 0.5)',
              boxShadow: '0 12px 32px rgba(59, 130, 246, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={isPlaying ? "Duraklat" : "Oynat"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white" />
            )}
          </motion.button>
        </>
      )}

      {/* Dots Indicator - Modern Design */}
      {heroList.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {heroList.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Slide ${index + 1}`}
            >
              <div 
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all ${
                  index === currentHeroIndex ? 'bg-blue-400' : 'bg-white/40'
                }`}
                style={{
                  boxShadow: index === currentHeroIndex 
                    ? '0 0 16px rgba(59, 130, 246, 0.8), 0 0 8px rgba(59, 130, 246, 0.6)' 
                    : 'none',
                  border: index === currentHeroIndex ? '2px solid rgba(96, 165, 250, 0.5)' : '2px solid transparent',
                }}
              />
              {index === currentHeroIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: 'rgba(96, 165, 250, 0.6)',
                  }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Progress Bar - Modern Design */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 z-20"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <motion.div
          ref={progressRef}
          className="h-full transition-all"
          style={{
            width: "calc(var(--p,0)*100%)",
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 10px rgba(236, 72, 153, 0.6)',
          }}
        />
      </div>
    </section>
  );
}
