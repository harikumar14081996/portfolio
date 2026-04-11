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
  { icon: <DatabaseIcon />, name: 'Vertical Industry Mastery', desc: 'Tailored systems for Motels, Hotels, and Restaurants—built for the hospitality core.', span: true },
  { icon: <FrontendIcon />, name: 'Institutional Stewardship', desc: 'Managing and evolving existing digital ecosystems with surgical precision.', span: false },
  
  // Row 2: 1 + 2
  { icon: <DigitalPresenceIcon />, name: 'Digital Presence Hub', desc: 'Social media orchestration and brand continuity across all platforms.', span: false },
  { icon: <AIIcon />, name: 'Agentic Sovereignty', desc: 'Multi-agent orchestration through LangGraph, AutoGen, and CrewAI loops.', span: true },
  
  // Row 3: 2 + 1
  { icon: <IntegrationsIcon />, name: 'LLM Orchestration', desc: 'GPT-4o, Claude 3.5 Sonnet, and Gemini Pro tool-use and function calling patterns.', span: true },
  { icon: <ResearchIcon />, name: 'Deep Research & Safety', desc: 'Model evaluation, AI safety benchmarking, and cognitive system performance.', span: false },
  
  // Row 4: 1 + 1 + 1
  { icon: <MobileIcon />, name: 'Native Experience', desc: 'High performance SwiftUI and Kotlin applications for Apple and Android.', span: false },
  { icon: <CloudIcon />, name: 'Cloud Majesty', desc: 'Azure and AWS enterprise grade deployments with CD/CI orchestration.', span: false },
  { icon: <AutomationIcon />, name: 'The Autonomy Engine', desc: 'Streamlining business through n8n and OpenClaw autonomous workflows.', span: false },
  
  // Row 5: 1 + 1 + 1
  { icon: <LogicIcon />, name: 'Engineering Integrity', desc: 'TypeScript, Unit Testing, and Type-safe logic for production systems.', span: false },
  { icon: <BackendIcon />, name: 'Logic & Intelligence', desc: 'Managed APIs, Python model serving, and robust server logic.', span: false },
  { icon: <BackendIcon />, name: 'System Scalability', desc: 'Microservices, Kubernetes, and high availability enterprise cores.', span: false },
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
