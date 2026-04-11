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
      <div className="about-legacy reveal-item">
        Proud Son of <span className="father-name-highlight">Rajnikant Thakorbhai Patel</span>
      </div>
      <div className="about-content">
        <div>
          <p className="about-text reveal-item">
            I believe that great software should feel <span className="highlight">completely invisible</span>. It should be there when you need it, and solve your problem before you even have to ask.
          </p>
          
          <div className="philosophy-block reveal-item">
            <h3>Users care about <span className="highlight">results</span>, not just code.</h3>
            <p>
              I take pride in crafting systems that <strong className="highlight">anyone</strong> can use—tools that feel natural, fast, and elegantly simple.
            </p>
          </div>

          <p className="about-text reveal-item" style={{ marginTop: '24px' }}>
            With <span className="highlight">over three years of experience</span> building tools for hotels, finance, and medical engineering, I leading projects from the first sketch to the final deployment. 
          </p>
          <p className="about-text reveal-item" style={{ marginTop: '16px' }}>
            I lead projects from the first sketch to the final deployment. Whether I am building an AI agent or a property management system, my goal is always the same: <strong className="highlight">Deliver excellence that remains one hundred percent consistent.</strong>
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
