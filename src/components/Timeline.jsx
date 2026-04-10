import { useGsapReveal } from '../hooks/useGsapReveal';

const timelineData = [
  {
    date: 'May 2023 — Aug 2024',
    title: 'Cloud Data Management',
    subtitle: 'Conestoga College — Ontario, Canada',
    details: 'GPA: 3.2/4.0 — Microsoft SharePoint, Project Management, UI/UX, SQL Database',
    tags: ['SharePoint', 'Project Mgmt', 'UI/UX', 'SQL'],
    type: 'education',
  },
  {
    date: 'Jul 2021 — Apr 2023',
    title: 'Web Developer',
    subtitle: 'Unistar Softech Pvt. Ltd. — Bardoli, Gujarat',
    details: 'Built production web apps with C# .NET, React/Angular. Increased team productivity by 20%, cut page load times by 25%, decreased user-reported issues by 40%.',
    tags: ['React', 'Angular', '.NET', 'SQL Server', 'Agile'],
    type: 'work',
  },
  {
    date: 'Aug 2019 — Aug 2021',
    title: 'Master of Computer Application',
    subtitle: 'Uka Tarsadia University — Gujarat, India',
    details: 'GPA: 8.2/10.0 — IoT, Flutter, ASP.NET, Advanced RDBMS, Game Development',
    tags: ['IoT', 'Flutter', 'ASP.NET', 'RDBMS'],
    type: 'education',
  },
  {
    date: 'May 2018 — Jun 2019',
    title: 'Software Engineer',
    subtitle: 'Initial Infotech — Bardoli, Gujarat',
    details: 'Built data-driven enterprise apps using ASP.NET, VB.NET, C# .NET, and MSSQL Server. Met 95% of client specs, improved performance by 30%, expanded system capacity by 20%. Also adopted Flutter for cross-platform mobile development.',
    tags: ['ASP.NET', 'VB.NET', 'C# .NET', 'MSSQL', 'Entity Framework', 'Flutter'],
    type: 'work',
  },
  {
    date: 'Aug 2015 — May 2018',
    title: 'Bachelor of Computer Application',
    subtitle: 'Uka Tarsadia University — Gujarat, India',
    details: 'GPA: 9.2/10.0 — Database Design, ASP.NET Core, Java, UNIX',
    tags: ['Java', 'ASP.NET Core', 'Database Design', 'UNIX'],
    type: 'education',
  },
];

export default function Timeline() {
  const sectionRef = useGsapReveal();

  return (
    <section className="section" id="journey" ref={sectionRef}>
      <div className="section-label reveal-item">Experience & Education</div>
      <h2 className="section-title reveal-item">My Journey</h2>
      <p className="section-subtitle reveal-item">
        From top-tier university education in India to professional software development,
        then advanced cloud training in Canada — a path of continuous growth.
      </p>
      <div className="timeline">
        {timelineData.map((item, i) => (
          <div key={i} className="timeline-item reveal-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">{item.date}</div>
            <h3 className="timeline-title">
              {item.type === 'work' ? '💼 ' : '🎓 '}{item.title}
            </h3>
            <div className="timeline-subtitle">{item.subtitle}</div>
            <div className="timeline-details">{item.details}</div>
            <div className="timeline-tags">
              {item.tags.map((tag, j) => (
                <span key={j} className="timeline-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
