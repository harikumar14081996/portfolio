import React from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { 
  AIIcon, 
  AutomationIcon, 
  MarketingIcon, 
  FrontendIcon, 
  BackendIcon, 
  DatabaseIcon, 
  MobileIcon, 
  CloudIcon, 
  LogicIcon, 
  ResearchIcon, 
  IntegrationsIcon,
  DigitalPresenceIcon
} from './AnimatedIcons';

const techData = [
  // Row 1: 2 + 1
  { icon: <DatabaseIcon />, name: 'Business Specific Solutions', desc: 'Custom software for Motels, Hotels, and Restaurants—built for the needs of your industry.', span: true },
  { icon: <FrontendIcon />, name: 'System Modernization', desc: 'Taking your existing software and making it feel brand new with the latest technology.', span: false },
  
  // Row 2: 1 + 2
  { icon: <DigitalPresenceIcon />, name: 'Brand & Digital Presence', desc: 'Managing your brand continuity and social media presence across the whole web.', span: false },
  { icon: <AIIcon />, name: 'AI Assistants & Automation', desc: 'Building smart AI agents that work for you, handling complex tasks automatically.', span: true },
  
  // Row 3: 2 + 1
  { icon: <IntegrationsIcon />, name: 'Smart Logic Integration', desc: 'Adding the power of GPT-4o, Claude, and Gemini into your business tools.', span: true },
  { icon: <ResearchIcon />, name: 'AI Safety & Performance', desc: 'Testing and improving how AI behaves to ensure it is always safe and accurate.', span: false },
  
  // Row 4: 1 + 1 + 1
  { icon: <MobileIcon />, name: 'Mobile App Development', desc: 'Creating fast, beautiful apps for iPhone and Android devices.', span: false },
  { icon: <CloudIcon />, name: 'Secure Cloud Servers', desc: 'Setting up high-performance, secure servers that can grow with your business.', span: false },
  { icon: <AutomationIcon />, name: 'Business Automation', desc: 'Removing repetitive tasks from your day through automated digital workflows.', span: false },
  
  // Row 5: 1 + 1 + 1
  { icon: <LogicIcon />, name: 'Reliable Programming', desc: 'High-quality, bug-free code using modern standards like TypeScript.', span: false },
  { icon: <BackendIcon />, name: 'Intelligent Databases', desc: 'Building the "brain" of your app to store data safely and intelligently.', span: false },
  { icon: <BackendIcon />, name: 'Large-Scale Software', desc: 'Designing software that can handle thousands of users without slowing down.', span: false },
];




export default function Services() {
  const sectionRef = useGsapReveal();

  return (
    <section className="section" id="tech" ref={sectionRef}>
      <div className="section-label reveal-item">Services and Expertise</div>
      <h2 className="section-title reveal-item">Solutions that define Categories</h2>
      <p className="section-subtitle reveal-item">
        I combine deep technical craft with a visionary strategy to build 
        software that does not just work. It sets a new standard.
      </p>
      <div className="tech-bento">
        {techData.map((tech, i) => (
          <div key={i} className={`tech-card reveal-item ${tech.span ? 'span-2' : ''}`}>
            {tech.icon}
            <span className="tech-card-title">{tech.name}</span>
            <span className="tech-card-desc">{tech.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
