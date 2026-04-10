import { useGsapReveal } from '../hooks/useGsapReveal';

const reasons = [
  {
    icon: '🔧',
    title: 'Pure Full Stack Expertise',
    desc: "Most developers stay in one layer. I bridge the gap between human experience and digital architecture. I have shipped production code across every surface from mobile to cloud.",
  },
  {
    icon: '📊',
    title: 'Results You Can Measure',
    desc: 'Every project comes with success you can feel. Flawless delivery and ninety eight percent bug free rates. I do not just ship code. I ship success.',
  },
  {
    icon: '🏛️',
    title: 'Enterprise Grade Architecture',
    desc: "I do not build fragile prototypes. I use proven patterns like Repository and MVVM. I build systems that are designed to grow with your ambition.",
  },
  {
    icon: '🌍',
    title: 'A Global Perspective',
    desc: 'Educated in Canada with deep professional roots in the fast world of international software. I bring global standards to every local partnership.',
  },
  {
    icon: '🤖',
    title: 'The Edge of Innovation',
    desc: 'From local intelligence engines to the systems defining the next decade. I stay ahead of the curve so your business does too.',
  },
  {
    icon: '🔄',
    title: 'Agile by Nature',
    desc: "Planning and execution managed with precision. I have lived the agile philosophy across global companies and delivered vast gains in productivity.",
  },
];

export default function WhyMe() {
  const sectionRef = useGsapReveal();

  return (
    <section className="section" id="whyme" ref={sectionRef}>
      <div className="section-label reveal-item" style={{ justifyContent: 'center' }}>The Harikumar Difference</div>
      <h2 className="section-title reveal-item" style={{ textAlign: 'center' }}>Why Work With Me</h2>
      <p className="section-subtitle reveal-item" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
        Six reasons why I am the right partner for your visionary goals.
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
