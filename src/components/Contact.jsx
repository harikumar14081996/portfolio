import { useState } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';

export default function Contact() {
  const sectionRef = useGsapReveal();
  const [form, setForm] = useState({ name: '', email: '', project_type: '', budget: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const resp = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await resp.json();

      if (resp.ok) {
        setStatus('success');
        setForm({ name: '', email: '', project_type: '', budget: '', message: '' });
      } else {
        setErrorMsg(data.error || 'Something went wrong');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="section-label reveal-item" style={{ justifyContent: 'center' }}>Let us Connect</div>
      <h2 className="section-title reveal-item" style={{ textAlign: 'center' }}>
        Are you ready to build the future?
      </h2>
      <p className="section-subtitle reveal-item" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
        Are you ready to scale your business or institution? Whether you need a perfectly tuned web platform or 
        intelligent mobile automation, I deliver robust and production scale results.
      </p>

      <div className="contact-layout">
        {/* Inquiry Form */}
        <form className="inquiry-form reveal-item" onSubmit={handleSubmit}>
          <h3>📩 Start a Partnership</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="inq-name">Full Name *</label>
              <input id="inq-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="inq-email">Email Address *</label>
              <input id="inq-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="inq-type">Nature of Project</label>
              <select id="inq-type" name="project_type" value={form.project_type} onChange={handleChange}>
                <option value="">Select a type...</option>
                <option value="Institutional and Enterprise Foundation">Institutional and Enterprise Foundation</option>
                <option value="Universal Mobile Application">Universal Mobile Application</option>
                <option value="The Future of Business Automation">The Future of Business Automation</option>
                <option value="Intelligence and Language Model Integration">Intelligence and Language Model Integration</option>
                <option value="Digital Presence and Strategy">Digital Presence and Strategy</option>
                <option value="Technical Consulting and Code Audits">Technical Consulting and Code Audits</option>
                <option value="Full Stack Partnership">Full Stack Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="inq-budget">Project Investment</label>
              <select id="inq-budget" name="budget" value={form.budget} onChange={handleChange}>
                <option value="">Select range...</option>
                <option value="Under $5000">Under $5000</option>
                <option value="$5000 to $15000">$5000 to $15000</option>
                <option value="$15000 to $50000">$15000 to $50000</option>
                <option value="Over $50000">Over $50000</option>
                <option value="Not sure">Not sure yet</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inq-msg">Message *</label>
            <textarea
              id="inq-msg"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project, timeline, and any specific requirements..."
              rows={5}
              required
            />
          </div>

          {status === 'success' && (
            <div className="form-success">✅ Thank you! Your inquiry has been submitted. I'll get back to you within 24 hours.</div>
          )}
          {status === 'error' && (
            <div className="form-error">❌ {errorMsg}</div>
          )}

          <button type="submit" className="form-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Inquiry →'}
          </button>
        </form>

        {/* Contact Info Sidebar */}
        <div className="contact-sidebar reveal-item">
          <h3>📬 Direct Contact</h3>
          <div className="contact-info-stack">
            <div className="contact-item-card">
              <span className="contact-item-icon">📧</span>
              <div>
                <div className="contact-item-label">Email</div>
                <a href="mailto:harikumarpatel14@gmail.com">harikumarpatel14@gmail.com</a>
              </div>
            </div>
            <div className="contact-item-card">
              <span className="contact-item-icon">🔗</span>
              <div>
                <div className="contact-item-label">LinkedIn</div>
                <a href="https://www.linkedin.com/in/harikumarpatel" target="_blank" rel="noopener noreferrer">linkedin.com/in/harikumarpatel</a>
              </div>
            </div>
            <div className="contact-item-card">
              <span className="contact-item-icon">📍</span>
              <div>
                <div className="contact-item-label">Location</div>
                <span>Surrey, British Columbia, Canada</span>
              </div>
            </div>
          </div>
          <div className="response-badge">
            ⚡ Average response time: <strong>Under 24 hours</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
