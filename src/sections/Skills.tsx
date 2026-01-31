import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Palette, 
  Server, 
  Database, 
  Cloud, 
  GitBranch, 
  Terminal,
  Cpu,
  Layers,
  Box
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; color?: string; strokeWidth?: number }>;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string; color?: string; strokeWidth?: number }>;
  color: string;
  skills: Skill[];
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
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
      
      // Categories animation
      gsap.fromTo(categoriesRef.current?.children || [],
        { opacity: 0, y: 50, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: Palette,
      color: '#00d4ff',
      skills: [
        { name: 'HTML5', icon: Code2, level: 95, color: '#e34c26' },
        { name: 'CSS3', icon: Palette, level: 90, color: '#264de4' },
        { name: 'JavaScript', icon: Terminal, level: 88, color: '#f7df1e' },
        { name: 'React.js', icon: Code2, level: 85, color: '#61dafb' },
      ],
    },
    {
      title: 'Backend & Database',
      icon: Server,
      color: '#8b5cf6',
      skills: [
        { name: 'Node.js', icon: Server, level: 80, color: '#339933' },
        { name: 'Express.js', icon: Layers, level: 78, color: '#000000' },
        { name: 'MongoDB', icon: Database, level: 82, color: '#47a248' },
        { name: 'H2 Database', icon: Database, level: 70, color: '#0000ff' },
      ],
    },
    {
      title: 'Tools & Cloud',
      icon: Cloud,
      color: '#ec4899',
      skills: [
        { name: 'Git & GitHub', icon: GitBranch, level: 88, color: '#f05032' },
        { name: 'REST APIs', icon: Box, level: 85, color: '#00d4ff' },
        { name: 'Cloudinary', icon: Cloud, level: 75, color: '#3448c5' },
        { name: 'AWS', icon: Cloud, level: 60, color: '#ff9900' },
      ],
    },
    {
      title: 'Languages',
      icon: Cpu,
      color: '#10b981',
      skills: [
        { name: 'Java', icon: Cpu, level: 85, color: '#007396' },
        { name: 'JavaScript', icon: Terminal, level: 88, color: '#f7df1e' },
      ],
    },
  ];
  
  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full py-20 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <h2 
          ref={headingRef}
          className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center"
        >
          <span className="text-white">My </span>
          <span className="text-gradient">Skills</span>
        </h2>
        <p className="font-inter text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Technologies and tools I use to bring ideas to life
        </p>
        
        {/* Skills Grid */}
        <div 
          ref={categoriesRef}
          className="grid md:grid-cols-2 gap-6"
          style={{ perspective: '1000px' }}
        >
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="glass-card-strong rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-500 group"
              style={{ 
                transformStyle: 'preserve-3d',
                borderColor: `${category.color}30`,
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon className="w-6 h-6" color={category.color} />
                </div>
                <h3 className="font-space text-xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>
              
              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <skill.icon 
                          className="w-4 h-4" 
                          color={skill.color}
                        />
                        <span className="font-inter text-sm text-gray-300">
                          {skill.name}
                        </span>
                      </div>
                      <span 
                        className={`font-space text-sm transition-opacity duration-300 ${
                          hoveredSkill === skill.name ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ color: skill.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ 
                          width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                          backgroundColor: skill.color,
                          boxShadow: `0 0 10px ${skill.color}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Skill Orbs Decoration */}
        <div className="flex justify-center gap-8 mt-16">
          {['React', 'Node', 'MongoDB', 'AWS', 'Git'].map((tech, index) => (
            <div 
              key={tech}
              className="w-16 h-16 rounded-full glass-card flex items-center justify-center float-animation"
              style={{ 
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <span className="font-space text-xs text-gray-400">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
