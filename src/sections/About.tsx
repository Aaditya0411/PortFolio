import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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

      // Content animation
      const contentItems = Array.from(contentRef.current?.children ?? []);
      if (contentItems.length > 0) {
        gsap.fromTo(
          contentItems,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.85, rotateY: -25 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full py-20 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">About</span>
          <span className="text-white"> Me</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-start"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/30 to-neon-purple/30 rounded-3xl blur-3xl" />

              <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] rounded-3xl overflow-hidden gradient-border">
                <img
                  src="/profile.jpg"
                  alt="Goswami Adityagiri"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-purple/10" />
              </div>

              
              
            </div>
          </div>

          {/* About Content */}
          <div ref={contentRef} className="space-y-4">
            <p className="font-inter text-lg text-gray-300 leading-relaxed">
              I build scalable and user-focused web applications using the{' '}
              <span className="text-neon-cyan font-semibold">MERN stack</span>,
              with a strong interest in{' '}
              <span className="text-neon-purple font-semibold">
                system design
              </span>{' '}
              and{' '}
              <span className="text-neon-pink font-semibold">
                cloud architecture
              </span>.
            </p>

            <p className="font-inter text-lg text-gray-300 leading-relaxed">
              Passionate about writing clean code, solving real-world problems,
              and building high-performance digital products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
