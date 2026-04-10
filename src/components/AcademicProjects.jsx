import { useGsapReveal } from '../hooks/useGsapReveal';

const academicData = [
  {
    badge: '🏫 MCA — Uka Tarsadia University',
    title: 'Cross-Platform E-Commerce App',
    desc: 'Led a team building a scalable e-commerce platform with Flutter, ASP.NET Web API, and SQL Server.',
    tech: 'Flutter · ASP.NET · SQL Server',
    metric: '5,000+ Users · 95% Satisfaction · 30% Faster Loads',
  },
  {
    badge: '🏫 MCA — Uka Tarsadia University',
    title: 'IoT Presence Management System',
    desc: 'Innovative IoT solution for real-time faculty availability management with 20+ sensors and cameras.',
    tech: 'Flutter · PHP · MySQL · IoT Sensors',
    metric: '50% Fewer Conflicts · 200+ Faculty Served',
  },
  {
    badge: '🏫 BCA — Uka Tarsadia University',
    title: 'E-Commerce Web Application',
    desc: 'Full-featured e-commerce platform with three-tier user system for admins, employees, and customers.',
    tech: 'ASP.NET · .NET Core · SQL Server',
    metric: '1,000+ Monthly Transactions · 25% Sales Increase',
  },
];

export default function AcademicProjects() {
  const sectionRef = useGsapReveal();

  return (
    <section className="section" id="academic" ref={sectionRef}>
      <div className="section-label reveal-item">Academic Projects</div>
      <h2 className="section-title reveal-item">University Foundations</h2>
      <p className="section-subtitle reveal-item">
        Projects built during my Master's and Bachelor's degrees — where I first learned to lead teams,
        architect systems, and deliver software with real-world impact.
      </p>
      <div className="academic-grid">
        {academicData.map((project, i) => (
          <div key={i} className="academic-card reveal-item">
            <span className="academic-badge">{project.badge}</span>
            <h3 className="academic-title">{project.title}</h3>
            <p className="academic-desc">{project.desc}</p>
            <div className="project-tech" style={{ marginBottom: '12px' }}>
              {project.tech.split(' · ').map((t, j) => <span key={j}>{t}</span>)}
            </div>
            <div className="academic-metric">{project.metric}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
