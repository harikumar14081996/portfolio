import { useState } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import ProjectModal from './ProjectModal';

const projectsData = [
  {
    id: 'jsr',
    icon: '🏨',
    title: 'JSR Hotels',
    subtitle: 'Dynamic Website & Admin CMS Platform',
    desc: 'A full-stack CMS-driven hospitality platform with a secure admin panel, dynamic content management, media uploads, lead/contact workflows, analytics dashboards, and SEO-friendly public property pages.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Vite'],
    status: '🔗 Live',
    statusLink: 'https://jsrhotels.com',
    role: 'End-to-End Full-Stack Architect & Developer',
    problem: 'JSR Hotels needed to move from static pages to a scalable, admin-managed platform where all major website sections — homepage blocks, services, team, portfolio, legal pages, contact workflows, careers, and leads — could be controlled through a secure admin panel without any developer dependency.',
    solution: 'I designed and implemented a full-stack React + Express + Prisma solution from scratch. The platform features a custom admin CMS with role-aware tools, dynamic content architecture with CRUD for all key pages, a portfolio module with brand/status filtering, SEO-friendly deterministic slug generation (grand-plaza-new-york → grand-plaza-new-york-2), race-safe conflict handling for duplicate slugs, media upload workflows for cover/gallery images, and production-safe data handling across every module.',
    impact: [
      { bold: 'Custom Admin CMS', text: 'Full dashboard for managing brands, portfolio properties, content sections, social links, site settings, and multi-admin management with activity logs.' },
      { bold: 'Dynamic Portfolio Module', text: 'Brand-based and status-based filtering, rich property detail pages with address data, multi-image galleries, and toggleable password gate from admin settings.' },
      { bold: 'SEO-Friendly Slug System', text: 'Deterministic unique slug generation (base, base-2, base-3) preventing duplicate URL failures. Race-safe conflict handling replaces server 500 errors with controlled unique allocation.' },
      { bold: 'Contact, Careers & Leads', text: 'Contact inbox + careers inbox with resume upload support, leads module with newsletter and manual source tracking, and in-flight submission locks to prevent duplicates.' },
      { bold: 'Analytics Dashboard', text: 'Insights on visits, unique users, top viewed sections/properties — powered by Recharts visualizations.' },
      { bold: 'Admin Security & Audit', text: 'System-admin protections, self-delete prevention, audit logging for who changed what and when, and force-reset password flow (system-admin only).' },
      { bold: 'Asset-ID Media Workflow', text: 'Asset-ID based media handling prevents broken image rendering across all upload scenarios.' },
    ],
    arch: [
      ['React + Vite Frontend', 'TypeScript'],
      ['Express.js REST API', 'RBAC Auth'],
      ['Prisma ORM', 'PostgreSQL (Neon)'],
      ['Recharts Analytics', 'Vercel Deploy'],
    ],
    link: 'https://jsrhotels.com',
    linkLabel: 'Visit jsrhotels.com →',
  },
  {
    id: 'spendlytics',
    icon: '💰',
    title: 'Spendlytic',
    subtitle: 'Private AI-First Finance Engine',
    desc: 'A privacy-obsessed iOS finance app with on-device ML, Year in Review, Envelope Budgeting, Dynamic Island, and Live Activities — zero data collection, 100% user sovereignty.',
    tech: ['SwiftUI', 'CoreData', 'Accelerate (vDSP)', 'WidgetKit', 'Combine', 'ActivityKit'],
    status: '🔗 App Store',
    statusLink: 'https://apps.apple.com/us/app/spendlytic/id6759431035',
    role: 'Solo iOS Engineer & ML Architect',
    problem: 'Existing finance apps send sensitive financial data to the cloud, creating privacy risks and latency. Users needed a completely private, intelligent finance tracker that runs entirely on their device with zero network dependency.',
    solution: 'I single-handedly architected and shipped Spendlytic — a privacy-obsessed personal finance app built 100% in SwiftUI. Using Apple\'s Accelerate (vDSP) framework, I built a custom on-device ML engine for real-time linear regression and anomaly detection on spending data. CoreData with background contexts (NSManagedObjectContextDidSave synchronization) ensures zero UI-thread blocking during complex ledger generations, while Combine powers live "Daily Safe Spend" calculations processing Income, Expenses, and Habit Logs into a single reactive state. Available globally on the App Store with a freemium model ($4.99/mo or $29.99/yr Premium).',
    impact: [
      { bold: 'On-Device ML Engine', text: 'Custom intelligence using Apple Accelerate (vDSP) performing real-time linear regression and statistical anomaly detection on local spending data (mean ± 2σ) — zero network calls, zero data collection.' },
      { bold: 'Year in Review', text: 'Beautifully wrapped financial year summary showing total earned, best streaks, top categories, and savings — shareable as a visual card.' },
      { bold: 'Envelope Budgeting', text: 'Virtual envelope system allowing users to visualize and transfer funds between budget categories in real-time.' },
      { bold: 'Dynamic Island & Live Activities', text: 'Engineered ActivityKit integration showing real-time spending tracking and remaining daily budget at a glance — without even opening the app.' },
      { bold: 'Home & Lock Screen Widgets', text: 'WidgetKit-powered widgets displaying "Safe to Spend" daily budget and streak tracking right from the Home or Lock Screen.' },
      { bold: 'Rollover Budgets', text: 'Smart budget rollover system — unspent daily budget automatically increases allowance for remaining days of the month.' },
      { bold: 'Biometric Zero-Trust Security', text: 'Hardware-backed FaceID/TouchID via LocalAuthentication ensures the app is impenetrable without biometric confirmation.' },
      { bold: 'Asynchronous Persistence', text: 'Robust CoreData stack using background contexts with NSManagedObjectContextDidSave synchronization — guaranteed zero UI-thread blocking during complex data operations.' },
    ],
    arch: [
      ['SwiftUI Interface', 'WidgetKit', 'Live Activities'],
      ['Combine Engine', 'App Intents'],
      ['CoreData (Async)', 'vDSP ML Engine'],
      ['FaceID / TouchID', 'Zero Network'],
    ],
    link: 'https://apps.apple.com/us/app/spendlytic/id6759431035',
    linkLabel: 'View on App Store →',
  },
  {
    id: 'shahraj',
    icon: '🔬',
    title: 'Shahraj Exporter',
    subtitle: 'Global Surgical Instrument Catalog',
    desc: 'A high-performance B2B web platform for premium surgical instruments with advanced SEO targeting international medical equipment markets.',
    tech: ['React', 'Vite', 'Edge CDN', 'SEO'],
    status: '🔗 Live',
    statusLink: 'https://shahrajexporter.com',
    role: 'Full-Stack Developer & SEO Strategist',
    problem: 'As a global supplier of premium surgical instruments, Shahraj Exporter needed a web presence that looked incredibly professional, loaded globally with zero latency, and made navigating complex medical tools effortless for B2B buyers.',
    solution: 'I developed a custom, high-performance web platform from scratch using modern frameworks. I built a dynamic product catalog system allowing users to easily parse through specialized categories (like scalpels, retractors, and forceps), while implementing heavy organic SEO targeting international medical equipment markets.',
    impact: [
      { bold: 'International Trust', text: 'The flawless, modern UI established Shahraj Exporter as a premier, high-quality global surgical brand.' },
      { bold: 'Inbound Lead Generation', text: 'Superior SEO mechanisms (dynamic meta-tags, structured data) and immediate page load speeds drove significant global traffic and higher bulk inquiry conversions.' },
      { bold: 'Zero Latency Worldwide', text: 'Edge deployment ensures instant access for buyers in any country.' },
    ],
    arch: [
      ['React + Vite', 'SEO Engine'],
      ['Edge CDN', 'Global Delivery'],
    ],
    link: 'https://shahrajexporter.com',
    linkLabel: 'Visit shahrajexporter.com →',
  },
  {
    id: 'meetpilot',
    icon: '🎙️',
    title: 'MeetPilot',
    subtitle: 'Agentic Voice Intelligence Platform',
    desc: 'A next-gen voice-first productivity agent for iOS/macOS with on-device transcription, speaker diarization, AI summaries, and multi-destination exports.',
    tech: ['SwiftUI', 'Whisper', 'Apple Foundation Models', 'CoreData', 'Swift Concurrency'],
    status: '🧪 Internal Testing (TestFlight)',
    statusLink: null,
    role: 'iOS Engineer & AI Architect',
    problem: 'Professionals waste hours manually capturing meeting notes, action items, and follow-ups. Existing solutions require cloud processing with privacy concerns and latency issues.',
    solution: 'I developed MeetPilot — a voice-first productivity agent for iOS and macOS. It features on-device transcription via Whisper on Apple\'s Neural Engine, agentic Apple Foundation Model workflows for intelligent summaries, speaker diarization to identify who said what, template-based meeting summaries (Standups, Board Meetings, 1:1s), AI-powered email rewriting with tone selection, and robust exports to Apple Notes, PDF, Slack, and Notion.',
    impact: [
      { bold: 'On-Device Neural Transcription', text: 'Whisper model runs locally on Apple Silicon Neural Engine — high-fidelity transcription with minimal battery impact and zero data leaving the device.' },
      { bold: 'Speaker Diarization', text: 'Built-in VAD and clustering identifies distinct speakers, rendering transcripts with "Speaker 1, Speaker 2" labels that users can rename inline.' },
      { bold: 'Agentic AI Summaries', text: 'On-device foundation model processing (Daily Standup, Board Meeting, 1:1, Brainstorming) extracts blockers, decisions, and action items contextually.' },
      { bold: 'AI Email Rewrite', text: 'One-tap rewrite of any memo into professional emails with tone selection (Friendly, Professional, Formal) — export directly to Gmail, Outlook, or Mail.' },
      { bold: 'Multi-Destination Export', text: 'Robust export pipeline to Apple Notes, PDF (styled documents), Slack webhooks, and Notion API — all from one unified interface.' },
      { bold: 'CoreSpotlight Integration', text: 'Every transcript and summary is natively indexed — searchable from iOS Home Screen or macOS Spotlight.' },
    ],
    arch: [
      ['SwiftUI Interface', 'AVFoundation'],
      ['Whisper (Neural Engine)', 'Apple Foundation Models (On-Device)'],
      ['CoreData', 'CoreSpotlight'],
      ['Export: Notes / PDF / Slack / Notion'],
    ],
    link: null,
    linkLabel: null,
  },
];

export default function Projects() {
  const sectionRef = useGsapReveal();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section className="section" id="projects" ref={sectionRef}>
        <div className="section-label reveal-item">Featured Projects</div>
        <h2 className="section-title reveal-item">What I've Built</h2>
        <p className="section-subtitle reveal-item">
          Real-world applications serving real users — from enterprise hospitality platforms
          to AI-powered mobile apps. Click any project to see the full architecture and impact.
        </p>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card reveal-item ${index % 3 === 0 ? 'large' : 'small'}`} 
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-icon">{project.icon}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-card-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                {project.desc.length > 100 ? project.desc.substring(0, 100) + '...' : project.desc}
              </p>
              <div className="project-tech">
                {project.tech.slice(0, 4).map((t, i) => <span key={i}>{t}</span>)}
                {project.tech.length > 4 && <span>+{project.tech.length - 4}</span>}
              </div>
              <div style={{ marginTop: 'auto' }}>
                <div className="project-status">
                  {project.status}
                </div>
                <div className="project-cta">
                  Case Study & Architecture →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
