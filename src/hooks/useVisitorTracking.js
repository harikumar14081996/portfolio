import { useEffect, useRef } from 'react';

/**
 * Tracks visitor page loads and section views.
 * ONLY sends data if user has consented via the cookie banner.
 */
export function useVisitorTracking() {
  const trackedSections = useRef(new Set());

  useEffect(() => {
    // Only track if user has explicitly consented
    const consent = localStorage.getItem('analytics_consent');
    if (consent !== 'accepted') return;

    // Track initial page load
    sendBeacon('page_load');

    // Track section views via IntersectionObserver
    const sectionIds = ['hero', 'about', 'tech', 'projects', 'journey', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !trackedSections.current.has(entry.target.id)) {
            trackedSections.current.add(entry.target.id);
            sendBeacon(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}

function sendBeacon(section) {
  try {
    const payload = JSON.stringify({
      section,
      referrer: document.referrer || null,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silently fail
  }
}
