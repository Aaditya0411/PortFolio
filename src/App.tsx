import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import Navigation from './components/Navigation';
import ParticleBackground from './components/3d/ParticleBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize smooth scroll
  useLenis();
  
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="relative min-h-screen bg-space-dark text-white overflow-x-hidden">
      {/* 3D Particle Background */}
      <ParticleBackground />
      
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 212, 255, 0.03) 0%, transparent 50%)',
          }}
        />
        
        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
    </div>
  );
}

function ScrollProgress() {
  useEffect(() => {
    const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
    if (!progressBar) return;
    
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/5 z-[60]">
      <div 
        className="scroll-progress h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink transition-all duration-100"
        style={{ width: '0%' }}
      />
    </div>
  );
}

export default App;
