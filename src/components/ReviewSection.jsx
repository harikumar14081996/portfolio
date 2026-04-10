import { useState, useEffect } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('relevant'); // 'newest' | 'relevant' | 'rating'
  const [loading, setLoading] = useState(true);
  
  const sectionRef = useGsapReveal();

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const resp = await fetch(`/api/reviews?sort=${filter}&limit=6`);
        const data = await resp.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
      setLoading(false);
    }
    fetchReviews();
  }, [filter]);

  return (
    <section className="section" id="reviews" ref={sectionRef}>
      <div className="section-label reveal-item">Social Proof</div>
      <h2 className="section-title reveal-item">The Voice of the Client</h2>
      
      <div className="review-filters reveal-item">
        <button className={`filter-chip ${filter === 'relevant' ? 'active' : ''}`} onClick={() => setFilter('relevant')}>
          Most Relevant
        </button>
        <button className={`filter-chip ${filter === 'newest' ? 'active' : ''}`} onClick={() => setFilter('newest')}>
          Newest
        </button>
        <button className={`filter-chip ${filter === 'rating' ? 'active' : ''}`} onClick={() => setFilter('rating')}>
          Top Rated
        </button>
      </div>

      <div className="reviews-grid">
        {reviews.map((rev, i) => (
          <div key={rev.id} className="review-card reveal-item">
            <div className="review-card-stars">
              {'✦'.repeat(rev.rating)}{'✧'.repeat(5 - rev.rating)}
            </div>
            <p className="review-card-content">"{rev.content}"</p>
            <div className="review-card-author">
              <span className="author-name">{rev.name}</span>
              {rev.business_name && <span className="author-meta">{rev.business_name}</span>}
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="admin-muted" style={{ textAlign: 'center', padding: '40px' }}>
          Searching for truth...
        </div>
      )}

      {reviews.length === 0 && !loading && (
        <div className="admin-muted" style={{ textAlign: 'center', padding: '40px' }}>
          The legacy is beginning. No approved reviews yet.
        </div>
      )}
    </section>
  );
}
