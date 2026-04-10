import { useState, useEffect } from 'react';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'tech', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track which section is currently in view
      const sections = navItems.map(item => document.getElementById(item.id));
      let current = '';
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <span className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-bracket">{'<'}</span>
          <span className="logo-text">HP</span>
          <span className="logo-bracket">{' />'}</span>
        </span>

        {/* Desktop nav links with active indicator */}
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                onClick={() => scrollTo(item.id)}
                className={activeSection === item.id ? 'nav-active' : ''}
              >
                {item.label}
                <span className="nav-indicator" />
              </a>
            </li>
          ))}
          <li className="nav-divider" />
          <li>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <span className={`theme-icon ${theme === 'dark' ? 'icon-sun' : 'icon-moon'}`}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </span>
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile backdrop overlay — click to close */}
      {menuOpen && <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />}

      {/* Mobile slide-in menu */}
      <div className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
        {/* Close button inside mobile menu */}
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          ✕
        </button>

        {navItems.map((item) => (
          <a key={item.id} onClick={() => scrollTo(item.id)} className={activeSection === item.id ? 'nav-active' : ''}>
            {item.label}
          </a>
        ))}
        <button className="theme-toggle mobile-theme" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  );
}
