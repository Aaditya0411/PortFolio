import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectArtifactCanvas } from './ProjectArtifactCanvas';
import { useFisherman } from '@/contexts/FishermanContext';

interface ProjectItem {
  id: string;
  title: string;
  kicker: string;
  status: string;
  description: string;
  problem: string;
  why: string;
  users: string;
  features: string[];
  contribution: string;
  stack: string[];
  challenge: string;
  decision: string;
  architecture: string;
  reliability: string;
  learning: string;
  future: string[];
  live?: string;
  github: string;
  image: string;
  visualLabel: string;
}

interface ConceptualProjectReelProps {
  projects: ProjectItem[];
  onSelectProject: (p: ProjectItem) => void;
}

export const ConceptualProjectReel: React.FC<ConceptualProjectReelProps> = ({
  projects,
  onSelectProject,
}) => {
  const { triggerFishingNav, isCasting } = useFisherman();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSelect = (project: ProjectItem) => {
    triggerFishingNav(
      {
        id: project.id,
        label: project.title,
        type: 'project',
        projectData: project,
      },
      () => onSelectProject(project)
    );
  };

  return (
    <div className="conceptual-reel-wrap" data-reveal>
      <div className="conceptual-reel-header">
        <div>
          <span className="case-label">SIGNATURE 3D EXPLORATION</span>
          <h3>CONCEPTUAL SYSTEM ARTIFACTS</h3>
          <p>
            Interactive 3D representations of each system architecture. Select any artifact to have the fisherman cast his line and reel in the verified case study.
          </p>
        </div>
        <div className="conceptual-reel-note">
          <span className="signal-dot" />
          <span>CONCEPTUAL 3D OBJECTS — NOT UI SCREENSHOTS</span>
        </div>
      </div>

      <div className="conceptual-grid">
        {projects.map((project) => {
          const isHovered = hoveredId === project.id;
          return (
            <div
              key={project.id}
              className={`conceptual-card ${isHovered ? 'active' : ''}`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleSelect(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(project);
                }
              }}
              aria-label={`Inspect ${project.title} 3D conceptual artifact`}
            >
              <div className="conceptual-canvas-box">
                {isHovered ? (
                  <ProjectArtifactCanvas projectId={project.id} isHovered={true} />
                ) : (
                  <div className="conceptual-blueprint-preview">
                    <img
                      src={project.image}
                      alt={`${project.title} conceptual architectural blueprint`}
                      className="conceptual-blueprint-img"
                      loading="lazy"
                    />
                  </div>
                )}
                <span className="artifact-index">SYS / {project.id}</span>
                <span className="artifact-hover-cue">
                  {isCasting ? 'CASTING HOOK...' : 'CAST & REEL CASE STUDY'} <ArrowUpRight size={13} />
                </span>
              </div>
              <div className="conceptual-card-info">
                <p className="eyebrow">{project.kicker}</p>
                <h4>{project.title}</h4>
                <span className="conceptual-meta-stack">{project.stack.slice(0, 3).join(' · ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
