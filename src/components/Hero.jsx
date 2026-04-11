import { useEffect, useRef, useCallback, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import { useState } from 'react';

export default function Hero({ theme }) {
  const heroRef = useRef(null);
  const [particlesReady, setParticlesReady] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!contentRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(contentRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.2,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from('.hero-photo-wrapper', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power4.out' })
        .from('.hero-greeting', { opacity: 0, y: 15, duration: 0.6 }, '-=0.8')
        .from('.hero-name', { opacity: 0, y: 30, duration: 0.8, ease: 'power4.out' }, '-=0.6')
        .from('.hero-father-badge', { opacity: 0, scale: 0.9, duration: 0.8 }, '-=0.5')
        .from('.hero-typed', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
        .from('.hero-desc', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
        .from('.hero-buttons', { opacity: 0, scale: 0.95, duration: 0.8 }, '-=0.4')
        .from('.scroll-indicator', { opacity: 0, duration: 1 }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const particleColor = theme === 'dark' ? '#8b5cf6' : '#4f46e5';
  const particleLineColor = theme === 'dark' ? 'rgba(139,92,246,0.15)' : 'rgba(79,70,229,0.12)';

  const particlesOptions = useMemo(() => ({
    fullScreen: false,
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      color: { value: particleColor },
      links: { color: particleLineColor, distance: 150, enable: true, opacity: 0.4, width: 1 },
      move: { enable: true, speed: 0.8, direction: 'none', outModes: { default: 'bounce' } },
      number: { value: 50, density: { enable: true, area: 800 } },
      opacity: { value: 0.3 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 2 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        resize: true,
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.5 } },
      },
    },
    detectRetina: true,
  }), [particleColor, particleLineColor]);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {particlesReady && (
        <Particles id="hero-particles" className="hero-particles" options={particlesOptions} />
      )}
      <div className="hero-content" ref={contentRef}>
        <div className="hero-photo-wrapper" onClick={() => setIsImageOpen(true)} style={{ cursor: 'pointer' }}>
          <img src="/Hari.jpg" alt="Harikumar Patel at Google DevFest" className="hero-photo" />
          <div className="hero-photo-hint">Click to view</div>
        </div>
        <p className="hero-greeting mono">Hello, I am</p>
        <h1 className="hero-name">Harikumar Patel</h1>
        <div className="hero-father-badge">S/O Harshadbhai Patel</div>

        <div className="hero-typed">
          <TypeAnimation
            sequence={[
              'Designing the Future of Web', 2000,
              'Engineering Intelligence within Every Device', 2000,
              'Creating Software that just Works', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        <p className="hero-desc">
          I believe in the intersection of technology and liberal arts. I build production grade software that feels as good as it looks. From vast cloud systems to intelligent local agents, I help visionary teams ship results that define their category.
        </p>
        <div className="hero-buttons">
          <MagneticButton href="#projects" variant="primary">
            ✦ View My Work
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary">
            ✉ Get in Touch
          </MagneticButton>
        </div>
      </div>
      <div className="scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        ▼
      </div>

      {isImageOpen && (
        <div className="image-modal-overlay" onClick={() => setIsImageOpen(false)}>
          <button className="modal-close" onClick={() => setIsImageOpen(false)}>✕</button>
          <img src="/Hari.jpg" alt="Harikumar Patel full size" className="image-modal-content" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
