import { useGsapReveal } from '../hooks/useGsapReveal';

const reasons = [
  {
    icon: '🔧',
    title: 'True Full-Stack + Mobile + IoT',
    desc: "Most developers specialize in one layer. I've shipped production code across frontend, backend, mobile (iOS/Android), cloud, and IoT — and I've led teams doing it.",
  },
  {
    icon: '📊',
    title: 'Quantified Impact, Not Just Code',
    desc: 'Every project comes with measurable business outcomes — 40% fewer bugs, 25% faster pages, 95% client satisfaction, 50% fewer scheduling conflicts.',
  },
  {
    icon: '🏛️',
    title: 'Enterprise-Grade Architecture',
    desc: "I don't build MVPs that fall apart at scale. I use battle-tested patterns — Repository, MVVM, RBAC, Three-Tier — that grow with your business.",
  },
  {
    icon: '🌍',
    title: 'Canadian + International',
    desc: 'Educated in Canada (Conestoga College) with hands-on professional experience from India\'s fast-paced software industry. Global perspective, local professionalism.',
  },
  {
    icon: '🤖',
    title: 'AI & Cutting-Edge Tech',
    desc: 'From on-device agentic AI and LLMs to IoT sensor networks and MCP integration, I actively push into the technologies defining the next decade.',
  },
  {
    icon: '🔄',
    title: 'Agile to the Core',
    desc: "Scrum, Kanban, sprint planning, CI/CD — I don't just claim agile, I've lived it across two professional companies and delivered 20% productivity gains.",
  },
];

export default function WhyMe() {
  const sectionRef = useGsapReveal();

  return (
    <section className="section" id="whyme" ref={sectionRef}>
      <div className="section-label reveal-item">What Sets Me Apart</div>
      <h2 className="section-title reveal-item">Why Work With Me</h2>
      <p className="section-subtitle reveal-item">
        Six concrete reasons why I'm the right engineer for your next project.
      </p>
      <div className="whyme-grid">
        {reasons.map((reason, i) => (
          <div key={i} className="whyme-card reveal-item">
            <div className="whyme-icon">{reason.icon}</div>
            <h3 className="whyme-title">{reason.title}</h3>
            <p className="whyme-desc">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
