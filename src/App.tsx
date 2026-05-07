import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Scene from './components/Scene';
import { cn } from './lib/utils';
import { X, MoveRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  { 
    id: 1,
    name: 'John Craig', 
    url: 'johncraig.co.za', 
    desc: 'Men\'s fashion e-commerce platform',
    fullDesc: 'A robust Magento platform built to handle men\'s fashion, formal wear, and accessories. Features seamless checkout experiences, robust inventory synchronization, and tailored campaigns.',
    tech: ['Magento', 'PHP', 'Tailwind', 'MySQL'],
    img: 'https://lh3.googleusercontent.com/d/1P6MrezCzmD7f8lrzNEkk1SLyhtTitqym=s1000'
  },
  { 
    id: 2,
    name: 'Skipper Bar', 
    url: 'skipperbar.co.za', 
    desc: 'Urban streetwear retail storefront',
    fullDesc: 'A high-performance Magento storefront focusing on urban streetwear and exclusive footwear releases. Integrated with legacy supply chain systems, delivering a highly optimized mobile-first purchasing journey.',
    tech: ['Magento', 'PHP', 'MySQL'],
    img: 'https://lh3.googleusercontent.com/d/1BU-VaSfjo-o8QZo8lQ5fh8i5I7ZWSxG5=s1000'
  },
  { 
    id: 3,
    name: 'Voyager', 
    url: 'voyagersa.co.za', 
    desc: 'Electronics & tech accessories catalog',
    fullDesc: 'A WordPress-based catalog featuring drones, action cameras, tablet cases, and travel accessories. It heavily focuses on streamlined product discovery and rich multimedia galleries.',
    tech: ['WordPress', 'PHP', 'WooCommerce', 'MySQL'],
    img: 'https://lh3.googleusercontent.com/d/1n4tdhXoop2zGlecSltkMAcyeul6CbbeI=s1000'
  },
  { 
    id: 4,
    name: 'Careers88', 
    url: 'careers88.co.za', 
    desc: 'Studio 88 Group recruitment portal',
    fullDesc: 'A specialized WordPress platform streamlining talent acquisition and applications for the Studio 88 Group. Integrates role-based job boards and internal HR routing.',
    tech: ['WordPress', 'PHP', 'MySQL'],
    img: 'https://lh3.googleusercontent.com/d/18orjqRIvMlh_F9PJBbhgLPva25IU3xOY=s1000'
  },
  { 
    id: 5,
    name: 'Studio 88 Trivia', 
    url: 'studio88-trivia.com', 
    desc: 'Interactive engagement experience',
    fullDesc: 'A gamified digital experience designed to increase brand engagement and customer retention through interactive trivia mechanics.',
    tech: ['React', 'Node.js', 'Redis', 'Tailwind', 'Supabase'],
    img: 'https://lh3.googleusercontent.com/d/1i1syq5GUbmDAe8Z3-vCht61J8Jt3PU7Z=s1000'
  },
  { 
    id: 6,
    name: 'Factory 88', 
    url: 'factory-88.co.za', 
    desc: 'Brand outlet digital storefront',
    fullDesc: 'A WordPress-powered showcase for value-conscious shoppers offering major brands like Nike, Adidas, and Puma at factory prices. Provides a clear path to physical store locations.',
    tech: ['WordPress', 'PHP', 'MySQL'],
    img: 'https://lh3.googleusercontent.com/d/1SpycpiFTR3UKJiRyDNWoMHwaYmFNUKhW=s1000'
  },
  { 
    id: 7,
    name: 'Interfoto', 
    url: 'interfoto.co.za', 
    desc: 'B2B distribution & OEM portal',
    fullDesc: 'A specialized WordPress B2B hub serving as the digital face for South Africa\'s leading retail distributor. It showcases supply chain capabilities, retail marketing, and OEM services.',
    tech: ['WordPress', 'PHP', 'MySQL'],
    img: 'https://lh3.googleusercontent.com/d/1RruXrO4fyzN-1e7vYiMimbbOyLAByPa9=s1000'
  },
  { 
    id: 8,
    name: 'Homeguard SA', 
    url: 'homeguardsa.co.za', 
    desc: 'Security systems catalog',
    fullDesc: 'A comprehensive WordPress product platform for high-end security hardware, including 1080p full HD systems, wireless camera kits, and heat-sensing tech.',
    tech: ['WordPress', 'WooCommerce', 'PHP'],
    img: 'https://lh3.googleusercontent.com/d/1i0Aez_JjBGFXxQwmarZM6X8SLxpWkHbG=s1000'
  }
];

type Project = typeof projects[0];

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      if (Math.random() > 0.96) { // Occasional scramble
        const scrambled = text.split('').map((char, i) => {
          if (char === ' ') return char;
          return Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : char;
        }).join('');
        setDisplayText(scrambled);
        
        setTimeout(() => {
          setDisplayText(text);
        }, 100 + Math.random() * 200);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span className="irvil-text" data-text={text}>{displayText}</span>;
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && outlineRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        outlineRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={cn(
          "alien-cursor hidden lg:block",
          isHovering && "scale-150 bg-[#ff00cc] shadow-[0_0_20px_#ff00cc]"
        )} 
      />
      <div 
        ref={outlineRef} 
        className={cn(
          "alien-cursor-outline hidden lg:block",
          isHovering && "scale-[1.8] border-[#ff00cc] opacity-60"
        )}
      >
        <div className="alien-cursor-orbit" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="alien-cursor-bracket top-0 left-0 border-t border-l" />
            <div className="alien-cursor-bracket top-0 right-0 border-t border-r" />
            <div className="alien-cursor-bracket bottom-0 left-0 border-b border-l" />
            <div className="alien-cursor-bracket bottom-0 right-0 border-b border-r" />
        </div>
      </div>
    </>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLUListElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const l = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    setLenis(l);

    l.on('scroll', (e: any) => {
      scrollYRef.current = e.animatedScroll;
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      l.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => l.raf(time * 1000));
      l.destroy();
    };
  }, []);

  // Handle Modal Scroll and Keyboard
  useEffect(() => {
    if (isModalOpen || isProfileModalOpen) {
      lenis?.stop();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
          setIsProfileModalOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      lenis?.start();
    }
  }, [isModalOpen, isProfileModalOpen, lenis]);

  useGSAP(() => {
    // Reveal Animations for Headings
    const revealElements = document.querySelectorAll('.text-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Horizontal Scroll for Projects (Beat 4)
    if (horizontalSectionRef.current && horizontalWrapperRef.current) {
      const getScrollAmount = () => {
        let horizontalWidth = horizontalWrapperRef.current?.scrollWidth || 0;
        return -(horizontalWidth - window.innerWidth + 100);
      };

      const tween = gsap.to(horizontalWrapperRef.current, {
        x: getScrollAmount,
        ease: 'none'
      });

      ScrollTrigger.create({
        trigger: horizontalSectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }

    // Beat 5: Contact Reveal
    const beat5 = document.querySelector('#connect');
    if (beat5) {
      const beat5Elements = beat5.querySelectorAll('.beat5-reveal');
      gsap.fromTo(beat5Elements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: beat5,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full alien-hex-bg text-white font-sans selection:bg-[#00ffcc] selection:text-black min-h-screen cursor-hidden">
      <CustomCursor />
      {/* HUD Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        <div className="absolute inset-0 alien-hud-grid opacity-10" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent opacity-80" />
        <div className="absolute inset-0 glitch-overlay" />
        
        {/* Corner Brackets */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#00ffcc]/30" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#00ffcc]/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#00ffcc]/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#00ffcc]/30" />
      </div>

      {/* Sticky Navigation */}
      <nav aria-label="Main Navigation" className="fixed top-8 left-1/2 -translate-x-1/2 z-70 flex items-center gap-4 md:gap-8 px-8 py-2 bg-black/60 backdrop-blur-xl border border-[#00ffcc]/20 rounded-sm shadow-[0_0_30px_rgba(0,255,204,0.1)]">
         <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00ffcc] to-transparent" />
         
         <button 
           onClick={() => setIsProfileModalOpen(true)}
           aria-label="Open profile"
           className="relative group p-1"
         >
           <div className="absolute inset-0 bg-[#00ffcc] opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
           <div className="w-10 h-10 rounded-sm overflow-hidden border border-white/10 bg-[#111] transition-all group-hover:border-[#00ffcc] alien-button">
              <img src="https://lh3.googleusercontent.com/d/1CURRQ3n7azlyyagM70or7hfF7wG77z4k=s1000" alt="Morena Mohanoe portrait" className="w-full h-full object-cover grayscale brightness-125" />
           </div>
         </button>

         <div className="flex items-center gap-4 md:gap-12 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400">
            <button onClick={() => lenis?.scrollTo('#work')} className="alien-nav-item py-4 hover:text-white transition-colors">Work</button>
            <button onClick={() => lenis?.scrollTo('#process')} className="alien-nav-item py-4 hover:text-white transition-colors">Process</button>
            <button onClick={() => lenis?.scrollTo('#connect')} className="alien-nav-item py-4 hover:text-white transition-colors">Contact</button>
         </div>
      </nav>

      <Scene scrollY={scrollYRef} />
      
      {/* Heavy z-index container so text overlays the WebGL canvas safely */}
      <main className="relative z-10 mx-auto w-full">
        
        {/* BEAT 1: The Neural Core (Hero) */}
        <section className="h-screen w-full flex flex-col items-center justify-center relative px-6 overflow-hidden">
          {/* Central Alien Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00ffcc]/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
          
          <div className="overflow-hidden mb-4 animate-text-float relative p-12">
            <h1 className="text-reveal font-display tracking-tighter text-[15vw] leading-[0.8] uppercase font-bold text-center">
              <ScrambleText text="IRVIL" />
            </h1>
            {/* HUD Bracket Decoration */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#00ffcc]/50" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#00ffcc]/50" />
          </div>
          
          <div className="overflow-hidden mt-6">
            <div className="text-reveal flex items-center gap-6 text-[10px] md:text-sm font-mono tracking-[0.5em] text-[#00ffcc] uppercase bg-black/40 px-8 py-3 border border-[#00ffcc]/10 backdrop-blur-sm alien-button">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] alien-glow" />
              Digital Architect // Systems Lead
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff00cc] alien-glow [animation-delay:1s]" />
            </div>
          </div>

          {/* Bottom HUD Detail */}
          <div className="absolute bottom-12 left-6 right-6 md:left-1/2 md:-translate-x-1/2 flex items-center justify-between md:justify-center md:gap-8 text-[8px] md:text-[9px] font-mono text-gray-500 uppercase tracking-widest px-6 md:px-10 py-4 border-x border-[#00ffcc]/20 bg-black/20">
             <div className="flex items-center gap-2">
               <span className="opacity-40 hidden md:inline">Status:</span>
               <span className="text-[#00ffcc] animate-pulse">Live</span>
             </div>
             <span className="opacity-20">|</span>
             <div className="flex items-center gap-2">
               <span className="opacity-40 hidden md:inline">Load:</span>
               <span className="text-white">Opt</span>
             </div>
             <span className="opacity-20">|</span>
             <div className="flex items-center gap-2">
               <span className="opacity-40 hidden md:inline">Sys:</span>
               <span className="text-[#ff00cc]">AW-v2</span>
             </div>
          </div>
        </section>

        {/* BEAT 2: The Scale (Experience) */}
        <section className="min-h-screen w-full flex items-center px-6 md:px-24 bg-black/20 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00ffcc]/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="max-w-5xl w-full mx-auto py-32 relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00ffcc]" />
              <span className="font-mono text-[10px] tracking-[0.5em] text-[#00ffcc] uppercase">Achievement_Log_v26</span>
            </div>
            
            <div className="overflow-hidden mb-12">
              <h2 className="text-reveal font-display text-4xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[1] uppercase">
                6+ <span className="text-gray-600">YEARS</span> <br className="md:hidden" /> OF <br/>
                <span className="text-[#ff00cc] italic">EVOLUTION.</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-16 md:mt-32">
              <div className="space-y-6 md:space-y-10">
                <div className="overflow-hidden">
                  <p className="text-reveal text-lg md:text-xl font-light text-gray-400 leading-relaxed border-l-2 border-[#00ffcc]/30 pl-6 md:pl-8">
                    Orchestrating high-load neural commerce networks and leading technical deployments for apex retail entities.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 border border-[#00ffcc]/20 flex items-center justify-center alien-button bg-black/40">
                    <div className="w-2 h-2 bg-[#00ffcc] alien-glow" />
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase flex flex-col justify-center">
                    <span>Hardware Integration: Complete</span>
                    <span className="text-[#00ffcc]">Software Sync: Active</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {['Studio-88', 'Interfoto'].map((brand, i) => (
                  <div key={i} className="overflow-hidden group">
                     <div className="text-reveal font-display text-4xl md:text-6xl border-b border-white/5 py-6 flex items-baseline justify-between hover:border-[#00ffcc]/30 transition-colors">
                       <span className="group-hover:translate-x-4 transition-transform duration-500">{brand}</span>
                       <span className="font-mono text-[10px] text-gray-600">ID.202{i+1}</span>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BEAT 3: The Intelligence (AI & Logic) */}
        <section id="process" className="min-h-screen w-full flex items-center px-6 md:px-24 relative">
          {/* Scanning lines decorative */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ffcc]/5 to-transparent h-px w-full top-1/4 animate-[scan_8s_linear_infinite]" />
          
          <div className="max-w-6xl w-full mx-auto py-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
              <div className="overflow-hidden">
                <h2 className="text-reveal font-display text-4xl md:text-8xl font-bold uppercase tracking-tight">
                  <span className="text-[#00ffcc]">MY</span><br/>PROCESS.
                </h2>
              </div>
              <div className="w-full md:w-1/3 text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed border-l-2 border-[#00ffcc]/30 pl-6">
                A structured methodology for building high-performance digital solutions.
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { step: '01', title: 'DISCOVERY', detail: 'Analyzing brand architecture and user behavior to set a strong foundation.' },
                { step: '02', title: 'STRATEGY', detail: 'Mapping technical requirements to a future-proof, scalable digital roadmap.' },
                { step: '03', title: 'DESIGN', detail: 'Crafting immersive user interfaces with a focus on aesthetics and performance.' },
                { step: '04', title: 'BUILD', detail: 'Developing high-load systems using modern frameworks and optimized logic.' },
                { step: '05', title: 'LAUNCH', detail: 'Ensuring a seamless deployment into the global digital landscape.' }
              ].map((item, idx) => (
                <div key={idx} className="overflow-hidden p-2 -m-2">
                  <div className="text-reveal border border-white/5 bg-black/40 backdrop-blur-md p-6 rounded-sm alien-border hover:bg-[white]/[0.02] hover:border-[#00ffcc]/50 shadow-2xl z-20 relative transition-all duration-500 group flex flex-col h-full">
                     <span className="text-[#00ffcc] font-mono text-[10px] mb-6 block tracking-widest">MODULE.{item.step}</span>
                     <h3 className="font-display text-2xl mb-4 group-hover:text-[#00ffcc] text-white transition-colors font-medium tracking-tight">
                       {item.title}
                     </h3>
                     <p className="text-gray-500 font-light text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                       {item.detail}
                     </p>
                     
                     {/* Decorative Node */}
                     <div className="mt-auto pt-8 flex items-center gap-2">
                       <div className="h-[1px] flex-grow bg-white/10" />
                       <div className="w-1 h-1 bg-[#00ffcc] rounded-full group-hover:animate-ping" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEAT 4: The Ecosystem (Projects Gallery - Horizontal Scroll) */}
        <section id="work" ref={horizontalSectionRef} className="h-screen w-full flex flex-col justify-center overflow-hidden bg-transparent relative">
          <div className="absolute top-0 right-0 w-[400px] h-full bg-[#ff00cc]/5 blur-[100px] -z-10" />
          
          <div className="px-6 md:px-24 mb-6 md:mb-12 mt-20 md:mt-32 shrink-0">
             <div className="overflow-hidden py-10 md:py-20 -my-10 md:-my-20 px-2 -mx-2">
               <div className="flex items-center gap-6 mb-4">
                 <div className="w-12 md:w-16 h-px bg-[#00ffcc]" />
                 <span className="text-[10px] md:text-xs font-mono tracking-widest text-[#00ffcc]">PROJECT_GALLERY</span>
               </div>
               <h2 className="text-reveal font-display text-4xl md:text-7xl tracking-tight text-white uppercase font-bold leading-[0.9]">
                 SELECTED-<br/><span className="text-[#00ffcc] italic">PROJECTS</span>
               </h2>
             </div>
          </div>
          
          <div className="flex pl-6 md:pl-24">
            <ul ref={horizontalWrapperRef} className="flex gap-12 items-center pb-24 pr-24 list-none">
              {projects.map((proj, i) => (
                <li key={i}>
                  <article 
                    onClick={() => openModal(proj)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(proj);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${proj.name} project`}
                    aria-haspopup="dialog"
                    className="w-[85vw] md:w-[40vw] shrink-0 group relative cursor-pointer transition-all duration-700 ease-out hover:scale-[1.02] hover:-translate-y-4 p-6 md:p-8 rounded-[2rem] bg-[#050505] border border-white/5 hover:border-transparent alien-border alien-border-glow shadow-2xl z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffcc] overflow-hidden"
                  >
                    {/* Alien Background Texture & Holographic Effects */}
                    <div className="absolute inset-0 iridescent-bg opacity-30 group-hover:opacity-60 transition-all duration-700 pointer-events-none" />
                    <div className="absolute inset-0 card-organic-bg pointer-events-none" />
                    <div className="holographic-overlay" />
                    
                    {/* Scanning Light Strip (Vertical) */}
                    <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00ffcc] to-transparent left-0 opacity-0 group-hover:opacity-40 group-hover:animate-[scan-h_2s_linear_infinite] pointer-events-none" />
                    
                    {/* Decorative Alien Nodes */}
                    <div className="absolute top-4 right-4 flex gap-1 pointer-events-none">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] alien-glow" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff00cc] alien-glow [animation-delay:1s]" />
                    </div>

                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0a] rounded-2xl mb-8 flex items-center justify-center border border-white/10 group-hover:border-[#00ffcc]/30 transition-all duration-700 ease-out shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#010101] transition-transform duration-1000 ease-out group-hover:scale-110" />
                      
                      {/* The Website Image with creative filters */}
                      <img 
                        loading="lazy"
                        src={proj.img}
                        alt={`${proj.name} - Digital architectural showcase`}
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-40 grayscale contrast-150 mix-blend-luminosity group-hover:opacity-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:mix-blend-normal transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                      />
                      
                      {/* Alien scanning effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ffcc]/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_3s_linear_infinite] pointer-events-none" />
                    </div>
                    
                    <div className="relative flex justify-between items-end">
                      <div className="max-w-[70%]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px w-8 bg-[#00ffcc]/50 group-hover:w-16 transition-all duration-700" />
                          <span className="text-[10px] font-mono text-[#00ffcc] uppercase tracking-[0.2em] opacity-60">Entity.0{i+1}</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-display font-medium mb-3 tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                          {proj.name}
                        </h3>
                        <p className="text-gray-400 font-light text-lg leading-relaxed">{proj.desc}</p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-4 overflow-hidden">
                        <div className="hidden md:flex opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 items-center justify-center w-40 h-14 rounded-full border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out shrink-0 overflow-hidden relative">
                           <span className="text-xs font-bold uppercase tracking-widest z-10">Access Data</span>
                           <div className="absolute inset-0 bg-[#00ffcc] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                        {/* Mobile version */}
                        <div className="md:hidden w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 active:bg-[#00ffcc] active:text-black transition-all duration-300">
                           <ArrowUpRight strokeWidth={2} className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* BEAT 5: The Contact (Finality) */}
        <section id="connect" className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 pb-24 overflow-hidden">
          {/* Background Flare */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-[#00ffcc]/10 to-transparent -z-10" />
          
          <div className="max-w-5xl w-full text-center space-y-20 relative">
            <div className="overflow-hidden p-2 flex flex-col items-center gap-8">
               <div className="flex items-center gap-4 mb-2">
                 <div className="h-px w-8 md:w-12 bg-[#00ffcc]" />
                 <span className="text-[9px] md:text-[10px] font-mono tracking-[0.4em] text-[#00ffcc] uppercase">Initialising...</span>
                 <div className="h-px w-8 md:w-12 bg-[#00ffcc]" />
               </div>
               <h2 className="beat5-reveal font-display text-5xl md:text-[10rem] tracking-tighter leading-none uppercase text-center font-bold">
                 LET'S <span className="text-[#00ffcc]">CONNECT</span>.
               </h2>
               <p className="beat5-reveal max-w-2xl text-center text-gray-400 font-light text-base md:text-xl leading-relaxed">
                 Open for collaborations on the next generation of digital excellence. Reach out.
               </p>
            </div>
            
            <div className="beat5-reveal w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ffcc]/30 to-transparent relative shadow-[0_0_20px_rgba(0,255,204,0.2)]" />
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left bg-white/[0.02] p-8 md:p-12 rounded-sm border border-white/5 backdrop-blur-md alien-border">
               <div className="overflow-hidden">
                 <div className="beat5-reveal flex flex-col gap-4">
                   <div className="flex items-center justify-center md:justify-start gap-3">
                     <div className="w-1.5 h-1.5 bg-[#00ffcc] rounded-full" />
                     <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">Location</span>
                   </div>
                   <span className="text-lg md:text-xl font-light text-white">Sharpeville, GP_ZA</span>
                 </div>
               </div>
               <div className="overflow-hidden">
                 <div className="beat5-reveal flex flex-col gap-4">
                   <div className="flex items-center justify-center md:justify-start gap-3">
                     <div className="w-1.5 h-1.5 bg-[#00ffcc] rounded-full" />
                     <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">Call_Me</span>
                   </div>
                   <a href="tel:0721711052" className="text-lg md:text-xl font-light hover:text-[#00ffcc] transition-colors">
                     +27 72 171 1052
                   </a>
                 </div>
               </div>
               <div className="overflow-hidden">
                 <div className="beat5-reveal flex flex-col gap-4 items-center md:items-end">
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-[#00ffcc] rounded-full" />
                     <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">Email_Me</span>
                   </div>
                   <a href="mailto:morenamohanoe@gmail.com" className="text-lg md:text-xl font-light hover:text-[#00ffcc] transition-colors flex items-center gap-3">
                     Send Message
                     <ArrowUpRight className="w-5 h-5 text-[#00ffcc]" />
                   </a>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="beat5-reveal absolute bottom-8 left-8 text-[10px] text-gray-500 font-mono tracking-widest flex items-center gap-4">
            <span className="opacity-40">CRC_SHA-256</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span>© {new Date().getFullYear()} IRVIL MOHANOE</span>
          </div>
          <div className="beat5-reveal absolute bottom-8 right-8 text-[10px] text-[#00ffcc] font-mono tracking-widest">
            STABLE_BUILD_v2.1.04
          </div>
        </section>

        {/* Project Modal */}
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-500",
            isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={closeModal}
        >
          <div 
            className={cn(
              "bg-black/95 border border-[#00ffcc]/40 p-1 md:p-1 max-w-2xl w-full relative transition-all duration-700 alien-modal-shape shadow-[0_0_150px_rgba(0,255,204,0.15)] overflow-hidden",
              isModalOpen ? "animate-beam-in" : "scale-90 opacity-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal HUD Elements */}
            <div className="absolute inset-0 iridescent-bg opacity-10 pointer-events-none" />
            <div className="absolute inset-0 holographic-overlay opacity-20" />
            <div className="absolute inset-0 scanner-v-overlay pointer-events-none opacity-5" />
            
            {/* Top Bar Decoration */}
            <div className="h-8 bg-[#00ffcc]/10 border-b border-[#00ffcc]/20 flex items-center justify-between px-6">
              <div className="flex gap-1.5">
                <div className="w-1 h-1 bg-[#00ffcc] rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-[#00ffcc] rounded-full animate-pulse [animation-delay:0.2s]" />
                <div className="w-1 h-1 bg-[#00ffcc] rounded-full animate-pulse [animation-delay:0.4s]" />
              </div>
              <span className="text-[8px] font-mono tracking-[0.4em] text-[#00ffcc] uppercase opacity-50">Authorized_Access_v2.1</span>
              <button 
                onClick={closeModal}
                aria-label="Close"
                className="text-gray-500 hover:text-[#ff00cc] transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 md:p-10 relative">
              {selectedProject && (
                <div className="grid md:grid-cols-12 gap-8 md:gap-10">
                  <div className="md:col-span-12">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <div className="h-[2px] w-8 md:w-12 bg-[#ff00cc]" />
                      <span className="text-[8px] md:text-[10px] font-mono tracking-[0.2em] md:tracking-[0.3em] text-[#ff00cc] uppercase">Project_Details</span>
                    </div>
                    <h3 id="modal-title" className="font-display text-3xl md:text-6xl font-bold mb-3 md:mb-4 tracking-tighter uppercase leading-none">
                      {selectedProject.name}
                    </h3>
                  </div>

                  <div className="md:col-span-5 space-y-6 md:space-y-8">
                    <div className="relative aspect-video md:aspect-square bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/10 group">
                      <img src={selectedProject.img} alt={`${selectedProject.name} - Case study visual representation`} className="w-full h-full object-cover grayscale brightness-125" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-[8px] font-mono text-[#00ffcc] mb-1 opacity-60">VISUAL_THUMBNAIL</div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00ffcc] w-2/3 animate-[scan-h_3s_linear_infinite]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div className="space-y-6">
                      <p className="text-gray-400 text-xs md:text-base leading-relaxed font-light border-l-2 border-[#00ffcc]/30 pl-5 md:pl-6">
                        {selectedProject.fullDesc}
                      </p>
                      
                      <div className="space-y-3 md:space-y-4">
                        <h4 className="text-[7px] md:text-[8px] font-mono tracking-[0.4em] uppercase text-gray-500">Requirements</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((t, idx) => (
                            <span key={idx} className="px-2 py-1 md:px-3 md:py-1.5 text-[7px] md:text-[9px] font-mono border border-white/10 text-gray-400 uppercase tracking-widest hover:border-[#ff00cc]/50 transition-colors">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 md:pt-8 flex items-center justify-between">
                      <a 
                        href={`https://${selectedProject.url.replace('https://', '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 md:gap-4 py-2.5 px-6 md:py-3 md:px-8 bg-white text-black font-bold uppercase tracking-widest text-[9px] md:text-[10px] alien-button hover:bg-[#00ffcc] transition-colors"
                      >
                        Launch
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                      <div className="text-[8px] md:text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                        ID: 0x{selectedProject.id}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Bottom Accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#00ffcc]/30 to-transparent" />
          </div>
        </div>

        {/* Profile Modal */}
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Profile image"
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center p-8 md:p-12 bg-black/80 backdrop-blur-md transition-all duration-500",
            isProfileModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div 
            className={cn(
              "relative max-w-sm md:max-w-md w-full flex items-center justify-center transition-all duration-700 alien-modal-shape p-px bg-[#00ffcc]/30 overflow-hidden shadow-[0_0_80px_rgba(0,255,204,0.1)]",
              isProfileModalOpen ? "animate-beam-in" : "scale-90 opacity-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 scanner-v-overlay opacity-20 pointer-events-none" />
            
            {/* Modal HUD accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#00ffcc]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#00ffcc]" />

            <button 
              onClick={() => setIsProfileModalOpen(false)}
              aria-label="Terminate Signal"
              className="absolute top-4 right-4 text-white/50 hover:text-[#ff00cc] transition-colors z-20 p-2 focus-visible:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-[#050505] w-full h-full relative p-6 md:p-8">
              <div className="relative aspect-[4/5] overflow-hidden border border-white/5 alien-modal-shape">
                <img 
                  src="https://lh3.googleusercontent.com/d/1CURRQ3n7azlyyagM70or7hfF7wG77z4k=s1000" 
                  alt="Morena Mohanoe large portrait" 
                  className="w-full h-full object-cover grayscale brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Scanning line */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00ffcc]/20 to-transparent h-px w-full top-0 animate-[scan_4s_linear_infinite]" />
              </div>

              <div className="mt-6 flex flex-col items-center gap-2">
                        <div className="text-[10px] font-mono text-[#00ffcc] tracking-[0.3em] md:tracking-[0.5em] uppercase opacity-80">Subject_Identity:01</div>
                <div className="text-white font-display text-lg md:text-xl uppercase tracking-wider font-bold">Morena Mohanoe</div>
                <div className="flex gap-2 mt-1">
                  <div className="w-1 h-1 bg-[#00ffcc] rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-[#00ffcc] rounded-full animate-pulse [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-[#00ffcc] rounded-full animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
