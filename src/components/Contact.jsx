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
      <div className="section-label reveal-item" style={{ justifyContent: 'center' }}>Let's Connect</div>
      <h2 className="section-title reveal-item" style={{ textAlign: 'center' }}>
        Ready to Build Something Exceptional?
      </h2>
      <p className="section-subtitle reveal-item" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
        Ready to scale your business or institution? Whether you need a high-performance web platform, 
        intelligent mobile automation, or a complete digital strategy—I deliver robust, 
        production-grade results within 24 hours.
      </p>

      <div className="contact-layout">
        {/* Inquiry Form */}
        <form className="inquiry-form reveal-item" onSubmit={handleSubmit}>
          <h3>📩 Start a Project</h3>

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
              <label htmlFor="inq-type">Project Type</label>
              <select id="inq-type" name="project_type" value={form.project_type} onChange={handleChange}>
                <option value="">Select a type...</option>
                <option value="Institutional / Enterprise Website">Institutional / Enterprise Website</option>
                <option value="Mobile App Development (iOS/Android)">Mobile App Development (Swift/Flutter)</option>
                <option value="Business Automation (n8n / OpenClaw)">Business Automation (n8n / OpenClaw)</option>
                <option value="AI Agent & LLM Integration">AI Agent & LLM Integration</option>
                <option value="Social Media & Digital Management">Social Media & Digital Management</option>
                <option value="Technical Consulting / Code Audit">Technical Consulting / Code Audit</option>
                <option value="Full-Stack Freelance Contract">Full-Stack Freelance Contract</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="inq-budget">Budget Range</label>
              <select id="inq-budget" name="budget" value={form.budget} onChange={handleChange}>
                <option value="">Select budget...</option>
                <option value="< $5K">Less than $5K</option>
                <option value="$5K - $15K">$5K - $15K</option>
                <option value="$15K - $50K">$15K - $50K</option>
                <option value="$50K+">$50K+</option>
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
