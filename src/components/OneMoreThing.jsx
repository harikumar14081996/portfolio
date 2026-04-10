import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OneMoreThing() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.omt-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'expo.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="one-more-thing" ref={sectionRef}>
      <div className="omt-container">
        <div className="omt-label">One more thing...</div>
        <div className="omt-content">
          <h2 className="omt-title">Everything is possible when you obsess over the details.</h2>
          <p className="omt-subtitle">
            I am looking for partners, not just clients. People who want to 
            build products that leave a dent in the universe.
          </p>
          <a href="#contact" className="omt-cta">
            Begin the Partnership →
          </a>
        </div>
      </div>
    </section>
  );
}
