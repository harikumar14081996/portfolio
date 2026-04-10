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
            I do not just write code. I <span className="highlight">architect digital solutions that define the future</span>.
          </p>
          <p className="about-text reveal-item" style={{ marginTop: '16px' }}>
            With <span className="highlight">over three years of professional experience</span> across enterprise web platforms,
            mobile apps, cloud systems, and intelligence engines, I have shipped production code that scales globally.
            I consistently achieve a <span className="highlight">ninety eight percent success rate</span> in every deployment I lead.
          </p>
          <p className="about-text reveal-item" style={{ marginTop: '16px' }}>
            I lead teams and own entire product lifecycles across diverse industries. From hospitality and finance to education and surgical engineering, I deliver excellence that remains one hundred percent consistent.
          </p>
          <div className="about-location reveal-item">
            📍 Surrey, British Columbia, Canada &nbsp;·&nbsp; 📧 harikumarpatel14@gmail.com
          </div>
          <div className="travel-badge reveal-item">
            <span className="travel-icon">✈️</span>
            <span>Available to travel across <strong>Canada and the USA</strong> for visionary projects and in person assessments</span>
          </div>
        </div>
        <div className="stats-grid">
          <StatCard end={3} suffix="+" label="Years of Experience" />
          <StatCard end={100} suffix="%" label="Client Satisfaction" />
          <StatCard end={98} suffix="%" label="Bug Free Code" />
          <StatCard end={10} suffix="+" label="Visionary Projects" />
        </div>
      </div>
    </section>
  );
}
