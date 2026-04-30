import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimatedStroke from './components/AnimatedStroke';
import FeaturedWork from './components/FeaturedWork';
import ProcessSection from './components/ProcessSection';
import ImmersiveTransition from './components/ImmersiveTransition';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <main className="relative bg-[#050505] text-white selection:bg-blue-500/30 font-sans cursor-none">
      <CustomCursor />
      <Navbar />
      <AnimatedStroke />
      <Hero />
      <FeaturedWork />
      <ProcessSection />
      <ImmersiveTransition />
      <ContactSection />
    </main>
  );
}
