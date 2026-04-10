import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.5 });
      const tl = gsap.timeline();
      tl.from(contentRef.current, { 
        scale: 0.95, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'expo.out' 
      })
      .from('.modal-header', { opacity: 0, y: 15, duration: 0.5 }, '-=0.5')
      .from('.modal-section', { opacity: 0, y: 15, duration: 0.5, stagger: 0.1 }, '-=0.3');
    });

    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEscape);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-content" ref={contentRef}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{project.icon}</div>
          <h2 className="modal-title">{project.title}</h2>
          <div className="modal-role">{project.role}</div>
        </div>

        <div className="modal-section">
          <h3>The Challenge</h3>
          <p>{project.problem}</p>
        </div>

        <div className="modal-section">
          <h3>My Solution</h3>
          <p>{project.solution}</p>
        </div>

        <div className="modal-section">
          <h3>Architecture</h3>
          <div className="arch-diagram">
            {project.arch.map((layer, i) => (
              <div key={i} className="arch-layer">
                <div className="arch-row">
                  {(Array.isArray(layer) ? layer : [layer]).map((node, j) => (
                    <span key={j} className="arch-node">{node}</span>
                  ))}
                </div>
                {i < project.arch.length - 1 && <div className="arch-arrow-down">↓</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <h3>Business Impact</h3>
          <ul className="modal-impact-list">
            {project.impact.map((item, i) => (
              <li key={i}><strong>{item.bold}:</strong> {item.text}</li>
            ))}
          </ul>
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="modal-link">
            {project.linkLabel}
          </a>
        )}
      </div>
    </div>
  );
}
