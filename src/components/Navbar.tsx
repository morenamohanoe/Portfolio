import { motion, useScroll, useSpring } from 'motion/react';

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
      <motion.div className="w-full h-[3px] bg-blue-500 origin-left" style={{ scaleX }} />
      <div className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto backdrop-blur-md bg-[#050505]/60 border-b border-white/5">
        <div className="font-display font-bold text-2xl tracking-tighter">M.</div>
        <a href="mailto:morenamohanoe@gmail.com" className="text-sm px-5 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full font-medium">Collaborate</a>
      </div>
    </header>
  );
}
