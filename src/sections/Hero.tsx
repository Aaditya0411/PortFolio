import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Code2, Terminal, Cloud, GitBranch, ExternalLink, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Name animation - character by character
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(chars,
          { opacity: 0, y: 50, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.05, stagger: 0.03 },
          0.5
        );
      }
      
      // Title fade in
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.2
      );
      
      // CTA buttons pop in
      tl.fromTo(ctaRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
        1.5
      );
      
      // Floating elements
      tl.fromTo(floatingRef.current?.children || [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        1
      );
    }, heroRef);
    
    return () => ctx.revert();
  }, []);
  
  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const name = "Goswami Adityagiri";
  
  return (
    <section 
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent pointer-events-none" />
      
      {/* Floating code snippets */}
      <div 
        ref={floatingRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      >
        {/* React Component */}
        <div className="absolute top-[15%] left-[10%] glass-card rounded-lg p-4 float-animation opacity-60">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs text-gray-400 font-mono">App.jsx</span>
          </div>
          <pre className="text-xs text-neon-cyan font-mono">
{`const App = () => {
  return <Hero />
}`}
          </pre>
        </div>
        
        {/* Terminal */}
        <div className="absolute top-[20%] right-[8%] glass-card rounded-lg p-4 float-animation-delayed opacity-50">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-neon-purple" />
            <span className="text-xs text-gray-400 font-mono">terminal</span>
          </div>
          <pre className="text-xs text-neon-purple font-mono">
{`$ git commit -m "init"
$ npm run dev`}
          </pre>
        </div>
        
        {/* API Call */}
        <div className="absolute bottom-[25%] left-[5%] glass-card rounded-lg p-4 float-animation-delayed opacity-50">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-4 h-4 text-neon-pink" />
            <span className="text-xs text-gray-400 font-mono">API</span>
          </div>
          <pre className="text-xs text-neon-pink font-mono">
{`GET /api/projects
200 OK`}
          </pre>
        </div>
        
        {/* Git */}
        <div className="absolute bottom-[20%] right-[10%] glass-card rounded-lg p-4 float-animation opacity-60">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400 font-mono">git</span>
          </div>
          <pre className="text-xs text-green-400 font-mono">
{`main ← feature/ui
Merged`}
          </pre>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Greeting */}
        <p className="font-inter text-lg text-gray-400 mb-4 tracking-widest uppercase">
          Hi, I'm
        </p>
        
        {/* Name */}
        <h1 
          ref={nameRef}
          className="font-space text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 perspective-1000"
        >
          {name.split('').map((char, i) => (
            <span 
              key={i} 
              className={`char inline-block ${char === ' ' ? 'w-4' : ''}`}
              style={{
                color: i < 8 ? '#00d4ff' : '#8b5cf6',
                textShadow: i < 8 
                  ? '0 0 30px rgba(0, 212, 255, 0.5)' 
                  : '0 0 30px rgba(139, 92, 246, 0.5)',
              }}
            >
              {char}
            </span>
          ))}
        </h1>
        
        {/* Title */}
        <p 
          ref={titleRef}
          className="font-inter text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8"
        >
          <span className="text-neon-cyan">Frontend Developer</span>
          <span className="text-gray-500 mx-2">|</span>
          <span className="text-neon-purple">MERN Stack</span>
          <span className="text-gray-500 mx-2">|</span>
          <span className="text-neon-pink">Cloud Learner</span>
        </p>
        
        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
          <a 
            href="#projects"
            className="group relative px-8 py-4 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-space font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:bg-neon-cyan hover:text-space-dark hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ExternalLink className="w-4 h-4" />
            </span>
          </a>
          <a 
            href="#contact"
            className="group relative px-8 py-4 bg-neon-purple/10 border border-neon-purple/50 text-neon-purple font-space font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:bg-neon-purple hover:text-white hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Me
              <Mail className="w-4 h-4" />
            </span>
          </a>
          <a 
            href="/resume.pdf"
            target="_blank"
            className="group relative px-8 py-4 bg-white/5 border border-white/20 text-white font-space font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:scale-105"
          >
            <span className="relative z-10">Download Resume</span>
          </a>
        </div>
        
        {/* Social Links */}
        <div className="flex gap-4 mt-10 justify-center">
          {[
            { 
              icon: 'github', 
              href: 'https://github.com/Aaditya0411',
              label: 'GitHub'
            },
            { 
              icon: 'linkedin', 
              href: 'https://linkedin.com/in/adityagiri61',
              label: 'LinkedIn'
            },
            { 
              icon: 'mail', 
              href: 'mailto:goswamiaaditya61@gmail.com',
              label: 'Email'
            },
          ].map((social) => (
            <a
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
              aria-label={social.label}
            >
              {social.icon === 'github' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              )}
              {social.icon === 'linkedin' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              )}
              {social.icon === 'mail' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a 
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-neon-cyan transition-colors"
        >
          <span className="text-sm font-inter">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
