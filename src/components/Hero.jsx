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

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from('.hero-photo-wrapper', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' })
        .from('.hero-greeting', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.hero-name', { opacity: 0, y: 30, duration: 0.6 }, '-=0.2')
        .from('.hero-typed', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.hero-desc', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.hero-buttons', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.2');
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
      links: { color: particleLineColor, distance: 150, enable: true, opacity: 0.5, width: 1 },
      move: { enable: true, speed: 1.2, direction: 'none', outModes: { default: 'bounce' } },
      number: { value: 60, density: { enable: true, area: 800 } },
      opacity: { value: 0.5 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        resize: true,
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.8 } },
      },
    },
    detectRetina: true,
  }), [particleColor, particleLineColor]);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {particlesReady && (
        <Particles id="hero-particles" className="hero-particles" options={particlesOptions} />
      )}
      <div className="hero-content">
        <div className="hero-photo-wrapper" onClick={() => setIsImageOpen(true)} style={{ cursor: 'pointer' }}>
          <img src="/Hari.jpg" alt="Harikumar Patel at Google DevFest" className="hero-photo" />
          <div className="hero-photo-hint">Click to view</div>
        </div>
        <p className="hero-greeting mono">Hello, I'm</p>
        <h1 className="hero-name">Harikumar Patel</h1>
        <div className="hero-father-name mono">
          S/O Rajnikant Thakorbhai Patel
        </div>
        <div className="hero-typed">
          <TypeAnimation
            sequence={[
              'Building Enterprise Platforms', 2000,
              'Architecting AI Solutions', 2000,
              'Engineering Mobile Experiences', 2000,
              'Designing Scalable Cloud Systems', 2000,
              'Creating IoT Innovations', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        <p className="hero-desc">
          Full-Stack & Mobile Engineer crafting robust, scalable software
          across web, mobile, cloud, and AI - based in Surrey, BC 🇨🇦
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
