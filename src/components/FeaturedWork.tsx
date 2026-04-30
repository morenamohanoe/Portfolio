import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

function ProjectCard({ project, onClick }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const imgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-3%", "3%"]);
  const imgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-3%", "3%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
       ref={ref}
       onClick={onClick}
       onMouseMove={handleMouseMove}
       onMouseLeave={handleMouseLeave}
       whileHover={{ scale: 1.04 }}
       style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
       className="relative group rounded-3xl w-full h-[450px] overflow-hidden bg-[#0A0A0A] border border-white/5 p-8 flex flex-col justify-end transition-colors duration-500 hover:bg-[#0f0f1b] hover:border-white/20 cursor-pointer"
    >
       <motion.div 
         style={{ x: imgX, y: imgY, transformStyle: "preserve-3d", transform: "translateZ(-50px)" }} 
         className="absolute inset-0 z-0 scale-110 opacity-40 group-hover:opacity-70 transition-opacity duration-700"
       >
         <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
       </motion.div>
       
       <div style={{ transform: "translateZ(60px)" }} className="relative z-10 pointer-events-none">
         <h3 className="font-display text-3xl font-bold mb-3">{project.title}</h3>
         <p className="text-gray-400 mb-6 text-lg">{project.description}</p>
         <div className="flex flex-wrap gap-2">
           {project.tags.map((t: string) => <span key={t} className="text-xs font-semibold px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full">{t}</span>)}
         </div>
         <div className="mt-8 pointer-events-auto opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
           <button className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
             View Details
           </button>
         </div>
       </div>
    </motion.div>
  );
}

const projectsData = [
  {
    title: "Studio-88 Trivia",
    description: "Interactive trivia application built for the Studio-88 brand ecosystem.",
    longDescription: "An engaging, interactive trivia application designed to boost customer engagement and brand loyalty within the Studio-88 ecosystem. It features dynamic question delivery and a polished user interface tailored to the brand's aesthetic.",
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    tags: ['Web App', 'Interactive', 'React'],
    gradient: "from-pink-600/40 via-black to-transparent",
    links: [{ label: "Live Play", url: "https://studio88-trivia.com/" }]
  },
  {
    title: "Studio-88 Group",
    description: "Leading e-commerce platforms (John Craig, Skipper Bar, Factory-88) managing high-traffic multi-store ecosystems.",
    longDescription: "A comprehensive digital transformation project for the Aereton group. I developed and managed the primary Magento and WordPress e-commerce storefronts, ensuring high availability and seamless user experiences across John Craig, Skipper Bar, and Factory-88. The infrastructure handles massive daily traffic and extensive product catalogs, requiring deep optimization and robust systems integration.",
    technologies: ['WordPress', 'Magento', 'PHP', 'MySQL', 'REST APIs'],
    tags: ['E-commerce', 'WordPress', 'Magento'],
    gradient: "from-blue-600/40 via-black to-transparent",
    links: [
      { label: "John Craig", url: "https://johncraig.co.za" },
      { label: "Skipper Bar", url: "https://skipperbar.co.za" },
      { label: "Factory-88", url: "https://factory-88.co.za" }
    ]
  },
  {
    title: "Careers88 Portal",
    description: "Engineered the careers recruitment portal, centralizing HR and hiring for the entire Aereton group.",
    longDescription: "I designed and built the Careers88 recruitment portal from the ground up. This system centralized hiring processes for multiple retail brands, integrating with internal HR tools and leveraging modern frontend technologies. I also utilized Microsoft 365 Copilot for intelligent candidate screening and to streamline the technical workflows.",
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Microsoft 365 Copilot'],
    tags: ['HR Tech', 'Systems Integration', 'React'],
    gradient: "from-emerald-600/40 via-black to-transparent",
    links: [{ label: "Careers88", url: "https://careers88.co.za" }]
  },
  {
    title: "Auraconnect AI",
    description: "AI-driven matching engine integrating PayFast payments and Google Maps for seamless service discovery.",
    longDescription: "An independent venture where I architected a full-stack AI matching platform. The application uses intelligent algorithms to pair users to relevant services, features secure PayFast transaction handling for frictionless payments, and deeply integrates the Google Maps API for smooth location-based logistics and tracking.",
    technologies: ['TypeScript', 'Firebase', 'Google Maps API', 'PayFast', 'React', 'Node.js'],
    tags: ['TypeScript', 'Firebase', 'APIs'],
    gradient: "from-purple-600/40 via-black to-transparent",
    links: [{ label: "Auraconnect", url: "https://auraconnect.online" }]
  },
  {
    title: "Interfoto Brands",
    description: "E-commerce automation & Store Hub API integrations merging Pastel Accounting with major brand storefronts.",
    longDescription: "Led the development of 6+ brand-specific e-commerce websites. The critical element of this project was engineering robust, real-time integrations between Pastel Accounting and WooCommerce via the Store Hub API. This ensured completely synced inventory, financial reporting, and order management across multiple retail storefronts.",
    technologies: ['WooCommerce', 'PHP', 'Store Hub API', 'Pastel Accounting', 'JavaScript'],
    tags: ['WooCommerce', 'PHP', 'API Integration'],
    gradient: "from-orange-600/40 via-black to-transparent",
    links: [
      { label: "Interfoto", url: "https://interfoto.co.za/" },
      { label: "Voyager", url: "https://voyagersa.co.za" },
      { label: "Homeguard", url: "https://homeguardsa.co.za" }
    ]
  }
];

export default function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section className="py-24 md:py-40 relative z-10 container mx-auto px-6 max-w-7xl">
       <motion.h2
         initial={{ opacity:0, y:30 }}
         whileInView={{ opacity:1, y:0 }}
         viewport={{ once:true, margin:"-100px" }}
         className="font-display text-4xl md:text-5xl font-bold mb-20 md:mb-24 text-center md:text-left"
       >
         Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Architectures</span>
       </motion.h2>

       <div className="grid md:grid-cols-2 gap-8 md:gap-12" style={{ perspective: "1000px" }}>
         {projectsData.map((proj, idx) => (
           <ProjectCard 
             key={idx} 
             project={proj} 
             onClick={() => setSelectedProject(proj)} 
           />
         ))}
       </div>

       <AnimatePresence>
         {selectedProject && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
               onClick={() => setSelectedProject(null)}
             />
             
             <motion.div
               initial={{ opacity: 0, y: 40, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 20, scale: 0.95 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl pointer-events-auto flex flex-col"
             >
                <div className={`h-32 md:h-48 w-full bg-gradient-to-br ${selectedProject.gradient} opacity-50 absolute top-0 left-0 pointer-events-none`} />
                
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="relative z-10 p-8 md:p-12 mt-12 md:mt-16 bg-gradient-to-b from-transparent to-[#0A0A0A] flex-1">
                  <h3 className="font-display text-3xl md:text-5xl font-bold mb-4">{selectedProject.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.technologies?.map((tech: string) => (
                      <span key={tech} className="text-xs md:text-sm font-medium px-4 py-2 bg-white/5 border border-white/10 rounded-full text-blue-100">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">
                    {selectedProject.longDescription}
                  </p>

                  {selectedProject.links && selectedProject.links.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-6">
                      {selectedProject.links.map((linkItem: any, i: number) => (
                        <a 
                          key={i}
                          href={linkItem.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        >
                          {linkItem.label} <ExternalLink size={16} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
             </motion.div>
           </div>
         )}
       </AnimatePresence>
    </section>
  );
}
