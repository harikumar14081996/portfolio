import { useGsapReveal } from '../hooks/useGsapReveal';
import { AIIcon, AutomationIcon, MarketingIcon } from './AnimatedIcons';

const techData = [
  { icon: 'devicon-react-original colored', name: 'Institutional Foundations', desc: 'Custom enterprise platforms and institutional architectures.', span: false },
  { icon: 'devicon-nodejs-plain colored', name: 'Backend Systems', desc: 'Managed APIs and robust server logic.', span: false },
  { icon: 'devicon-postgresql-plain colored', name: 'Data Architecture', desc: 'Designing scalable and pure data solutions.', span: false },
  { icon: 'devicon-flutter-plain colored', name: 'Universal Mobile Apps', desc: 'Single codebase for iOS and Android devices.', span: false },
  { icon: '', name: 'Intelligence within Hardware', desc: 'Language Model Orchestration · MCP · RAG · LangGraph · Local Machine Learning', span: true, isAI: true },
  { icon: '', name: 'The Future of Operations', desc: 'Streamlining business through n8n and OpenClaw automation workflows.', span: true, isAutomation: true },
  { icon: 'devicon-swift-plain colored', name: 'Native Experience', desc: 'High performance SwiftUI applications for Apple devices.', span: false },
  { icon: 'devicon-android-plain colored', name: 'Kotlin Ecosystem', desc: 'Specialized builds for the Android ecosystem.', span: false },
  { icon: 'devicon-azure-plain colored', name: 'Cloud Sovereignty', desc: 'Azure and AWS enterprise grade deployments.', span: false },
  { icon: 'devicon-typescript-plain colored', name: 'Type Safety', desc: 'Building robust and pure production systems.', span: false },
  { icon: '', name: 'Market Excellence', desc: 'Search Engine Ready · Lead Generation · Digital Presence · Conversion Optimization', span: true, isMarketing: true },
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
            {tech.isAI ? (
              <AIIcon />
            ) : tech.isMarketing ? (
              <MarketingIcon />
            ) : tech.isAutomation ? (
              <AutomationIcon />
            ) : (
              <i className={tech.icon}></i>
            )}
            <span className="tech-card-title">{tech.name}</span>
            <span className="tech-card-desc">{tech.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
