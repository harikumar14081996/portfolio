import { useGsapReveal } from '../hooks/useGsapReveal';

const techData = [
  { icon: 'devicon-react-original colored', name: 'React', desc: 'Frontend UI & SPAs', span: false },
  { icon: 'devicon-nodejs-plain colored', name: 'Node.js', desc: 'Backend & REST APIs', span: false },
  { icon: 'devicon-postgresql-plain colored', name: 'PostgreSQL', desc: 'Relational Database', span: false },
  { icon: 'devicon-flutter-plain colored', name: 'Flutter', desc: 'Cross-Platform Mobile', span: false },
  { icon: '', name: '🤖 Agentic AI', desc: 'LLM · MCP · RAG · LangGraph · CrewAI · Multi-Agent Orchestration · On-Device ML', span: true, isAI: true },
  { icon: 'devicon-swift-plain colored', name: 'SwiftUI', desc: 'iOS Development', span: false },
  { icon: 'devicon-android-plain colored', name: 'Android', desc: 'Java · Kotlin · Native Apps', span: false },
  { icon: 'devicon-csharp-plain colored', name: 'C# / .NET', desc: 'Enterprise Backend', span: false },
  { icon: 'devicon-docker-plain colored', name: 'Docker', desc: 'Containerization', span: false },
  { icon: 'devicon-azure-plain colored', name: 'Azure & AWS', desc: 'Cloud Platforms', span: false },
  { icon: 'devicon-typescript-plain colored', name: 'TypeScript', desc: 'Type-Safe JS', span: false },
  { icon: 'devicon-angularjs-plain colored', name: 'Angular', desc: 'Enterprise Frontend', span: false },
  { icon: 'devicon-git-plain colored', name: 'Git & CI/CD', desc: 'DevOps & Version Control', span: false },
  { icon: '', name: '📈 Digital Marketing', desc: 'SEO · Lead Generation · Analytics · Conversion Optimization · Social Media Strategy', span: true, isMarketing: true },
];

export default function TechStack() {
  const sectionRef = useGsapReveal();

  return (
    <section className="section" id="tech" ref={sectionRef}>
      <div className="section-label reveal-item">Technical Arsenal</div>
      <h2 className="section-title reveal-item">Technologies I Work With</h2>
      <p className="section-subtitle reveal-item">
        A carefully curated toolkit spanning frontend, backend, mobile, AI, cloud, and DevOps -
        chosen for building production-grade software that scales.
      </p>
      <div className="tech-bento">
        {techData.map((tech, i) => (
          <div key={i} className={`tech-card reveal-item ${tech.span ? 'span-2' : ''}`}>
            {tech.isAI ? (
              <span style={{ fontSize: '2.5rem' }}>🤖</span>
            ) : tech.isMarketing ? (
              <span style={{ fontSize: '2.5rem' }}>📈</span>
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
