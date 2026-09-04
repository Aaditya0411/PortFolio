import React from 'react';
import { X, ExternalLink, Github, ArrowUpRight, CheckCircle, Shield, Cpu, Layers } from 'lucide-react';
import { useWorld } from '@/contexts/WorldStateContext';

export const ProjectCaseStudyDrawer: React.FC = () => {
  const { activeCaseStudy, closeCaseStudy } = useWorld();

  if (!activeCaseStudy) return null;

  const p = activeCaseStudy;

  return (
    <div
      className="case-drawer-backdrop"
      onClick={closeCaseStudy}
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title} case study`}
    >
      <div
        className="case-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header Controls */}
        <div className="case-drawer-bar">
          <div className="case-meta-tag">
            <span className="signal-dot" />
            <span>CASE STUDY / SYS_{p.id}</span>
          </div>

          <div className="case-bar-actions">
            {p.live ? (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="case-live-btn"
              >
                LIVE SYSTEM <ExternalLink size={14} />
              </a>
            ) : null}
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="case-github-btn"
            >
              REPOSITORY <Github size={14} />
            </a>
            <button
              className="case-close-btn"
              onClick={closeCaseStudy}
              aria-label="Close Case Study"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="case-hero">
          <p className="case-kicker">{p.kicker}</p>
          <h1 className="case-title">{p.title}</h1>
          <p className="case-headline-desc">{p.description}</p>
        </div>

        {/* Large Architectural Blueprint Visual */}
        <div className="case-visual-frame">
          <img
            src={p.image}
            alt={`${p.title} system architecture blueprint`}
            className="case-visual-img"
          />
          <div className="case-visual-overlay-caption">
            <span>{p.visualLabel}</span>
            <span>SYSTEM ID / {p.id}</span>
          </div>
        </div>

        {/* Core Specs Bar */}
        <div className="case-specs-grid">
          <div className="spec-cell">
            <small>STATUS</small>
            <strong>{p.status}</strong>
          </div>
          <div className="spec-cell">
            <small>ARCHITECTURE</small>
            <strong>{p.stack.slice(0, 3).join(' · ')}</strong>
          </div>
          <div className="spec-cell">
            <small>ROLE</small>
            <strong>FULL STACK / ARCHITECTURE</strong>
          </div>
          <div className="spec-cell">
            <small>VERIFIED REPO</small>
            <a href={p.github} target="_blank" rel="noreferrer">
              GITHUB ARCHIVE <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* Detailed Editorial Narrative Sections */}
        <div className="case-body-layout">
          {/* Section 1: Problem & Purpose */}
          <div className="case-editorial-block">
            <span className="case-block-index">01 / CONTEXT &amp; INTENT</span>
            <div className="case-two-col">
              <div>
                <h3>The Problem</h3>
                <p>{p.problem}</p>
              </div>
              <div>
                <h3>Why I Built It</h3>
                <p>{p.why}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Features & Architecture */}
          <div className="case-editorial-block">
            <span className="case-block-index">02 / SYSTEM ARCHITECTURE</span>
            <div className="case-two-col">
              <div>
                <h3>System Flow</h3>
                <p>{p.architecture}</p>
                <div className="case-tags-wrap" style={{ marginTop: '20px' }}>
                  {p.stack.map((item: string) => (
                    <span key={item} className="case-tag-pill">{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3>Implemented Capabilities</h3>
                <ul className="case-feature-bullets">
                  {p.features.map((f: string) => (
                    <li key={f}>
                      <CheckCircle size={14} className="feature-check" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Engineering Decision & Hardest Challenge */}
          <div className="case-editorial-block">
            <span className="case-block-index">03 / TECHNICAL RIGOR</span>
            <div className="case-two-col">
              <div>
                <h3>The Engineering Challenge</h3>
                <p>{p.challenge}</p>
              </div>
              <div>
                <h3>Key Decision &amp; Tradeoff</h3>
                <p>{p.decision}</p>
              </div>
            </div>
          </div>

          {/* Section 4: Reliability & Learnings */}
          <div className="case-editorial-block">
            <span className="case-block-index">04 / RELIABILITY &amp; ITERATION</span>
            <div className="case-two-col">
              <div>
                <h3>Reliability Measures</h3>
                <p>{p.reliability}</p>
              </div>
              <div>
                <h3>Key Technical Learnings</h3>
                <p>{p.learning}</p>
              </div>
            </div>
          </div>

          {/* Section 5: Future Iterations */}
          <div className="case-editorial-block case-future-block">
            <span className="case-block-index">05 / FUTURE ITERATIONS</span>
            <div className="case-future-pills">
              {p.future.map((fut: string) => (
                <div key={fut} className="case-future-card">
                  <span className="future-dot" />
                  <span>{fut}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="case-drawer-footer">
            <p>Verified technical case file for {p.title}.</p>
            <div className="case-bar-actions">
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer" className="case-live-btn">
                  LAUNCH LIVE APP <ExternalLink size={14} />
                </a>
              )}
              <a href={p.github} target="_blank" rel="noreferrer" className="case-github-btn">
                INSPECT SOURCE CODE <Github size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
