import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Copy,
  Check,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Terminal animation
      if (terminalRef.current) {
        gsap.fromTo(
          terminalRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: terminalRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('goswamiaaditya61@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactLinks = [
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Aaditya0411',
      href: 'https://github.com/Aaditya0411',
      color: '#00d4ff',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/adityagiri61',
      href: 'https://linkedin.com/in/adityagiri61',
      color: '#8b5cf6',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full py-20 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center"
        >
          <span className="text-white">Let's </span>
          <span className="text-gradient">Connect</span>
        </h2>
        <p className="font-inter text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Have a project in mind? Let’s build something impactful together.
        </p>

        {/* Centered Terminal */}
        <div className="max-w-4xl mx-auto">
          <div ref={terminalRef} className="space-y-6">
            {/* Terminal */}
            <div className="glass-card-strong rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-white/5 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="font-mono text-xs text-gray-500">
                    contact.sh — bash — 80x24
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 font-mono text-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-neon-cyan">➜</span>
                  <span className="text-neon-purple">~</span>
                  <span className="text-gray-300">whoami</span>
                </div>
                <div className="pl-6 text-white">
                  Goswami Adityagiri
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-neon-cyan">➜</span>
                  <span className="text-neon-purple">~</span>
                  <span className="text-gray-300">cat role.txt</span>
                </div>
                <div className="pl-6 text-gray-400">
                  Frontend Developer | MERN Stack | Cloud Learner
                </div>

                {/* Email */}
                <div
                  className="pl-6 flex items-center gap-2 cursor-pointer group"
                  onClick={copyEmail}
                >
                  <Mail className="w-4 h-4 text-neon-cyan" />
                  <span className="text-gray-300 group-hover:text-neon-cyan">
                    goswamiaaditya61@gmail.com
                  </span>
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100" />
                  )}
                </div>

                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pl-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <link.icon
                      className="w-4 h-4"
                      style={{ color: link.color }}
                    />
                    <span>{link.value}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100" />
                  </a>
                ))}

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-neon-cyan">➜</span>
                  <span className="text-neon-purple">~</span>
                  <span className="text-gray-300">_</span>
                  <span className="inline-block w-2 h-4 bg-neon-cyan animate-pulse" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-4 flex items-center gap-3 hover:bg-white/5 transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${link.color}15` }}
                  >
                    <link.icon
                      className="w-5 h-5"
                      style={{ color: link.color }}
                    />
                  </div>
                  <div>
                    <p className="font-space text-sm text-white">
                      {link.label}
                    </p>
                    <p className="font-inter text-xs text-gray-400">
                      Connect
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="font-inter text-sm text-gray-500">
            © 2026 All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}
