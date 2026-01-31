import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, Building2, CheckCircle2, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  link?: string;
  color: string;
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
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
      
      // Timeline line draw animation
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );
      
      // Experience cards animation
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
      
      // Timeline nodes animation
      const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
      if (nodes) {
        gsap.fromTo(nodes,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const experiences: ExperienceItem[] = [
    {
      title: 'Software Engineering Virtual Experience',
      company: 'JPMorgan Chase & Co. (via Forage)',
      period: 'January 2026',
      type: 'Virtual Experience',
      description: 'Completed a practical job simulation involving backend engineering tasks with industry-standard practices.',
      achievements: [
        'Built and integrated REST API Controllers',
        'Implemented Kafka-based data streaming integration',
        'Managed in-memory databases using H2 Integration',
        'Followed modular backend architecture practices',
      ],
      link: 'https://www.theforage.com/',
      color: '#00d4ff',
    },
    {
      title: 'Frontend Developer',
      company: 'Independent Developer',
      period: '2025 – Present',
      type: 'Project-Based',
      description: 'Developing modern web applications with focus on performance, scalability, and user experience.',
      achievements: [
        'Built mobile-first web applications using React.js',
        'Integrated REST APIs and managed complex state logic',
        'Focused on performance optimization and UI/UX',
        'Used Git/GitHub for version control',
      ],
      color: '#8b5cf6',
    },
  ];
  
  return (
    <section 
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen w-full py-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <h2 
          ref={headingRef}
          className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">Experience</span>
        </h2>
        
        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2">
            <div 
              ref={lineRef}
              className="w-full h-full origin-top"
              style={{
                background: 'linear-gradient(180deg, #00d4ff 0%, #8b5cf6 50%, #ec4899 100%)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
              }}
            />
          </div>
          
          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="timeline-node absolute left-4 md:left-1/2 top-0 w-4 h-4 -translate-x-1/2 z-10">
                  <div 
                    className="w-full h-full rounded-full glow-lg"
                    style={{ 
                      backgroundColor: exp.color,
                      boxShadow: `0 0 20px ${exp.color}`,
                    }}
                  />
                </div>
                
                {/* Content Card */}
                <div 
                  className={`experience-card ml-12 md:ml-0 md:w-[45%] ${
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                >
                  <div 
                    className="glass-card-strong rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-500"
                    style={{ borderColor: `${exp.color}30` }}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4" style={{ color: exp.color }} />
                          <span 
                            className="font-space text-xs uppercase tracking-wider"
                            style={{ color: exp.color }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <h3 className="font-space text-xl font-semibold text-white">
                          {exp.title}
                        </h3>
                      </div>
                      {exp.link && (
                        <a 
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    
                    {/* Company & Period */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Building2 className="w-4 h-4" />
                        <span className="font-inter">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="font-inter">{exp.period}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="font-inter text-gray-300 mb-4 text-sm">
                      {exp.description}
                    </p>
                    
                    {/* Achievements */}
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li 
                          key={achIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 
                            className="w-4 h-4 flex-shrink-0 mt-0.5" 
                            style={{ color: exp.color }}
                          />
                          <span className="font-inter text-gray-400">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
