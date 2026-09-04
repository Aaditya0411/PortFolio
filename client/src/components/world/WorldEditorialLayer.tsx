import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, ExternalLink, Download, Github, Linkedin, Mail, Check, Copy, FileText, ShieldCheck } from 'lucide-react';
import { useWorld, DestinationId } from '@/contexts/WorldStateContext';
import { GoswamiMonogram } from '@/components/brand/GoswamiMonogram';

export interface ProjectData {
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

export const VERIFIED_PROJECTS: ProjectData[] = [
  {
    id: '01',
    title: 'REVIX VERSION CONTROL SYSTEM',
    kicker: 'FULL STACK / VERSION CONTROL',
    status: 'COMPLETED',
    description: 'A full-stack version control system built around repositories, tracked files, commits, and version history.',
    problem: 'Developers need a centralized way to manage repositories, track code, and maintain commit-based history inside a working application.',
    why: 'To implement version-control concepts at the application level and understand how repository systems are composed.',
    users: 'Developers and users who need to manage repositories and track versions of code.',
    features: ['Repository management', 'File tracking', 'Commit-based version history', 'Custom Git-like module', 'JWT authentication', 'MongoDB Atlas storage'],
    contribution: 'Designed and developed the full-stack application, including the React + Vite frontend, Node.js/Express backend, custom version control module, authentication, persistence, and deployment.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB Atlas', 'JWT', 'bcryptjs', 'AWS EC2'],
    challenge: 'Implementing Git-like version control functionality while connecting repository management, file tracking, commits, and version history to the full-stack application.',
    decision: 'A custom version control module keeps the repository, file-tracking, commit, and history workflow inside the application rather than relying only on an external interface.',
    architecture: 'React + Vite frontend communicates with a Node.js/Express API. MongoDB Atlas stores application data. JWT and bcryptjs handle authentication and password security. The Express server serves the unified application deployment.',
    reliability: 'JWT-based authentication, bcryptjs password hashing, persistent MongoDB Atlas storage, and a structured API architecture.',
    learning: 'Application-level version control, repository management, commit history, authentication, database integration, and full-stack deployment.',
    future: ['More advanced Git-like operations', 'Better version comparison', 'Improved history visualization', 'Stronger repository access control', 'Collaboration features', 'Improved scalability'],
    live: 'https://verison-control-system.onrender.com/',
    github: 'https://github.com/Aaditya0411/Verison-Control-System.git',
    image: '/projects/revix-concept.svg',
    visualLabel: 'CONCEPTUAL VISUALIZATION / COMMIT DAG TREE',
  },
  {
    id: '02',
    title: 'BNBREEZE',
    kicker: 'FULL STACK / PROPERTY DISCOVERY',
    status: 'COMPLETED',
    description: 'A full-stack property listing platform with CRUD workflows for listings and reviews, authentication, maps, uploads, and MVC structure.',
    problem: 'Users need a dependable way to create, manage, browse, and review property listings with the supporting workflows around them.',
    why: 'To gain practical experience building a complete full-stack application with CRUD, authentication, authorization, maps, validation, middleware, and MVC architecture.',
    users: 'Users who want to browse and interact with property listings.',
    features: ['CRUD for listings and reviews', 'User authentication and authorization', 'Passport.js session management', 'Cloudinary uploads', 'MapTiler property maps', 'Joi validation', 'Centralized errors', 'Connect-Flash notifications'],
    contribution: 'Designed and developed the application, including RESTful routes, CRUD logic, authentication, authorization, sessions, integrations, validation, custom middleware, error handling, MVC structure, and user notifications.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Passport.js', 'Cloudinary', 'MapTiler', 'Joi', 'Connect-Flash'],
    challenge: 'Coordinating authentication, authorization, CRUD operations, image uploads, reviews, validation, and property workflows inside a structured MVC application.',
    decision: 'MVC architecture with centralized error handling, Joi validation, and custom authorization middleware keeps the application understandable as features expand.',
    architecture: 'An Express application organized around MVC structure and RESTful routes, with MongoDB persistence, Passport.js sessions, Cloudinary media storage, MapTiler maps, and middleware-driven validation and authorization.',
    reliability: 'Centralized error handling, Joi validation, session management, authorization middleware, and explicit user notification flows.',
    learning: 'Full-stack CRUD systems, authentication, authorization, REST APIs, media management, maps, validation, middleware, and MVC architecture.',
    future: ['More advanced property discovery', 'Richer search and filtering', 'Improved media workflows', 'More granular permissions', 'Better deployment observability'],
    live: 'https://bnbreeze-home.onrender.com/listings',
    github: 'https://github.com/Aaditya0411/BnBreeze-Home.git',
    image: '/projects/bnbreeze-concept.svg',
    visualLabel: 'CONCEPTUAL VISUALIZATION / ARCHITECTURAL PAVILION',
  },
  {
    id: '03',
    title: 'AICTE DOCUMENT INTEGRITY & VERIFICATION PLATFORM',
    kicker: 'BLOCKCHAIN / DOCUMENT INTEGRITY',
    status: 'COMPLETED',
    description: 'A blockchain-backed document verification platform using Hyperledger Fabric and SHA-256 hashing to create integrity records and detect unauthorized modifications.',
    problem: 'Organizations need a reliable way to register digital documents and detect when their contents have changed after registration.',
    why: 'To explore how permissioned blockchain architecture and cryptographic hashing can improve document integrity and verification.',
    users: 'Organizations and users that need a method for registering and verifying digital document integrity.',
    features: ['Document registration', 'File upload', 'Document verification', 'SHA-256 hashing', 'Blockchain-backed records', 'Dashboard', 'Activity tracking', 'Tamper detection'],
    contribution: 'Contributed to the React + TypeScript frontend, Node.js/Express backend, document workflows, dashboard, activity tracking, blockchain integration, Fabric Gateway SDK integration, and document integrity logic.',
    stack: ['Hyperledger Fabric', 'SHA-256', 'React', 'TypeScript', 'Node.js', 'Express', 'Fabric Gateway SDK'],
    challenge: 'Integrating the full-stack application with Hyperledger Fabric while maintaining a reliable document hashing and verification workflow.',
    decision: 'SHA-256 produces a cryptographic representation of a document, while Hyperledger Fabric maintains blockchain-backed integrity records that can be compared during verification.',
    architecture: 'A React + TypeScript frontend communicates with a Node.js/Express backend. Uploaded documents are processed and hashed with SHA-256. The relevant integrity data is registered through Fabric Gateway SDK into Hyperledger Fabric and later compared during verification.',
    reliability: 'Cryptographic hashing, permissioned blockchain records, backend-controlled document processing, and a verification workflow designed to detect modifications.',
    learning: 'Permissioned blockchain architecture, Fabric Gateway SDK, cryptographic hashing, web application integration, document integrity, and verification flows.',
    future: ['Improve scalability', 'Strengthen access control', 'Improve verification UX', 'Add document-management features', 'Improve monitoring and deployment', 'Expand organization management'],
    live: 'https://sih-blockchain.onrender.com/',
    github: 'https://github.com/Aaditya0411/SIH-Blockchain.git',
    image: '/projects/aicte-concept.svg',
    visualLabel: 'CONCEPTUAL VISUALIZATION / CRYPTOGRAPHIC LEDGER',
  },
  {
    id: '04',
    title: 'LOTTERY SMART CONTRACT',
    kicker: 'ETHEREUM / SOLIDITY',
    status: 'COMPLETED',
    description: 'A decentralized Ethereum lottery contract where participants enter with exactly 1 ETH and a manager triggers the draw after the minimum participant requirement is met.',
    problem: 'Lottery participation and prize distribution can be implemented through decentralized contract logic rather than a centralized application.',
    why: 'To gain practical experience with Solidity, payable functions, Ether transfers, access control, participant management, and Ethereum application logic.',
    users: 'Users interacting with decentralized applications and developers learning Ethereum smart-contract development.',
    features: ['Exactly 1 ETH entry requirement', 'Participant tracking', 'Manager role', 'Access control', 'Winner selection', 'Prize-pool transfer', 'Minimum 3 participant requirement', 'Payable functions'],
    contribution: 'Designed and developed the Solidity smart contract, including entry logic, participant management, manager access, winner selection, prize transfer, minimum participant validation, and payable functionality.',
    stack: ['Solidity', 'Ethereum', 'Remix IDE'],
    challenge: 'Implementing contract conditions and the winner-selection workflow while ensuring only the manager can trigger the draw and the prize pool transfers correctly.',
    decision: 'Solidity require statements enforce the exact 1 ETH entry amount and minimum participant requirement before a lottery draw can occur.',
    architecture: 'The lottery logic lives inside an Ethereum smart contract. Entry calls validate the value sent, store participant addresses, require at least three participants, restrict draw execution to the manager, and transfer the prize pool to the selected address according to the implemented contract logic.',
    reliability: 'Manager-based access control, require statements, exact entry validation, minimum participant validation, payable functions, and controlled prize transfer.',
    learning: 'Solidity, Ethereum transactions, payable functions, Ether transfers, address arrays, constructors, access control, contract conditions, and decentralized application concepts.',
    future: ['Improve winner-selection randomness and security', 'Add a dedicated frontend dApp', 'Expand automated contract testing', 'Improve production readiness', 'Add stronger transaction feedback'],
    github: 'https://github.com/Aaditya0411/Lottery-Ticket-Solidity.git',
    image: '/projects/lottery-concept.svg',
    visualLabel: 'CONCEPTUAL VISUALIZATION / ETHEREUM CONTRACT MATRIX',
  },
];

const SKILL_GROUPS = [
  { label: 'LANGUAGES', items: ['JavaScript', 'Java', 'HTML5', 'CSS3', 'Solidity'] },
  { label: 'FRAMEWORKS', items: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'EJS'] },
  { label: 'LIBRARIES', items: ['Mongoose', 'Passport.js', 'GSAP', 'Bootstrap'] },
  { label: 'DATABASES', items: ['MongoDB', 'H2 Database'] },
  { label: 'BLOCKCHAIN / WEB3', items: ['Ethereum', 'Hyperledger Fabric', 'Fabric Gateway SDK', 'Foundry', 'Remix IDE'] },
  { label: 'TOOLS / CLOUD', items: ['Git', 'GitHub', 'VS Code', 'Render', 'Vercel', 'Cloudinary', 'AWS'] },
  { label: 'CORE CONCEPTS', items: ['Data Structures & Algorithms', 'Object-Oriented Design', 'System Design', 'REST APIs', 'CI/CD', 'Unit Testing'] },
];

export const WorldEditorialLayer: React.FC = () => {
  const {
    activeDestination,
    navigateTo,
    openCaseStudy,
    setSelectedProjectId,
  } = useWorld();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('goswamiaaditya61@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="world-editorial-overlay">
      {/* =========================================================================
          DESTINATION 01: ORIGIN / CORE
          ========================================================================= */}
      {activeDestination === 'origin' && (
        <section className="editorial-view origin-view" aria-label="Origin Zone">
          <div className="origin-content-wrap">
            {/* 1. Luxury Eyebrow Badge */}
            <div className="origin-eyebrow-badge">
              <span className="eyebrow-dot" />
              <span className="eyebrow-zone">ZONE 01 // DIGITAL ESTUARY</span>
              <span className="eyebrow-sep">/</span>
              <span className="eyebrow-role">FULL STACK &amp; BLOCKCHAIN</span>
            </div>

            {/* 2. Monumental Luxury Name */}
            <h1 className="editorial-hero-name">
              <span className="name-first">ADITYAGIRI</span>
              <span className="name-last indent">GOSWAMI</span>
            </h1>

            {/* 3. High-End Sub-Headline */}
            <p className="origin-tagline">
              Architecting resilient full-stack applications &amp; decentralized systems.
            </p>

            {/* 4. Curated Frosted Glass Credential Badges */}
            <div className="origin-badges-strip">
              <span className="cred-badge">
                <b>200+</b> LEETCODE DSA
              </span>
              <span className="cred-badge">
                <b>24+</b> GITHUB REPOS
              </span>
              <span className="cred-badge">
                <b>JPMORGAN</b> ALUMNUS
              </span>
            </div>

            {/* 5. Luxury Action Row */}
            <div className="origin-footer-row">
              <button
                className="origin-luxury-cta"
                onClick={() => navigateTo('about')}
              >
                <span>EXPLORE DIGITAL ARCHIPELAGO</span>
                <span className="cta-icon-wrap">
                  <ArrowDownRight size={16} />
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DESTINATION 02: ABOUT / IDENTITY
          ========================================================================= */}
      {activeDestination === 'about' && (
        <section className="editorial-view about-view" aria-label="About Zone">
          <div className="about-panel">
            <p className="editorial-kicker">02 / IDENTITY &amp; PHILOSOPHY</p>
            <h2 className="editorial-section-title">
              I BUILD THE<br />
              <span>SYSTEM BEHIND</span><br />
              THE INTERFACE.
            </h2>
            <div className="about-split-row">
              <p className="about-bio-text">
                I’m Adityagiri, a Full Stack &amp; Blockchain Developer building modern web applications, decentralized systems, and interactive digital experiences. I focus on understanding the problem first, then choosing the simplest practical architecture for solving it.
              </p>
              <div className="about-identity-stamp">
                <div className="stamp-monogram-box">
                  <GoswamiMonogram />
                </div>
                <div className="stamp-meta">
                  <span>IDENTITY / 001</span>
                  <strong>PRECISE<br />BY DEFAULT</strong>
                  <small>VADODARA / INDIA</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DESTINATION 03: STACK / INFRASTRUCTURE
          ========================================================================= */}
      {activeDestination === 'stack' && (
        <section className="editorial-view stack-view" aria-label="Stack Zone">
          <div className="stack-panel">
            <div className="stack-header-row">
              <div>
                <p className="editorial-kicker">03 / TECHNICAL INFRASTRUCTURE</p>
                <h2 className="editorial-section-title">
                  TOOLS FOR<br />
                  <span>MAKING SENSE</span>
                </h2>
              </div>
              <p className="stack-subtitle">
                Core technologies and architectures utilized across production web applications and decentralized ledgers.
              </p>
            </div>

            <div className="stack-groups-grid">
              {SKILL_GROUPS.map((group, idx) => (
                <div key={group.label} className="stack-group-card">
                  <div className="stack-group-head">
                    <span className="group-num">0{idx + 1}</span>
                    <h3>{group.label}</h3>
                  </div>
                  <div className="stack-pill-wrap">
                    {group.items.map((skill) => (
                      <span key={skill} className="stack-pill">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DESTINATION 04: WORK / PROJECT ARCHIPELAGO
          ========================================================================= */}
      {activeDestination === 'work' && (
        <section className="editorial-view work-view" aria-label="Work Zone">
          <div className="work-panel">
            <div className="work-header-row">
              <div>
                <p className="editorial-kicker">04 / PROJECT ARCHIPELAGO</p>
                <h2 className="editorial-section-title">
                  WORK THAT<br />
                  <span>KEEPS MOVING.</span>
                </h2>
              </div>
              <p className="work-subtitle">
                Four systems, each built to make a technical idea legible through working software. Select any project to inspect the full case study.
              </p>
            </div>

            <div className="work-cards-grid">
              {VERIFIED_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="project-world-card"
                  onClick={() => {
                    setSelectedProjectId(proj.id);
                    openCaseStudy(proj);
                  }}
                  onMouseEnter={() => setSelectedProjectId(proj.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') openCaseStudy(proj);
                  }}
                >
                  <div className="project-card-top">
                    <span className="proj-idx">SYS / {proj.id}</span>
                    <span className="proj-status">{proj.status}</span>
                  </div>
                  <div className="project-card-blueprint">
                    <img src={proj.image} alt={proj.title} loading="lazy" />
                  </div>
                  <div className="project-card-body">
                    <p className="proj-kicker">{proj.kicker}</p>
                    <h4>{proj.title}</h4>
                    <p className="proj-desc">{proj.description}</p>
                    <div className="proj-tech-line">
                      <span>{proj.stack.slice(0, 3).join(' · ')}</span>
                      <span className="proj-inspect-cue">INSPECT CASE STUDY <ArrowUpRight size={13} /></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DESTINATION 05: EXPERIENCE / TIMELINE
          ========================================================================= */}
      {activeDestination === 'experience' && (
        <section className="editorial-view experience-view" aria-label="Experience Zone">
          <div className="experience-panel">
            <p className="editorial-kicker">05 / ENGINEERING TIMELINE</p>
            <h2 className="editorial-section-title">
              BUILDING<br />
              <span>IN PUBLIC.</span>
            </h2>

            <div className="timeline-articles-list">
              <article className="timeline-card">
                <div className="timeline-time-col">
                  <span className="timeline-num">01</span>
                  <span className="timeline-period">JAN 2026</span>
                </div>
                <div className="timeline-body-col">
                  <h3>SOFTWARE ENGINEERING VIRTUAL EXPERIENCE</h3>
                  <p className="timeline-company">JPMORGAN CHASE &amp; CO. / FORAGE</p>
                  <p className="timeline-desc">
                    Worked on REST API controllers, Kafka-based functionality, H2 Database, and an Agile-style software development workflow.
                  </p>
                </div>
              </article>

              <article className="timeline-card">
                <div className="timeline-time-col">
                  <span className="timeline-num">02</span>
                  <span className="timeline-period">2024—PRESENT</span>
                </div>
                <div className="timeline-body-col">
                  <h3>MERN STACK DEVELOPER</h3>
                  <p className="timeline-company">PROJECT-BASED / INDEPENDENT DEVELOPER</p>
                  <p className="timeline-desc">
                    Built full-stack web applications using the MERN stack, developed REST APIs and application logic, used Git and GitHub, and focused on responsive interfaces and practical UI/UX implementation.
                  </p>
                </div>
              </article>

              <article className="timeline-card">
                <div className="timeline-time-col">
                  <span className="timeline-num">03</span>
                  <span className="timeline-period">2024—2028</span>
                </div>
                <div className="timeline-body-col">
                  <h3>B.TECH / COMPUTER SCIENCE &amp; ENGINEERING</h3>
                  <p className="timeline-company">EDUCATION</p>
                  <p className="timeline-desc">
                    Building a foundation across software engineering, system design, data structures, full-stack development, and blockchain development.
                  </p>
                </div>
              </article>
            </div>

            {/* Verified Signals Strip */}
            <div className="signals-metrics-bar">
              <div className="metric-box">
                <strong>200+</strong>
                <span>LEETCODE DSA PROBLEMS SOLVED</span>
              </div>
              <div className="metric-box">
                <strong>24+</strong>
                <span>GITHUB REPOSITORIES / PROJECTS</span>
              </div>
              <div className="metric-box">
                <strong>OPEN SOURCE</strong>
                <span>ACCEPTED CONTRIBUTIONS</span>
              </div>
              <div className="metric-box">
                <strong>SIH</strong>
                <span>SMART INDIA HACKATHON PROJECT</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DESTINATION 06: RESUME / ARCHIVE
          ========================================================================= */}
      {activeDestination === 'resume' && (
        <section className="editorial-view resume-view" aria-label="Resume Zone">
          <div className="resume-panel">
            <div className="resume-col-left">
              <div className="zone-kicker-badge">
                <span className="kicker-dot" />
                <span>ZONE 06 // VERIFIED RECORD</span>
              </div>
              <h2 className="editorial-section-title">
                CURRICULUM<br />
                <span>VITAE &amp; CREDENTIALS.</span>
              </h2>
              <p className="resume-desc">
                Direct access to my verified curriculum vitae. Synthesizing full-stack web engineering, permissioned and public blockchain systems, and competitive algorithmic problem solving.
              </p>

              {/* Fast-Scan Recruiter Dossier Grid */}
              <div className="resume-highlights-grid">
                <div className="resume-highlight-item">
                  <span className="hl-label">EDUCATION</span>
                  <strong>B.Tech in Computer Science</strong>
                  <small>2024 — 2028 · Parul University</small>
                </div>
                <div className="resume-highlight-item">
                  <span className="hl-label">INDUSTRY EXP</span>
                  <strong>Software Engineering Virtual Exp.</strong>
                  <small>JPMorgan Chase &amp; Co. / Forage</small>
                </div>
                <div className="resume-highlight-item">
                  <span className="hl-label">COMPETITIVE DSA</span>
                  <strong>200+ Problems Solved</strong>
                  <small>LeetCode Data Structures &amp; Algorithms</small>
                </div>
                <div className="resume-highlight-item">
                  <span className="hl-label">SYSTEMS ARCHIVE</span>
                  <strong>24+ Public Repositories</strong>
                  <small>MERN Stack &amp; Web3 Smart Contracts</small>
                </div>
              </div>
            </div>

            <div className="resume-col-right">
              <div className="resume-artifact-card">
                <div className="card-header-bar">
                  <div className="card-header-left">
                    <FileText size={15} />
                    <span>OFFICIAL CURRICULUM VITAE</span>
                  </div>
                  <span className="card-version-badge">2026 EDITION</span>
                </div>

                <div className="resume-preview-sheet">
                  <div className="sheet-top-row">
                    <div className="sheet-monogram">
                      <GoswamiMonogram />
                    </div>
                    <div className="sheet-title-meta">
                      <h3>ADITYAGIRI GOSWAMI</h3>
                      <p>Full Stack &amp; Blockchain Developer</p>
                      <span>Vadodara, Gujarat, India · goswamiaaditya61@gmail.com</span>
                    </div>
                  </div>

                  <div className="sheet-divider" />

                  <div className="sheet-summary-snippet">
                    <div className="snippet-row">
                      <span className="snippet-dot" />
                      <p><b>Core Stack:</b> React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS</p>
                    </div>
                    <div className="snippet-row">
                      <span className="snippet-dot" />
                      <p><b>Blockchain:</b> Solidity, Ethereum, Hyperledger Fabric, Fabric Gateway SDK, Foundry</p>
                    </div>
                    <div className="snippet-row">
                      <span className="snippet-dot" />
                      <p><b>Engineering:</b> RESTful APIs, System Architecture, CI/CD, Git Version Control</p>
                    </div>
                  </div>

                  <div className="sheet-badge-seal">
                    <ShieldCheck size={14} />
                    <span>VERIFIED PDF ARTIFACT · 3 PAGES · ATS COMPLIANT</span>
                  </div>
                </div>

                <div className="card-actions-row">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="resume-view-btn"
                  >
                    <ExternalLink size={15} /> VIEW FULL PDF
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Adityagiri-Goswami-Resume.pdf"
                    className="resume-dl-btn"
                  >
                    <Download size={15} /> DOWNLOAD CV
                  </a>
                </div>

                <p className="card-note">
                  Direct verified PDF artifact file. Built with standard ATS-friendly formatting for technical recruiters.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DESTINATION 07: CONTACT / SIGNAL BEACON
          ========================================================================= */}
      {activeDestination === 'contact' && (
        <section className="editorial-view contact-view" aria-label="Contact Zone">
          <div className="contact-panel">
            <div className="contact-head-col">
              <div className="zone-kicker-badge">
                <span className="kicker-dot pulse-emerald" />
                <span>ZONE 07 // OPEN TRANSMISSION</span>
              </div>
              <h2 className="editorial-section-title">
                LET’S BUILD<br />
                <span>SOMETHING RESILIENT.</span>
              </h2>
              <p className="contact-lead-copy">
                Currently open to software engineering roles, blockchain development opportunities, and collaborative technical builds.
              </p>

              {/* Status & Availability Info Box */}
              <div className="contact-status-card">
                <div className="status-indicator-line">
                  <span className="live-pulse-emerald" />
                  <strong>AVAILABLE FOR WORK</strong>
                </div>
                <div className="status-meta-grid">
                  <div>
                    <span className="status-meta-label">BASE LOCATION</span>
                    <span className="status-meta-val">Vadodara, India (IST / UTC +5:30)</span>
                  </div>
                  <div>
                    <span className="status-meta-label">RESPONSE LATENCY</span>
                    <span className="status-meta-val">&lt; 24 Hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-channels-col">
              {/* Direct Email Card with 1-click Copy & Direct Send */}
              <div className="contact-action-card">
                <div className="channel-card-header">
                  <div className="channel-icon-pill email">
                    <Mail size={16} />
                  </div>
                  <div className="channel-text-group">
                    <span className="channel-kicker">PRIMARY DIRECT INBOX</span>
                    <h3 className="channel-address">goswamiaaditya61@gmail.com</h3>
                  </div>
                </div>
                <div className="channel-card-actions">
                  <button
                    type="button"
                    className={`channel-action-btn copy-btn ${copiedEmail ? 'copied' : ''}`}
                    onClick={handleCopyEmail}
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={14} />
                        <span>COPIED TO CLIPBOARD!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                  <a
                    href="mailto:goswamiaaditya61@gmail.com"
                    className="channel-action-btn send-btn"
                  >
                    <span>SEND MESSAGE</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* GitHub Archive Card */}
              <a
                href="https://github.com/Aaditya0411/"
                target="_blank"
                rel="noreferrer"
                className="contact-social-card"
              >
                <div className="social-card-left">
                  <div className="channel-icon-pill github">
                    <Github size={16} />
                  </div>
                  <div>
                    <span className="channel-kicker">SOURCE CODE ARCHIVE</span>
                    <h3 className="social-handle">github.com/Aaditya0411</h3>
                  </div>
                </div>
                <div className="social-card-right">
                  <span className="social-stat-pill">24+ REPOS</span>
                  <ArrowUpRight size={16} className="social-arrow" />
                </div>
              </a>

              {/* LinkedIn Network Card */}
              <a
                href="https://www.linkedin.com/in/adityagiri61/"
                target="_blank"
                rel="noreferrer"
                className="contact-social-card"
              >
                <div className="social-card-left">
                  <div className="channel-icon-pill linkedin">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <span className="channel-kicker">PROFESSIONAL NETWORK</span>
                    <h3 className="social-handle">linkedin.com/in/adityagiri61</h3>
                  </div>
                </div>
                <div className="social-card-right">
                  <span className="social-stat-pill">INMAIL / CONNECT</span>
                  <ArrowUpRight size={16} className="social-arrow" />
                </div>
              </a>

              {/* Return to Digital Estuary Button */}
              <button
                type="button"
                className="contact-return-btn"
                onClick={() => navigateTo('origin')}
              >
                <ArrowDownRight size={15} />
                <span>RETURN TO DIGITAL ESTUARY (HOME)</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
