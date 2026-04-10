import { useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', href, onClick, variant = 'primary' }) {
  const wrapRef = useRef(null);
  const btnRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;

    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  }, []);

  const Tag = href ? 'a' : 'button';
  const tagProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : { onClick };

  return (
    <div
      ref={wrapRef}
      className="magnetic-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Tag ref={btnRef} className={`magnetic-btn ${variant} ${className}`} {...tagProps}>
        {children}
      </Tag>
    </div>
  );
}
