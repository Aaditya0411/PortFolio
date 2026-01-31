import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Layers, Code2, Database, Cloud, Map, X, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  techStack: { name: string; icon: React.ComponentType<{ className?: string; color?: string; strokeWidth?: number }>; color: string }[];
  features: string[];
  github: string;
  live?: string;
  color: string;
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
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
      
      // Cards animation
      gsap.fromTo(cardsRef.current?.children || [],
        { opacity: 0, y: 80, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const projects: Project[] = [
    {
      id: 'bnbreeze',
      title: 'BnBreeze',
      shortDesc: 'Full Stack MERN Property Listing Platform',
      fullDesc: 'A comprehensive property booking platform built with the MERN stack. Features secure authentication, property management, image uploads, and location-based services using MapTiler.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      techStack: [
        { name: 'React', icon: Code2, color: '#61dafb' },
        { name: 'Node.js', icon: Code2, color: '#339933' },
        { name: 'Express', icon: Layers, color: '#000000' },
        { name: 'MongoDB', icon: Database, color: '#47a248' },
        { name: 'Cloudinary', icon: Cloud, color: '#3448c5' },
        { name: 'MapTiler', icon: Map, color: '#00d4ff' },
      ],
      features: [
        'User authentication and authorization',
        'Property CRUD operations with image uploads',
        'Interactive map-based location services',
        'Review and rating system',
        'Responsive design for all devices',
      ],
      github: 'https://github.com/Aaditya0411/BnBreeze-Home',
      color: '#00d4ff',
    },
    {
      id: 'soundwave',
      title: 'SoundWave',
      shortDesc: 'Music-Themed Frontend Application',
      fullDesc: 'A visually stunning music streaming interface with modern UI/UX design, smooth animations, and responsive layout. Built with pure HTML, CSS, and JavaScript.',
      image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80',
      techStack: [
        { name: 'HTML5', icon: Code2, color: '#e34c26' },
        { name: 'CSS3', icon: Layers, color: '#264de4' },
        { name: 'JavaScript', icon: Code2, color: '#f7df1e' },
      ],
      features: [
        'Modern dark theme UI design',
        'Smooth CSS animations and transitions',
        'Fully responsive layout',
        'Music player interface',
        'Playlist management UI',
      ],
      github: 'https://github.com/Aaditya0411/Soundwave',
      color: '#8b5cf6',
    },
    {
      id: 'more',
      title: 'More Projects',
      shortDesc: 'Explore all my work on GitHub',
      fullDesc: 'Check out my GitHub repository for more projects including JavaScript utilities, React components, backend APIs, and experimental projects.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
      techStack: [
        { name: 'React', icon: Code2, color: '#61dafb' },
        { name: 'Node.js', icon: Code2, color: '#339933' },
        { name: 'JavaScript', icon: Code2, color: '#f7df1e' },
        { name: 'MongoDB', icon: Database, color: '#47a248' },
      ],
      features: [
        'Various frontend projects',
        'Backend API implementations',
        'Open source contributions',
        'Learning experiments',
      ],
      github: 'https://github.com/Aaditya0411/Projects',
      color: '#ec4899',
    },
  ];
  
  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full py-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <h2 
          ref={headingRef}
          className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center"
        >
          <span className="text-white">Featured </span>
          <span className="text-gradient">Projects</span>
        </h2>
        <p className="font-inter text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Some of my recent work that showcases my skills and passion
        </p>
        
        {/* Projects Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative glass-card-strong rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-500"
              style={{ 
                transformStyle: 'preserve-3d',
                borderColor: `${project.color}30`,
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-space-dark via-space-dark/50 to-transparent"
                />
                
                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 
                    className="font-space text-2xl font-bold"
                    style={{ color: project.color }}
                  >
                    {project.title}
                  </h3>
                  <p className="font-inter text-sm text-gray-400 mt-1">
                    {project.shortDesc}
                  </p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 4).map((tech, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 text-xs"
                    >
                      <tech.icon className="w-3 h-3" color={tech.color} />
                      <span className="font-inter text-gray-300">{tech.name}</span>
                    </div>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-gray-400 font-inter">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
                
                {/* View Details */}
                <div className="flex items-center gap-2 text-sm font-space" style={{ color: project.color }}>
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              {/* Hover glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 60px ${project.color}20`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-space-dark/90 backdrop-blur-xl" />
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-3xl glass-card-strong rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Image */}
            <div className="relative h-64">
              <img 
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-space-dark/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 
                  className="font-space text-3xl font-bold"
                  style={{ color: selectedProject.color }}
                >
                  {selectedProject.title}
                </h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <p className="font-inter text-gray-300 leading-relaxed">
                {selectedProject.fullDesc}
              </p>
              
              {/* Tech Stack */}
              <div>
                <h4 className="font-space text-sm text-gray-400 uppercase tracking-wider mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5"
                    >
                      <tech.icon className="w-4 h-4" color={tech.color} />
                      <span className="font-inter text-sm text-gray-300">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Features */}
              <div>
                <h4 className="font-space text-sm text-gray-400 uppercase tracking-wider mb-3">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: selectedProject.color }}
                      />
                      <span className="font-inter text-sm text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <a 
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-space font-semibold">View Code</span>
                </a>
                {selectedProject.live && (
                  <a 
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-colors"
                    style={{ 
                      backgroundColor: `${selectedProject.color}20`,
                      color: selectedProject.color,
                    }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="font-space font-semibold">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
