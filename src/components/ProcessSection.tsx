import { motion } from 'motion/react';

export default function ProcessSection() {
  const experiences = [
    {
      role: 'Front End Developer',
      company: 'Studio-88 Group (Aereton)',
      period: 'April 2023 – Present',
      desc: 'Developed and maintained digital storefronts for John Craig, Skipper Bar, and Factory-88. Engineered the Careers88 recruitment portal. Utilized Microsoft 365 Copilot to streamline coding workflows.'
    },
    {
      role: 'Lead Full-Stack Developer',
      company: 'Auraconnect (Independent)',
      period: '2023 – 2024',
      desc: 'Built an AI-driven matching system using TypeScript and Firebase. Integrated PayFast and Google Maps API for a complete user ecosystem.'
    },
    {
      role: 'Web Developer',
      company: 'Interfoto CC',
      period: 'March 2022 – April 2023',
      desc: 'Integrated Pastel Accounting with brand websites via Store Hub API. Developed 6+ brand-specific websites from concept to launch with secure payment gateway integration.'
    },
    {
      role: 'IT Business Analyst',
      company: 'Systems & Process Optimization',
      period: 'Ongoing',
      desc: 'Bridging the gap between technical builds and business strategy. Certified in IT Business Analysis (2024) and specialized in AI Productivity (Microsoft 365 Copilot).'
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-[#070707] z-10 relative border-y border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
         <motion.div
           initial={{ opacity:0, y:30 }}
           whileInView={{ opacity:1, y:0 }}
           viewport={{ once:true, margin:"-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         >
           <h2 className="font-display text-4xl md:text-5xl font-bold mb-20 text-center">Professional Experience</h2>
         </motion.div>

         <div className="space-y-4">
           {experiences.map((exp, i) => (
             <motion.div
               key={exp.company}
               initial={{ opacity:0, y:60, filter: "blur(10px)" }}
               whileInView={{ opacity:1, y:0, filter: "blur(0px)" }}
               viewport={{ once:true, margin:"-50px" }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
               className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-12 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-colors duration-300"
             >
               <div className="md:w-1/3 flex flex-col min-w-[200px]">
                 <span className="text-blue-400 font-mono text-sm mb-2">{exp.period}</span>
                 <h3 className="font-display text-2xl font-bold leading-tight">{exp.company}</h3>
                 <span className="text-white/60 font-sans mt-1 text-sm">{exp.role}</span>
               </div>
               <div className="md:w-2/3 mt-2 md:mt-0 flex items-center">
                 <p className="text-gray-400 text-lg leading-relaxed">{exp.desc}</p>
               </div>
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
}
