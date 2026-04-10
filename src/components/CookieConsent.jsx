import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't decided yet
    const consent = localStorage.getItem('analytics_consent');
    if (!consent) {
      // Small delay so it doesn't block first paint
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('analytics_consent', 'accepted');
    setVisible(false);
    // Custom event to signal consent change without reload
    window.dispatchEvent(new CustomEvent('consent-updated'));
  };

  const handleDecline = () => {
    localStorage.setItem('analytics_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={`consent-banner ${visible ? 'show' : ''}`}>
      <div className="consent-content">
        <div className="consent-icon">🍪</div>
        <div className="consent-text">
          <strong>We value your privacy</strong>
          <p>
            We use anonymized analytics to understand where our visitors are located and improve
            our services. Your data is used for advertising insights only. No personal information
            is collected or shared with third parties.
          </p>
        </div>
        <div className="consent-actions">
          <button className="consent-btn consent-accept" onClick={handleAccept}>
            Accept
          </button>
          <button className="consent-btn consent-decline" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
