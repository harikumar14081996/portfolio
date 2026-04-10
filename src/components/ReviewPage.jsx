import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGsapReveal } from '../hooks/useGsapReveal';
import MagneticButton from './MagneticButton';

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ name: '', business: '', content: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [error, setError] = useState('');
  
  const sectionRef = useGsapReveal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating to share your truth.');
      return;
    }
    
    setStatus('submitting');
    try {
      const resp = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          business_name: formData.business,
          rating: rating,
          content: formData.content
        })
      });
      
      if (resp.ok) {
        setStatus('success');
        gsap.from('.success-content', { opacity: 0, scale: 0.9, duration: 1, ease: 'expo.out' });
      } else {
        setError('The connection failed. Let us try once more.');
        setStatus('error');
      }
    } catch {
      setError('A system error occurred. We strive for better.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="review-page success-state success-content">
        <div className="section-label">Legacy Secured</div>
        <h1 className="hero-name">One more thing...</h1>
        <p className="about-text" style={{ maxWidth: '600px', margin: '24px auto' }}>
          Your story has been recorded. We do not just build products; we build relationships that last. 
          Thank you for being part of the journey toward perfection.
        </p>
        <MagneticButton href="/" variant="primary">✦ Return home</MagneticButton>
      </div>
    );
  }

  return (
    <div className="review-page" ref={sectionRef}>
      <div className="review-container">
        <div className="section-label reveal-item">The Voice of Quality</div>
        <h1 className="section-title reveal-item">Your Story Matters</h1>
        <p className="about-text reveal-item" style={{ marginBottom: '40px' }}>
          "Design is a funny word. Some people think it means how it looks. But of course, if you dig deeper, 
          it’s really <span className="highlight">how it works</span>." <br/><br/>
          Tell us about your experience. Be honest. Be bold. Help us define the next standard of excellence.
        </p>

        <form className="review-form reveal-item" onSubmit={handleSubmit}>
          <div className="rating-selector">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${(hoverRating || rating) >= star ? 'active' : ''}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                ✦
              </button>
            ))}
            <span className="rating-label">{rating ? `${rating} / 5 Quality` : 'Select your rating'}</span>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Your Name</label>
              <input 
                type="text" 
                placeholder="Who are you?" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Business / Institution</label>
              <input 
                type="text" 
                placeholder="Where do you lead?" 
                value={formData.business}
                onChange={e => setFormData({...formData, business: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group" style={{ marginTop: '24px' }}>
            <label>The Truth about our Collaboration</label>
            <textarea 
              placeholder="Tell the world how we changed the game..." 
              rows={6}
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              required
            />
          </div>

          {error && <p className="form-error">⚠️ {error}</p>}

          <button className="submit-review-btn" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Transmitting...' : 'Submit to Legacy'}
          </button>
        </form>
      </div>
    </div>
  );
}
