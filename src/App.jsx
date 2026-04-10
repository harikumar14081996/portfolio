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
import FloatingEmail from './components/FloatingEmail';
import CookieConsent from './components/CookieConsent';
import AdminDashboard from './components/AdminDashboard';
import { useVisitorTracking } from './hooks/useVisitorTracking';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isAdmin, setIsAdmin] = useState(false);

  // Track visitors (only runs if user consented)
  useVisitorTracking();

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }

    // Check if on admin route
    const checkAdmin = () => setIsAdmin(window.location.hash === '#/admin');
    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);
    return () => window.removeEventListener('hashchange', checkAdmin);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  };

  // Admin route — only accessible by manually typing #/admin
  if (isAdmin) {
    return (
      <div className="app" data-theme="dark">
        <AdminDashboard />
      </div>
    );
  }

  // Default: Portfolio (no admin link visible anywhere)
  return (
    <div className="app">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <About />
      <Services />
      <Projects />
      <AcademicProjects />
      <Timeline />
      <WhyMe />
      <Contact />
      <FloatingEmail />
      <CookieConsent />
      <footer className="footer">
        <p>© {new Date().getFullYear()} Harikumar Patel</p>
      </footer>
    </div>
  );
}
