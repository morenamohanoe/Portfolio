import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import portrait from '@/assets/img/Mo.jpg';

export default function ImmersiveTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100, mass: 0.8 });

  // Multiple expanding rings instead of just one blurred layer
  const ring1Scale = useTransform(smoothProgress, [0.1, 0.6], [0.8, 50]);
  const ring2Scale = useTransform(smoothProgress, [0.15, 0.7], [0.5, 40]);
  const ring3Scale = useTransform(smoothProgress, [0.2, 0.8], [0.1, 30]);

  const ringOpacity = useTransform(smoothProgress, [0, 0.1, 0.5, 0.8], [0, 1, 1, 0]);
  
  // Background gradient shift
  const bgProgress = useTransform(smoothProgress, [0.4, 0.8], ['#050505', '#0a0a1a']);
  
  const portraitOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const portraitScale = useTransform(smoothProgress, [0, 0.25], [1, 0.5]);
  const portraitY = useTransform(smoothProgress, [0, 0.25], [0, 100]);

  // Dynamic text reveal
  const textOpacity = useTransform(smoothProgress, [0.6, 0.85], [0, 1]);
  const textScale = useTransform(smoothProgress, [0.6, 0.85], [0.5, 1]);
  const textRotateX = useTransform(smoothProgress, [0.6, 0.85], [40, 0]);
  const textBlur = useTransform(smoothProgress, [0.6, 0.85], ["blur(20px)", "blur(0px)"]);

  // Grid background transforms
  const gridScale = useTransform(smoothProgress, [0, 1], [1, 3]);
  const gridRotate = useTransform(smoothProgress, [0, 1], [0, 45]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.2, 0.6, 0.1]);

  return (
    <div ref={containerRef} className="h-[500vh] relative w-full">
      <motion.div 
         className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050505] shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]"
         style={{ backgroundColor: bgProgress }}
      >
        {/* Hyperspace grid lines receding into the distance */}
        <motion.div 
           className="absolute inset-0 z-0"
           style={{
             backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
             backgroundSize: '4rem 4rem',
             scale: gridScale,
             rotateZ: gridRotate,
             opacity: gridOpacity,
             transformOrigin: "center center"
           }}
        />

        {/* Concentric Portal Rings */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none perspective-1000">
          <motion.div 
            style={{ scale: ring1Scale, opacity: ringOpacity }}
            className="absolute rounded-full border border-blue-500/20 w-[40vw] h-[40vw] max-w-[800px] max-h-[800px] shadow-[0_0_100px_rgba(59,130,246,0.2)]"
          />
          <motion.div 
            style={{ scale: ring2Scale, opacity: ringOpacity }}
            className="absolute rounded-full border border-purple-500/30 w-[20vw] h-[20vw] max-w-[400px] max-h-[400px] shadow-[0_0_100px_rgba(168,85,247,0.3)]"
          />
          <motion.div 
            style={{ scale: ring3Scale, opacity: ringOpacity }}
            className="absolute rounded-full border border-pink-500/40 w-[10vw] h-[10vw] max-w-[200px] max-h-[200px] shadow-[0_0_120px_rgba(236,72,153,0.4)] bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-3xl"
          />
        </div>

        {/* Foreground portrait fading out */}
        <motion.div 
          style={{ opacity: portraitOpacity, scale: portraitScale, y: portraitY }} 
          className="z-20 w-48 md:w-64 mx-auto p-4 perspective-1000"
        >
          <div className="relative w-full aspect-square overflow-hidden rounded-full shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10 bg-black">
            <img src={portrait} alt="Portrait Transition" className="absolute inset-0 w-full h-full object-cover grayscale-[40%]" />
          </div>
        </motion.div>

        {/* Deep scroll reveal text */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale, rotateX: textRotateX, filter: textBlur, transformStyle: "preserve-3d" }} 
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none p-4"
        >
          <h2 className="font-display text-[15vw] md:text-[160px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 text-center leading-[0.85]">
            BEYOND
          </h2>
          <h2 className="font-display text-[15vw] md:text-[160px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-center leading-[0.85] mt-2 pb-6 drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]">
            LIMITS.
          </h2>
        </motion.div>
      </motion.div>
    </div>
  );
}
