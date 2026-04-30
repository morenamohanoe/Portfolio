import { motion, useScroll } from 'motion/react';

export default function AnimatedStroke() {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="fixed top-0 bottom-0 left-4 md:left-12 w-[1px] z-0 pointer-events-none opacity-50">
      <div className="w-full h-full bg-white/5 relative">
        <motion.div 
          className="absolute top-0 left-[-1px] w-[3px] bg-gradient-to-b from-blue-400 to-purple-600 rounded-full"
          style={{ 
             height: '100%', 
             scaleY: scrollYProgress,
             originY: 0
          }} 
        />
      </div>
    </div>
  );
}
