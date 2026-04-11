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
            <span className="section-label">Tell Your Story</span>
            <h1 className="keynote-title">Your feedback helps <br/> us grow.</h1>
            <p className="keynote-text">
              "Great projects are built on honest feedback." <br/>
              I value your experience above all else. Please tell me how our journey together has been so far.
            </p>
            <button className="keynote-btn" onClick={nextStep}>
              ✦ Share My Feedback
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
            <span className="section-label">Your Experience</span>
            <h2 className="keynote-subtitle">How satisfied were you?</h2>
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
            <p className="rating-desc">{rating > 0 ? `${rating} / 5 Satisfaction` : 'Select your rating'}</p>
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
                  placeholder="Business / Category" 
                  className="keynote-input"
                  value={formData.business}
                  onChange={e => setFormData({...formData, business: e.target.value})}
                />
              </div>
              <textarea 
                placeholder="What was it like working together?" 
                className="keynote-textarea"
                rows={4}
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                required
              />
              <div className="keynote-actions">
                <button type="button" className="action-btn-back" onClick={prevStep}>← Back</button>
                <button type="submit" className="keynote-btn" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : 'Submit Feedback ✦'}
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
            <span className="section-label">Success</span>
            <h1 className="keynote-title">Thank You!</h1>
            <p className="keynote-text">
              Your feedback is very important to me. I build software, but I value the people I build it for even more.
            </p>
            <MagneticButton href="/" variant="primary">✦ Return Home</MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
