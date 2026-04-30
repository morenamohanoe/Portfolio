import { motion, useScroll, useTransform } from 'motion/react';
import portrait from '@/assets/img/Mo.jpg';

const RevealWord = ({ children, delay }: { children: React.ReactNode, delay: number }) => (
  <span className="inline-block overflow-hidden relative align-bottom pb-2">
    <motion.span
      className="inline-block"
      initial={{ y: "120%", rotateZ: 5 }}
      animate={{ y: 0, rotateZ: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 10]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center pt-20 pb-20 overflow-hidden z-10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:justify-end">
         <div className="w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center max-w-7xl">
        <motion.div style={{ opacity, y }} className="flex flex-col space-y-8 relative z-10">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] text-white">
            <RevealWord delay={0.1}>Irvil</RevealWord> <RevealWord delay={0.2}>Morena</RevealWord><br/>
            <RevealWord delay={0.3}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 block pt-2">Mohanoe.</span>
            </RevealWord>
          </h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="text-gray-400 text-lg md:text-2xl font-sans max-w-lg leading-relaxed font-light"
          >
            Web Developer & IT Business Analyst with over 6 years of experience bridging technical execution with business strategy.
          </motion.p>
        </motion.div>

        <motion.div style={{ y, rotate, opacity }} className="relative max-w-sm mx-auto w-full md:ml-auto md:mr-0 z-20 pointer-events-none">
          {/* EXACT wrapper requested */}
          <div className="relative w-full aspect-square min-h-[16rem] overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-black/50 backdrop-blur-sm">
             <img src={portrait} alt="Morena Mohanoe" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
