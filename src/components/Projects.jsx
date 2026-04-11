import { useState } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import ProjectModal from './ProjectModal';

const projectsData = [
  {
    id: 'jsr',
    icon: '🏨',
    title: 'JSR Hotels',
    subtitle: 'Hospitality Management Redefined',
    desc: 'A complete management platform for the hospitality industry with a secure admin command center, dynamic content orchestration, and elegant property showcases.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Vite'],
    status: '🔗 Live',
    statusLink: 'https://jsrhotels.com',
    role: 'Full-Stack System Architect',
    problem: 'Hotel owners were losing time with slow, manual websites that were hard to update. They needed a way to manage their business, rooms, and news in one place without needing a developer every time they wanted to change a photo or a price.',
    solution: 'I built a "Business Engine" for them. It is a secure, easy-to-use dashboard where they have total control. I created a logic that ensures their website is always fast and never has broken links. It even gives them smart insights on how many people are visiting their hotels.',
    impact: [
      { bold: 'One Dashboard for Everything', text: 'Manage every room, photo, and job posting from a single, simple screen.' },
      { bold: 'Always Working', text: 'A secure system that prevents broken links and keeps your website running 24/7.' },
      { bold: 'Visitor Insights', text: 'Beautiful charts that show exactly how visitors are interacting with your brand.' },
      { bold: 'Built for Growth', text: 'A technical foundation that can handle thousands of guests without breaking.' },
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
    subtitle: 'Personal Finance, Made Private',
    desc: 'An insanely great privacy-first finance engine for iOS. Zero data collection. Total user sovereignty. Intelligent local machine learning.',
    tech: ['iOS', 'SwiftUI', 'CoreData', 'Accelerate', 'WidgetKit', 'Combine', 'ActivityKit'],
    status: '🔗 App Store',
    statusLink: 'https://apps.apple.com/us/app/spendlytic/id6759431035',
    role: 'Solo iOS Engineer',
    problem: 'Most money-tracking apps take your personal data and store it in the cloud. I felt that was wrong. People deserve a smart tool that keeps their private financial life entirely on their own phone.',
    solution: 'I built Spendlytic to be the standard for private finance. It uses the "brain" inside your iPhone to understand your spending habits without ever needing an internet connection. It is fast, beautiful, and keeps your data locked away behind Face ID.',
    impact: [
      { bold: '100% Private', text: 'Your data stays on your phone. Nobody else—not even me—can see your finances.' },
      { bold: 'Intelligent Habits', text: 'The app automatically learns your spending patterns to help you save more money.' },
      { bold: 'The Annual Summary', text: 'A beautiful story of your year in money, helping you plan for a better future.' },
      { bold: 'Face ID Protected', text: 'Your financial life is protected by the same security used for your phone.' },
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
    subtitle: 'Global Catalog for Medical Engineering',
    desc: 'A high-performance catalog for premium surgical instruments designed for the international medical market.',
    tech: ['React', 'Vite', 'Edge CDN', 'SEO'],
    status: '🔗 Live',
    statusLink: 'https://shahrajexporter.com',
    role: 'Full-Stack Developer',
    problem: 'A global company selling life-saving surgical tools needed a website that worked perfectly in every country. A surgeon in London and a buyer in New York needed to see the products instantly without waiting for pages to load.',
    solution: 'I built a platform that is as precise as the surgical tools it sells. By using global server technology, I ensured the website is literally "next door" to every user in the world. It is optimized to be found easily on Google by buyers everywhere.',
    impact: [
      { bold: 'Global Trust', text: 'A professional design that establishes the brand as a leader in medical tools.' },
      { bold: 'Global Speed', text: 'Pages load instantly, whether you are in London, New York, or Mumbai.' },
      { bold: 'Lead Generation', text: 'Advanced search optimization that brings in bulk orders from international hospitals.' },
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
    subtitle: 'Meetings, Organized by AI',
    desc: 'A voice-first productivity agent for Apple devices with local transcription and intelligent local foundation models.',
    tech: ['iOS', 'iPadOS', 'macOS', 'SwiftUI', 'Whisper', 'Apple Neural Engine', 'CoreData'],
    status: '🧪 Internal Testing',
    statusLink: null,
    role: 'Lead Intelligence Architect',
    problem: 'People spend too much time taking notes during meetings and not enough time actually listening. Recording meetings was possible, but transcribing them manually was a slow and painful chore.',
    solution: 'I created MeetPilot to be your personal meeting assistant. It lives on your iPhone, iPad, or Mac. It listens to your meeting, writes it down for you, and even writes your follow-up emails. Because it uses the AI chip in your device, your meetings stay 100% private.',
    impact: [
      { bold: 'Instant Notes', text: 'The AI writes down every word as you speak, so you can focus on the conversation.' },
      { bold: 'Smart Action Items', text: 'MeetPilot identifies who said what and extracts the important tasks for you.' },
      { bold: 'One-Tap Emails', text: 'Automatically draft professional emails based on what happened in the meeting.' },
      { bold: 'Works on All Your Devices', text: 'Seamlessly transition from your phone to your iPad or Mac.' },
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
