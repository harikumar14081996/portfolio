import { useGsapReveal } from '../hooks/useGsapReveal';
import { useCountUp } from '../hooks/useCountUp';

function StatCard({ end, suffix, label }) {
  const { ref, value } = useCountUp(end, { suffix });
  return (
    <div className="stat-card reveal-item" ref={ref}>
      <div className="stat-number">{value}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const sectionRef = useGsapReveal();

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="section-label reveal-item">About Me</div>
      <h2 className="section-title reveal-item">The Full Picture</h2>
      <div className="about-content">
        <div>
          <p className="about-text reveal-item">
            I don't just write code — I <span className="highlight">architect digital solutions that generate ROI</span>.
          </p>
          <p className="about-text reveal-item" style={{ marginTop: '16px' }}>
            With <span className="highlight">3+ years of professional experience</span> across enterprise web platforms,
            mobile apps, cloud infrastructure, and IoT systems, I've shipped production code that serves thousands of users,
            cut page load times by <span className="highlight">25%</span>, reduced user-reported issues by <span className="highlight">40%</span>,
            and consistently hit <span className="highlight">95%+ client satisfaction</span> rates.
          </p>
          <p className="about-text reveal-item" style={{ marginTop: '16px' }}>
            I've led teams, owned entire product lifecycles, and delivered across industries -
            hospitality, finance, surgical instruments, e-commerce, education, and AI.
          </p>
          <div className="about-location reveal-item">
            📍 Surrey, British Columbia, Canada &nbsp;·&nbsp; 📧 harikumarpatel14@gmail.com
          </div>
          <div className="travel-badge reveal-item">
            <span className="travel-icon">✈️</span>
            <span>Available to travel across <strong>Canada & USA</strong> for locked projects and in-person assessments</span>
          </div>
        </div>
        <div className="stats-grid">
          <StatCard end={3} suffix="+" label="Years Experience" />
          <StatCard end={95} suffix="%" label="Client Satisfaction" />
          <StatCard end={40} suffix="%" label="Fewer Bugs" />
          <StatCard end={5000} suffix="+" label="Users Served" />
        </div>
      </div>
    </section>
  );
}
