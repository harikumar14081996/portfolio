import { useGsapReveal } from '../hooks/useGsapReveal';

const timelineData = [
  {
    date: 'May 2023 to August 2024',
    title: 'Cloud Data Management',
    subtitle: 'Conestoga College · Ontario, Canada',
    details: 'A focused immersion into Microsoft SharePoint and the principles of Project Management. I spent this time perfecting my understanding of User Experience and advanced SQL Database architecture.',
    tags: ['SharePoint', 'Project Management', 'User Experience', 'SQL'],
    type: 'education',
  },
  {
    date: 'July 2021 to April 2023',
    title: 'Web Developer',
    subtitle: 'Unistar Softech · Gujarat, India',
    details: 'Architected production platforms using React and Angular. I drove a twenty percent increase in team productivity and significantly reduced page load times through meticulous optimization.',
    tags: ['React', 'Angular', 'Dot NET', 'SQL Server', 'Agile'],
    type: 'work',
  },
  {
    date: 'August 2019 to August 2021',
    title: 'Master of Computer Application',
    subtitle: 'Uka Tarsadia University · Gujarat, India',
    details: 'Exploring the intersection of hardware and software through IoT and Mobile builds. Focused on advanced database systems and the early days of universal mobile development.',
    tags: ['IoT', 'Flutter', 'ASP DOT NET', 'Database Systems'],
    type: 'education',
  },
  {
    date: 'May 2018 to June 2019',
    title: 'Junior Software Engineer',
    subtitle: 'Initial Infotech · Gujarat, India',
    details: 'Building the foundations of enterprise logic. I delivered on ninety five percent of client specifications and pioneered the use of Flutter for universal mobile applications within the company.',
    tags: ['ASP DOT NET', 'VB DOT NET', 'SQL Server', 'Flutter'],
    type: 'work',
  },
  {
    date: 'August 2015 to May 2018',
    title: 'Bachelor of Computer Application',
    subtitle: 'Uka Tarsadia University · Gujarat, India',
    details: 'The beginning of my obsession with computer science. Focused on pure database design and the fundamentals of the Java ecosystem.',
    tags: ['Java', 'Database Design', 'ASP.NET Core', 'UNIX', 'VB.NET', 'MSSQL'],
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
