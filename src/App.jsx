import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/TechStack';
import Projects from './components/Projects';
import AcademicProjects from './components/AcademicProjects';
import Timeline from './components/Timeline';
import WhyMe from './components/WhyMe';
import Contact from './components/Contact';
import OneMoreThing from './components/OneMoreThing';
import FloatingEmail from './components/FloatingEmail';
import CookieConsent from './components/CookieConsent';
import ReviewSection from './components/ReviewSection';
import ReviewPage from './components/ReviewPage';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReviewPage, setIsReviewPage] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);

  // Track visitors (only runs if user consented)
  useVisitorTracking();

  useEffect(() => {
    // Fetch social links
    fetch('/api/config/social_links')
      .then(r => r.json())
      .then(data => setSocialLinks(data.links || []))
      .catch(() => {});

    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
    
    // Check if on admin or review route
    const checkRoute = () => {
      setIsAdmin(window.location.hash === '#/admin');
      setIsReviewPage(window.location.hash === '#/review');
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  };

  // Admin route
  if (isAdmin) {
    return (
      <div className="app" data-theme="dark">
        <AdminDashboard />
      </div>
    );
  }

  // Review submission page (Keynote style)
  if (isReviewPage) {
    return (
      <div className="app">
        <ReviewPage />
      </div>
    );
  }

  // Default: Portfolio
  return (
    <div className="app">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <About />
      <Services />
      <ReviewSection />
      <Projects />
      <AcademicProjects />
      <Timeline />
      <WhyMe />
      <Contact />
      <OneMoreThing />
      <FloatingEmail />
      <CookieConsent />
      <footer className="footer">
        <div className="footer-social">
          {socialLinks.filter(l => l.visible).map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link-pill">
              <span className="social-icon">{link.icon}</span>
              <span className="social-platform">{link.platform}</span>
            </a>
          ))}
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Harikumar Patel</p>
      </footer>
    </div>
  );
}

