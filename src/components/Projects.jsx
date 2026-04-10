import { useState } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import ProjectModal from './ProjectModal';

const projectsData = [
  {
    id: 'jsr',
    icon: '🏨',
    title: 'JSR Hotels',
    subtitle: 'Designing the Future of Hospitality',
    desc: 'A complete management platform for the hospitality industry with a secure admin command center, dynamic content orchestration, and elegant property showcases.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Vite'],
    status: '🔗 Live',
    statusLink: 'https://jsrhotels.com',
    role: 'Start to Finish System Architect and Developer',
    problem: 'JSR Hotels needed to move away from rigid pages and into a visionary platform whereทุก detail can be controlled with elegance and precision. They needed total control without any developer dependencies.',
    solution: 'I architected a platform that gives owners total sovereignty. Featuring a custom command center with role aware tools and a dynamic content engine. I solved the problem of duplicate links with a deterministic logic that ensures every URL is unique and permanent. It is not just a website. It is a business engine.',
    impact: [
      { bold: 'Total Command Center', text: 'A dashboard to manage every byte of content across the entire brand with absolute authority.' },
      { bold: 'Dynamic Property Portfolio', text: 'Elegant filtering by brand and status, with secure galleries that protect the developer vision.' },
      { bold: 'Permanent Link Integrity', text: 'A unique logic that prevents broken links and ensures search engine dominance through permanent and clean addresses.' },
      { bold: 'Integrated Inboxes', text: 'Careers and contacts managed in one place with secure file handling for every submission.' },
      { bold: 'Visual Intelligence', text: 'Insights on visitor behavior powered by beautiful analytics that anyone can understand.' },
    ],
    arch: [
      ['React and Vite Frontend', 'TypeScript'],
      ['Express REST API', 'Role Based Access'],
      ['Prisma ORM', 'PostgreSQL'],
      ['Visual Analytics', 'Cloud Delivery'],
    ],
    link: 'https://jsrhotels.com',
    linkLabel: 'Experience JSR Hotels →',
  },
  {
    id: 'spendlytics',
    icon: '💰',
    title: 'Spendlytic',
    subtitle: 'Personal Finance. Liberated.',
    desc: 'An insanely great privacy first finance engine for iOS and macOS. Zero data collection. Total user sovereignty. Intelligent local machine learning.',
    tech: ['SwiftUI', 'CoreData', 'Accelerate', 'WidgetKit', 'Combine', 'ActivityKit'],
    status: '🔗 App Store',
    statusLink: 'https://apps.apple.com/us/app/spendlytic/id6759431035',
    role: 'Solo iOS Engineer and Intelligence Architect',
    problem: 'Other apps take your data and store it in the cloud. We think that is wrong. Users deserve an intelligent tool that runs entirely local on their own device.',
    solution: 'I built Spendlytic to be the standard for private finance. Using the power of the Apple Neural Engine, I built a local intelligence engine that does not need a network to understand your habits. It uses reactive logic to calculate your safe spending limits instantly. It is beautiful, it is private, and it just works.',
    impact: [
      { bold: 'Local Intelligence Engine', text: 'Processing every transaction within the device to detect patterns and anomalies without ever leaving your hand.' },
      { bold: 'The Annual Summary', text: 'A beautifully designed year in review that tells the story of your financial health.' },
      { bold: 'Envelope Sovereignty', text: 'A digital version of the classic envelope system that allows instant transfers between your goals.' },
      { bold: 'Live Indicators', text: 'Real time tracking on your lock screen and dynamic island so you always know where you stand.' },
      { bold: 'Biometric Fort Knox', text: 'Total protection through Face ID and Touch ID hardware so only you can see your data.' },
      { bold: 'Fluid Persistence', text: 'A data layer designed to be invisible and fast, ensuring the user experience is never interrupted.' },
    ],
    arch: [
      ['SwiftUI Interface', 'WidgetKit', 'Live Activities'],
      ['Reactive Engine', 'App Intents'],
      ['Core Data Persistence', 'Local Machine Learning'],
      ['Biometric Security', 'Zero Network Dependency'],
    ],
    link: 'https://apps.apple.com/us/app/spendlytic/id6759431035',
    linkLabel: 'View on App Store →',
  },
  {
    id: 'shahraj',
    icon: '🔬',
    title: 'Shahraj Exporter',
    subtitle: 'Global Excellence in Engineering',
    desc: 'A high performance catalog for premium surgical instruments designed for the international medical market.',
    tech: ['React', 'Vite', 'Edge CDN', 'SEO'],
    status: '🔗 Live',
    statusLink: 'https://shahrajexporter.com',
    role: 'Full Stack Developer and Market Strategist',
    problem: 'A global supplier needs a presence that reflects their quality. They needed a catalog that works instantly across every border.',
    solution: 'I built a platform that is as precise as the instruments it showcases. Using global edge delivery, I ensured that a surgeon in London sees exactly what a buyer in New York sees, instantly. It is optimized for the global stage.',
    impact: [
      { bold: 'International Trust', text: 'A flawless design that establishes trust as a premier global surgical brand.' },
      { bold: 'Global Market Dominance', text: 'Advanced search engine strategies that drive bulk inquiries from around the world.' },
      { bold: 'Instant Global Delivery', text: 'Serving the entire world with zero latency through advanced cloud edge networks.' },
    ],
    arch: [
      ['React and Vite', 'Search Strategy'],
      ['Edge Network', 'Global Delivery'],
    ],
    link: 'https://shahrajexporter.com',
    linkLabel: 'Visit Shahraj Exporter →',
  },
  {
    id: 'meetpilot',
    icon: '🎙️',
    title: 'MeetPilot',
    subtitle: 'Meetings. Reinvented.',
    desc: 'A voice first productivity agent for Apple devices with local transcription and intelligent local foundation models.',
    tech: ['SwiftUI', 'Whisper', 'Apple Foundation Models', 'CoreData', 'Swift Concurrency'],
    status: '🧪 Internal Testing',
    statusLink: null,
    role: 'iOS Engineer and Intelligence Architect',
    problem: 'Meetings are a waste of time if you have to write them down manually. Current tools are slow and compromise your privacy.',
    solution: 'MeetPilot is the solution. It is an agent that lives within your device. It hears, it understands, and it organizes. Everything is processed locally on the Apple Silicon Neural Engine. It transcribes, it summarizes, and it writes your emails for you. It is insanely great.',
    impact: [
      { bold: 'Local Neural Transcription', text: 'Whisper running locally on your device for absolute privacy and incredible speed.' },
      { bold: 'Speaker Intelligence', text: 'Automatically identifying voices to tell the story of who said what.' },
      { bold: 'Intelligent Summaries', text: 'Extracting decisions and action items with the power of local foundation models.' },
      { bold: 'One Tap Email', text: 'Instant email composing from your meeting notes with professional tone selection.' },
      { bold: 'Spotlight Integration', text: 'Every meeting is instantly searchable from your home screen just like a native app.' },
    ],
    arch: [
      ['SwiftUI Interface', 'AVFoundation'],
      ['Whisper Local Engine', 'Local Foundation Models'],
      ['Core Data Store', 'Spotlight Search'],
      ['Secure Export Systems'],
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
        <div className="section-label reveal-item">Featured Work</div>
        <h2 className="section-title reveal-item">What we have Built</h2>
        <p className="section-subtitle reveal-item">
          Real world applications for real people. From vast hospitality platforms
          to intelligent local mobile apps. Click any work to see the architecture and story.
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
