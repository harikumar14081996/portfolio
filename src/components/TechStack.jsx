import { useGsapReveal } from '../hooks/useGsapReveal';

const techData = [
  { icon: 'devicon-react-original colored', name: 'Web & Institutional Systems', desc: 'Custom enterprise platforms & institutional websites.', span: false },
  { icon: 'devicon-nodejs-plain colored', name: 'Backend Architecture', desc: 'Managed APIs & robust server-side logic.', span: false },
  { icon: 'devicon-postgresql-plain colored', name: 'Database Design', desc: 'Architecting scalable data solutions.', span: false },
  { icon: 'devicon-flutter-plain colored', name: 'Cross-Platform Mobile', desc: 'Single codebase for iOS & Android.', span: false },
  { icon: '', name: '🤖 Agentic AI & Intelligence', desc: 'LLM Orchestration · MCP · RAG · LangGraph · On-Device ML', span: true, isAI: true },
  { icon: '', name: '⚡ Business Automation', desc: 'Operation streamlining via n8n & OpenClaw automation workflows.', span: true, isAutomation: true },
  { icon: 'devicon-swift-plain colored', name: 'Native iOS', desc: 'High-performance SwiftUI applications.', span: false },
  { icon: 'devicon-android-plain colored', name: 'Native Android', desc: 'Kotlin & Java specialized builds.', span: false },
  { icon: 'devicon-azure-plain colored', name: 'Cloud Infrastructure', desc: 'Azure & AWS enterprise deployments.', span: false },
  { icon: 'devicon-typescript-plain colored', name: 'TypeScript', desc: 'Type-safe production systems.', span: false },
  { icon: '', name: '📈 Digital Strategy & Social', desc: 'SEO · Lead Gen · Social Media Management · Conversion Optimization', span: true, isMarketing: true },
];

export default function Services() {
  const sectionRef = useGsapReveal();

  return (
    <section className="section" id="tech" ref={sectionRef}>
      <div className="section-label reveal-item">Services & Expertise</div>
      <h2 className="section-title reveal-item">Solutions I Deliver</h2>
      <p className="section-subtitle reveal-item">
        Combining deep technical proficiency with business-focused strategies to build 
        software that doesn't just work—it generates results.
      </p>
      <div className="tech-bento">
        {techData.map((tech, i) => (
          <div key={i} className={`tech-card reveal-item ${tech.span ? 'span-2' : ''}`}>
            {tech.isAI ? (
              <span style={{ fontSize: '2.5rem' }}>🤖</span>
            ) : tech.isMarketing ? (
              <span style={{ fontSize: '2.5rem' }}>📈</span>
            ) : tech.isAutomation ? (
              <span style={{ fontSize: '2.5rem' }}>⚡</span>
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
