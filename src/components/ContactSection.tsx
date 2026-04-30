import { motion } from 'motion/react';
import portrait from '@/assets/img/Mo.jpg';
import { Mail, Phone } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-end bg-[#020205] z-10 border-t border-white/5">
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
         <div className="w-[80vw] h-[50vh] bg-blue-600/20 blur-[150px] rounded-full translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 pt-32 pb-12 flex-1 flex flex-col justify-center">
        <motion.div
           animate={{ y: [-10, 10, -10] }}
           transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
           className="mx-auto w-48 md:w-56 mb-12 origin-bottom"
        >
           {/* EXACT WRAPPER REQUIRED */}
           <div className="relative w-full aspect-square min-h-[16rem] overflow-hidden rounded-full shadow-[0_0_50px_rgba(59,130,246,0.2)] border border-white/10 bg-black">
             <img src={portrait} alt="Morena Mohanoe" className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-700" />
           </div>
        </motion.div>

        <motion.div
          initial={{opacity:0, y:40, filter: "blur(10px)"}}
          whileInView={{opacity:1, y:0, filter: "blur(0px)"}}
          viewport={{once:true}}
          transition={{duration: 1, ease: [0.16, 1, 0.3, 1]}}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-10 tracking-tight">
             Ready to build?
          </h2>
        </motion.div>

        <motion.div 
           className="mb-16"
           initial={{opacity:0, scale: 0.9}}
           whileInView={{opacity:1, scale: 1}}
           viewport={{once:true}}
           transition={{duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1]}}
        >
            <a href="mailto:morenamohanoe@gmail.com" className="inline-block relative z-10">
               <MagneticWrapper>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="relative px-10 py-5 bg-white text-black font-semibold rounded-full overflow-hidden text-lg hover:bg-gray-100 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                 >
                    Start Collaboration
                 </motion.button>
               </MagneticWrapper>
            </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-20 w-full">
           <a href="mailto:morenamohanoe@gmail.com" className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors font-sans text-sm md:text-base text-gray-300 hover:text-white">
             <Mail size={18} className="text-blue-400" /> Email
           </a>
           <a href="tel:+27721711052" className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors font-sans text-sm md:text-base text-gray-300 hover:text-white">
             <Phone size={18} className="text-blue-400" /> Phone
           </a>
           <a href="https://wa.me/27721711052" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition group font-sans text-sm md:text-base text-gray-300 hover:text-white">
             <svg className="w-5 h-5 text-gray-400 group-hover:text-[#25D366] group-hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(37,211,102,0)] group-hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.5)]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
             </svg> 
             WhatsApp
           </a>
        </div>

        <footer className="w-full pt-8 border-t border-white/10 text-sm flex flex-col md:flex-row justify-between items-center text-gray-500">
           <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Irvil Morena Mohanoe. Engineering Excellence.</p>
           <a href="https://www.linkedin.com/in/morena-mohanoe-06a96872/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
             LinkedIn Profile
           </a>
        </footer>
      </div>
    </section>
  );
}
