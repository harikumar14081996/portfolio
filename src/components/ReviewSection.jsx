import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('relevant');
  const [loading, setLoading] = useState(true);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const sectionRef = useGsapReveal();

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const resp = await fetch(`/api/reviews?sort=${filter}&limit=10`);
        const data = await resp.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
      setLoading(false);
    }
    fetchReviews();
  }, [filter]);

  useEffect(() => {
    if (!scrollRef.current || !trackRef.current || reviews.length === 0) return;
    const updateConstraints = () => {
      const containerWidth = scrollRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      setConstraints({ left: -(trackWidth - containerWidth + 48), right: 0 });
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [reviews]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="section" id="reviews" ref={sectionRef}>
      <div className="section-header-row reveal-item">
        <div>
          <div className="section-label">Words of Integrity</div>
          <h2 className="section-title">The Voice of the Client</h2>
        </div>
        
        <div className="review-filters">
          <button className={`filter-chip ${filter === 'relevant' ? 'active' : ''}`} onClick={() => setFilter('relevant')}>
            Relevant
          </button>
          <button className={`filter-chip ${filter === 'newest' ? 'active' : ''}`} onClick={() => setFilter('newest')}>
            Newest
          </button>
        </div>
      </div>

      <div className="review-slider-wrapper reveal-item">
        <button className="slider-nav-btn left" onClick={() => scroll('left')} aria-label="Previous">
          <ChevronLeft size={24} />
        </button>
        
        <div className="review-slider-window" ref={scrollRef}>
          <motion.div 
            className="review-slider-track-v2" 
            ref={trackRef}
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.1}
          >
            {reviews.map((rev) => (
              <motion.div 
                key={rev.id} 
                className="review-card-modern"
                whileTap={{ cursor: 'grabbing' }}
              >
                <div className="review-card-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < rev.rating ? "var(--accent-primary)" : "none"} 
                      color={i < rev.rating ? "var(--accent-primary)" : "var(--text-muted)"}
                      style={{ marginRight: '4px' }}
                    />
                  ))}
                </div>
                <p className="review-card-content">"{rev.content}"</p>
                <div className="review-card-footer">
                  <div className="author-info">
                    <span className="author-name">{rev.name}</span>
                    {rev.business_name && <span className="author-meta">{rev.business_name}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {loading && <div className="slider-placeholder">Searching for truth...</div>}
            {!loading && reviews.length === 0 && <div className="slider-placeholder">The legacy begins here soon.</div>}
          </motion.div>
        </div>

        <button className="slider-nav-btn right" onClick={() => scroll('right')} aria-label="Next">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}

