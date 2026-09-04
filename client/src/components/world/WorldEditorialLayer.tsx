import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ExternalLink, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Check, 
  Copy, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Code2 
} from 'lucide-react';
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

const STACK_FILTER_TABS = [
  { id: 'ALL', label: 'ALL SYSTEMS' },
  { id: 'BLOCKCHAIN / WEB3', label: 'BLOCKCHAIN & WEB3' },
  { id: 'LANGUAGES', label: 'LANGUAGES' },
  { id: 'FRAMEWORKS', label: 'FRAMEWORKS' },
  { id: 'LIBRARIES', label: 'LIBRARIES' },
  { id: 'DATABASES', label: 'DATABASES' },
  { id: 'TOOLS / CLOUD', label: 'TOOLS & CLOUD' },
  { id: 'CORE CONCEPTS', label: 'CORE CS' },
];

export const WorldEditorialLayer: React.FC = () => {
  const {
    activeDestination,
    navigateTo,
    openCaseStudy,
    setSelectedProjectId,
  } = useWorld();

  const [activeStackCategory, setActiveStackCategory] = useState<string>('ALL');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
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
          DESTINATION 03: STACK / INFRASTRUCTURE (TECHNICAL ARCHITECTURAL MAP)
          ========================================================================= */}
      {activeDestination === 'stack' && (
        <section className="editorial-view stack-view" aria-label="Stack Zone">
          <div className="stack-panel-editorial">
            <div className="stack-editorial-header">
              <div className="stack-header-left">
                <span className="editorial-kicker">03 / TECHNICAL INFRASTRUCTURE</span>
                <h2 className="editorial-section-title">
                  TOOLS FOR<br />
                  <span>MAKING SENSE.</span>
                </h2>
              </div>
              <p className="stack-editorial-lead">
                Core technologies, distributed ledgers, and architectural systems utilized across production full-stack applications.
              </p>
            </div>

            {/* Interactive Domain Filter Toggles */}
            <div className="stack-filter-bar">
              <span className="stack-filter-label">FILTER DOMAIN:</span>
              <div className="stack-filter-pills">
                {STACK_FILTER_TABS.map((tab) => {
                  const isActive = activeStackCategory === tab.id;
                  const isWeb3 = tab.id.includes('BLOCKCHAIN');
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={`stack-filter-pill ${isActive ? 'active' : ''} ${isWeb3 ? 'web3-pill' : ''}`}
                      onClick={() => {
                        setActiveStackCategory((prev) => prev === tab.id ? 'ALL' : tab.id);
                      }}
                      aria-pressed={isActive}
                    >
                      <span className="filter-pill-dot" />
                      <span>{tab.label}</span>
                      {tab.id === 'ALL' && <span className="filter-count">7</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="stack-ledger-rows">
              {(activeStackCategory === 'ALL'
                ? SKILL_GROUPS
                : SKILL_GROUPS.filter((g) => g.label === activeStackCategory)
              ).map((group) => {
                const globalIdx = SKILL_GROUPS.findIndex((g) => g.label === group.label);
                const isBlockchain = group.label.includes('BLOCKCHAIN');
                const isExpanded = expandedRow === group.label || activeStackCategory !== 'ALL';
                return (
                  <div
                    key={group.label}
                    className={`stack-ledger-row ${isBlockchain ? 'stack-featured-row' : ''} ${isExpanded ? 'row-expanded' : ''}`}
                    onClick={() => setExpandedRow((prev) => prev === group.label ? null : group.label)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setExpandedRow((prev) => prev === group.label ? null : group.label);
                      }
                    }}
                  >
                    <div className="stack-ledger-meta">
                      <div className="stack-meta-top-line">
                        <span className="stack-ledger-num">0{globalIdx + 1}</span>
                        <span className="stack-items-count">{group.items.length} SKILLS</span>
                      </div>
                      <h3 className="stack-ledger-cat">{group.label}</h3>
                      {isBlockchain && (
                        <span className="stack-featured-tag">PRIMARY SPECIALIZATION</span>
                      )}
                    </div>
                    <div className="stack-ledger-skills">
                      {group.items.map((skill) => (
                        <span key={skill} className="stack-skill-item">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="stack-toggle-cue" title={isExpanded ? 'Collapse' : 'Expand'}>
                      <span className="toggle-symbol">{isExpanded ? '−' : '+'}</span>
                    </div>
                  </div>
                );
              })}
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
          DESTINATION 06: RESUME / CREDENTIALS (EDITORIAL ARCHIVE)
          ========================================================================= */}
      {activeDestination === 'resume' && (
        <section className="editorial-view resume-view" aria-label="Resume Zone">
          <div className="resume-editorial-container">
            <div className="resume-editorial-header">
              <span className="editorial-kicker">06 // CURRICULUM VITAE</span>
              <h2 className="editorial-section-title">RESUME</h2>
            </div>

            <div className="resume-document-frame">
              <div className="doc-preview-surface">
                <div className="doc-preview-header">
                  <div className="doc-preview-identity">
                    <span className="doc-meta-pre">OFFICIAL CURRICULUM VITAE</span>
                    <h3 className="doc-name-title">ADITYAGIRI GOSWAMI</h3>
                    <p className="doc-role-subtitle">Full Stack &amp; Blockchain Developer</p>
                  </div>
                  <div className="doc-monogram-box">
                    <GoswamiMonogram />
                  </div>
                </div>

                {/* Stylized Architectural Document Blueprint Silhouette */}
                <div className="doc-silhouette-container" aria-hidden="true">
                  <div className="doc-silhouette-band">
                    <div className="doc-silhouette-line w-40 primary" />
                    <div className="doc-silhouette-line w-85" />
                    <div className="doc-silhouette-line w-70" />
                  </div>
                  <div className="doc-silhouette-band">
                    <div className="doc-silhouette-line w-30 primary" />
                    <div className="doc-silhouette-line w-90" />
                    <div className="doc-silhouette-line w-60" />
                  </div>
                  <div className="doc-silhouette-band">
                    <div className="doc-silhouette-line w-35 primary" />
                    <div className="doc-silhouette-line w-80" />
                    <div className="doc-silhouette-line w-50" />
                  </div>
                </div>

                {/* Clear, High-Contrast Action Buttons */}
                <div className="doc-actions-toolbar">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="resume-btn-primary"
                  >
                    <span>VIEW RESUME</span>
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Adityagiri-Goswami-Resume.pdf"
                    className="resume-btn-secondary"
                  >
                    <span>DOWNLOAD CV</span>
                    <Download size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DESTINATION 07: CONTACT / GET IN TOUCH (CREATIVE STUDIO COLLABORATION)
          ========================================================================= */}
      {activeDestination === 'contact' && (
        <section className="editorial-view contact-view" aria-label="Contact Zone">
          <div className="contact-editorial-container">
            <div className="contact-editorial-header">
              <span className="editorial-kicker">07 // INQUIRIES &amp; COLLABORATION</span>
              <h2 className="editorial-section-title">
                LET’S CONNECT.
              </h2>
              <p className="contact-editorial-lead">
                Open for full-stack engineering roles, Web3 systems, and collaborative technical builds.
              </p>
            </div>

            {/* Prominent Direct Email */}
            <div className="contact-email-showcase">
              <span className="contact-label-sub">DIRECT INBOX</span>
              <div className="contact-email-line-wrap">
                <a
                  href="mailto:goswamiaaditya61@gmail.com"
                  className="contact-display-email"
                >
                  goswamiaaditya61@gmail.com
                </a>
              </div>

              {/* Minimalist Sub-Row: Copy Button + Location + Status */}
              <div className="contact-detail-row">
                <button
                  type="button"
                  className={`contact-copy-pill ${copiedEmail ? 'copied' : ''}`}
                  onClick={handleCopyEmail}
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} />
                      <span>COPIED ADDRESS</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>

                <div className="contact-detail-divider" />

                <div className="contact-info-pill">
                  <span className="info-dot dot-cyan" />
                  <span>Vadodara, Gujarat, India</span>
                </div>

                <div className="contact-detail-divider" />

                <div className="contact-info-pill">
                  <span className="info-dot dot-emerald" />
                  <span>Open for opportunities</span>
                </div>
              </div>
            </div>

            <div className="contact-hairline-sep" />

            {/* Social Links List (Open List, NOT Cards) */}
            <div className="contact-channels-ledger">
              <a
                href="https://github.com/Aaditya0411/"
                target="_blank"
                rel="noreferrer"
                className="contact-channel-link"
              >
                <div className="channel-id">
                  <Github size={16} />
                  <span className="channel-name">GITHUB</span>
                </div>
                <span className="channel-handle">github.com/Aaditya0411</span>
                <span className="channel-cue">
                  <ArrowUpRight size={14} />
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/adityagiri61/"
                target="_blank"
                rel="noreferrer"
                className="contact-channel-link"
              >
                <div className="channel-id">
                  <Linkedin size={16} />
                  <span className="channel-name">LINKEDIN</span>
                </div>
                <span className="channel-handle">linkedin.com/in/adityagiri61</span>
                <span className="channel-cue">
                  <ArrowUpRight size={14} />
                </span>
              </a>
            </div>

            <div className="contact-editorial-footer">
              <button
                type="button"
                className="contact-return-link"
                onClick={() => navigateTo('origin')}
              >
                <ArrowDownRight size={14} />
                <span>BACK TO OVERVIEW</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
