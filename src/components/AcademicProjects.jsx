import { useGsapReveal } from '../hooks/useGsapReveal';

const academicData = [
  {
    badge: '🏫 MCA · Uka Tarsadia University',
    title: 'Universal Commerce Innovation',
    desc: 'Led a team building a scalable commerce platform with Flutter and the DOT NET Web API.',
    tech: 'Flutter · DOT NET · SQL Server',
    metric: 'Five Thousand Plus Users · Total Satisfaction · Faster Loads',
  },
  {
    badge: '🏫 MCA · Uka Tarsadia University',
    title: 'Intelligence in the Physical World',
    desc: 'An innovative solution for instant faculty availability management with over twenty sensors and cameras.',
    tech: 'Flutter · PHP · MySQL · IoT Sensors',
    metric: 'Fewer Conflicts · Hundreds of Faculty Served',
  },
  {
    badge: '🏫 BCA · Uka Tarsadia University',
    title: 'The Foundation of Digital Commerce',
    desc: 'Full featured commerce platform with a three layer user system for admins and customers.',
    tech: 'DOT NET · DOT NET Core · SQL Server',
    metric: 'Thousands of Monthly Transactions · Sales Growth',
  },
];

export default function AcademicProjects() {
  const sectionRef = useGsapReveal();

  return (
    <section className="section" id="academic" ref={sectionRef}>
      <div className="section-label reveal-item">Academic Projects</div>
      <h2 className="section-title reveal-item">The Evolution of a Craft</h2>
      <p className="section-subtitle reveal-item">
        Projects built during my Masters and Bachelors degrees. This is where I first learned to lead teams 
        and architect systems with real world impact.
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
