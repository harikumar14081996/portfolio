import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, CheckCircle2, Home } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function ReviewPage() {
  const [step, setStep] = useState(0); // 0: Intro, 1: Rating, 2: Details, 3: Success
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({ name: '', business: '', content: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setStep(3);
      } else {
        setError('The connection failed. Let us try once more.');
        setStatus('error');
      }
    } catch {
      setError('A system error occurred. We strive for better.');
      setStatus('error');
    }
  };

  const variants = {
    enter: { opacity: 0, scale: 0.95, y: 20 },
    center: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.05, y: -20 }
  };

  return (
    <div className="review-page-v2">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="keynote-slide"
          >
            <span className="section-label">A Visionary Request</span>
            <h1 className="keynote-title">Your voice defines <br/> the next category.</h1>
            <p className="keynote-text">
              "Quality is more important than quantity. One home run is much better than two doubles." <br/>
              Be honest. Help us refine the standard of excellence.
            </p>
            <button className="keynote-btn" onClick={nextStep}>
              ✦ Start Testimonial
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="keynote-slide"
          >
            <span className="section-label">The First Measure</span>
            <h2 className="keynote-subtitle">Rate the Integrity</h2>
            <div className="big-rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`big-star ${rating >= star ? 'active' : ''}`}
                  onClick={() => {
                    setRating(star);
                    setTimeout(nextStep, 400);
                  }}
                >
                  <Star fill={rating >= star ? "var(--accent-primary)" : "none"} size={64} />
                </motion.button>
              ))}
            </div>
            <p className="rating-desc">{rating > 0 ? `${rating} / 5 Quality` : 'Select your standard'}</p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="keynote-slide"
          >
            <span className="section-label">The Final Details</span>
            <form className="keynote-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="keynote-input"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Business / Lead" 
                  className="keynote-input"
                  value={formData.business}
                  onChange={e => setFormData({...formData, business: e.target.value})}
                />
              </div>
              <textarea 
                placeholder="The truth about our journey..." 
                className="keynote-textarea"
                rows={4}
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                required
              />
              <div className="keynote-actions">
                <button type="button" className="action-btn-back" onClick={prevStep}>← Back</button>
                <button type="submit" className="keynote-btn" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Transmitting...' : 'Submit to Legacy ✦'}
                </button>
              </div>
              {error && <p className="form-error">⚠️ {error}</p>}
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="keynote-slide"
          >
            <CheckCircle2 color="var(--accent-primary)" size={80} style={{ marginBottom: '24px' }} />
            <span className="section-label">Testimonial Record</span>
            <h1 className="keynote-title">One more thing...</h1>
            <p className="keynote-text">
              Your story has been permanently recorded. We build products, but more importantly, we build relationships that define industries.
            </p>
            <MagneticButton href="/" variant="primary">✦ Return Home</MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
