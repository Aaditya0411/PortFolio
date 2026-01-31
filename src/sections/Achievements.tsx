import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Brain, Cloud, Target, Code, Sparkles, Zap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Achievement {
  icon: React.ComponentType<{ className?: string; color?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  stat: string;
  color: string;
}

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
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
      
      // Badges animation
      gsap.fromTo(badgesRef.current?.children || [],
        { opacity: 0, scale: 0.5, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: badgesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const achievements: Achievement[] = [
    {
      icon: Code,
      title: 'DSA Mastery',
      description: 'Data Structures & Algorithms problems solved',
      stat: '150+',
      color: '#00d4ff',
    },
    {
      icon: Brain,
      title: 'System Design',
      description: 'Learning scalable architecture patterns',
      stat: 'Active',
      color: '#8b5cf6',
    },
    {
      icon: Cloud,
      title: 'Cloud Learning',
      description: 'AWS services and cloud concepts',
      stat: 'Beginner',
      color: '#ec4899',
    },
    {
      icon: Trophy,
      title: 'JPMorgan Experience',
      description: 'Software Engineering Virtual Program',
      stat: 'Completed',
      color: '#f59e0b',
    },
    {
      icon: Target,
      title: 'Problem Solver',
      description: 'Complex challenges tackled',
      stat: '100+',
      color: '#10b981',
    },
    {
      icon: Zap,
      title: 'Fast Learner',
      description: 'New technologies mastered',
      stat: '10+',
      color: '#ef4444',
    },
  ];
  
  return (
    <section 
      ref={sectionRef}
      id="achievements"
      className="relative min-h-screen w-full py-20 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <h2 
          ref={headingRef}
          className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center"
        >
          <span className="text-gradient">Achievements</span>
        </h2>
        <p className="font-inter text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Milestones and accomplishments on my journey
        </p>
        
        {/* Achievement Badges */}
        <div 
          ref={badgesRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative glass-card-strong rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
              style={{ borderColor: `${achievement.color}20` }}
            >
              {/* Glow effect */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: achievement.color }}
              />
              
              {/* Icon */}
              <div 
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${achievement.color}15` }}
              >
                <achievement.icon 
                  className="w-7 h-7"
                  color={achievement.color}
                />
              </div>
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 
                    className="font-space text-2xl font-bold"
                    style={{ color: achievement.color }}
                  >
                    {achievement.stat}
                  </h3>
                  <Sparkles 
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: achievement.color }}
                  />
                </div>
                <h4 className="font-space text-lg font-semibold text-white mb-1">
                  {achievement.title}
                </h4>
                <p className="font-inter text-sm text-gray-400">
                  {achievement.description}
                </p>
              </div>
              
              {/* Corner decoration */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${achievement.color}10 50%)`,
                }}
              />
            </div>
          ))}
        </div>
        
        
       
      </div>
    </section>
  );
}
