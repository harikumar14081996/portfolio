import { useState, useEffect, useCallback, useMemo } from 'react';
import AdminLogin from './AdminLogin';
import { 
  Check, Trash2, Eye, EyeOff, Star, Mail, ArrowLeft, Search, 
  ExternalLink, BarChart3, Users, MessageSquare, Share2, Settings, LogOut, Menu, X
} from 'lucide-react';

export default function AdminDashboard() {
  const [token, setToken] = useState(sessionStorage.getItem('analytics_token'));
  const [activeTab, setActiveTab] = useState('analytics');
  const [stats, setStats] = useState(null);
  const [visits, setVisits] = useState([]);
  const [filters, setFilters] = useState({ countries: [], regions: [], cities: [] });
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [days, setDays] = useState(30);
  const [nearby, setNearby] = useState(null);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [revCounts, setRevCounts] = useState([]);
  const [revLoading, setRevLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialSaving, setSocialSaving] = useState(false);

  const [inquiries, setInquiries] = useState([]);
  const [inqLoading, setInqLoading] = useState(false);
  const [inqCounts, setInqCounts] = useState({ new: 0, total: 0 });
  const [inqSearch, setInqSearch] = useState('');
  const [inqMobileFocus, setInqMobileFocus] = useState(false);



  // Password change state
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwStatus, setPwStatus] = useState('');  // '' | 'saving' | 'success' | 'error'
  const [pwError, setPwError] = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchStats = useCallback(async () => {
    try {
      const resp = await fetch('/api/visits/stats', { headers });
      if (resp.status === 401) { handleLogout(); return; }
      const data = await resp.json();
      setStats(data);
    } catch { /* silent */ }
  }, [token]);

  const fetchVisits = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ days: String(days) });
      if (selectedCountry) params.set('country', selectedCountry);
      if (selectedRegion) params.set('region', selectedRegion);
      if (selectedCity) params.set('city', selectedCity);

      const resp = await fetch(`/api/visits?${params}`, { headers });
      if (resp.status === 401) { handleLogout(); return; }
      const data = await resp.json();
      setVisits(data.visits || []);
      setFilters(data.filters || { countries: [], regions: [], cities: [] });
    } catch { /* silent */ }
    setLoading(false);
  }, [token, selectedCountry, selectedRegion, selectedCity, days]);

  const fetchNearby = async (lat, lon) => {
    setNearbyLoading(true);
    setNearby(null);
    try {
      const resp = await fetch(`/api/nearby?lat=${lat}&lon=${lon}`, { headers });
      const data = await resp.json();
      setNearby(data.businesses || []);
    } catch {
      setNearby([]);
    }
    setNearbyLoading(false);
  };

  const fetchReviews = useCallback(async () => {
    setRevLoading(true);
    try {
      const resp = await fetch('/api/admin/reviews', { headers });
      if (resp.status === 401) { handleLogout(); return; }
      const data = await resp.json();
      setReviews(data.reviews || []);
      setRevCounts(data.statusCounts || []);
    } catch { /* silent */ }
    setRevLoading(false);
  }, [token]);

  const updateReview = async (id, updates) => {
    try {
      const resp = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (resp.ok) fetchReviews();
    } catch { /* silent */ }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this review?')) return;
    try {
      const resp = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (resp.ok) fetchReviews();
    } catch { /* silent */ }
  };

  const createSampleReviews = async () => {
    const samples = [
      { name: "Julian V.", business: "Stellar Dynamics", rating: 5, content: "The level of engineering integrity here is something we haven't seen since the early days of X. Absolute perfection." },
      { name: "Elena R.", business: "Quantum Leap AI", rating: 5, content: "Integrating GPT-4o was seamless. The agentic workflows actually think before they act. It's transformed our stack." },
      { name: "Marcus Thorne", business: "Thorne Global", rating: 4, content: "The bento grid UI is breathtaking. Our clients finally feel like they're using a tool from the next decade." },
      { name: "Sarah Chen", business: "Innovate Labs", rating: 5, content: "Custom SVG animations and deep research capabilities. This is exactly what the industry was missing." }
    ];

    for (const s of samples) {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s)
      });
    }
    fetchReviews();
  };

  const fetchSocialConfig = useCallback(async () => {
    setSocialLoading(true);
    try {
      const resp = await fetch('/api/config/social_links', { headers });
      const data = await resp.json();
      setSocialLinks(data.links || []);
    } catch { /* silent */ }
    setSocialLoading(false);
  }, [token]);

  const saveSocialConfig = async () => {
    setSocialSaving(true);
    try {
      await fetch('/api/config/social_links', {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: socialLinks }),
      });
    } catch { /* silent */ }
    setSocialSaving(false);
  };

  const fetchInquiries = useCallback(async () => {
    setInqLoading(true);
    try {
      const resp = await fetch('/api/inquiries', { headers });
      if (resp.status === 401) { handleLogout(); return; }
      const data = await resp.json();
      setInquiries(data.inquiries || []);
      const newCount = (data.inquiries || []).filter(i => i.status === 'new').length;
      setInqCounts({ new: newCount, total: (data.inquiries || []).length });
    } catch { /* silent */ }
    setInqLoading(false);
  }, [token]);

  const updateInquiry = async (id, status) => {
    try {
      const resp = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (resp.ok) fetchInquiries();
    } catch { /* silent */ }
  };
  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead?')) return;
    try {
      const resp = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (resp.ok) {
        fetchInquiries();
        setSelectedVisit(null);
        setInqMobileFocus(false);
      }
    } catch { /* silent */ }
  };


  useEffect(() => {
    if (token) {
      fetchStats();
      fetchVisits();
      fetchReviews();
      fetchSocialConfig();
      fetchInquiries();
    }
  }, [token, fetchStats, fetchVisits, fetchReviews, fetchSocialConfig, fetchInquiries]);

  const handleLogout = () => {
    sessionStorage.removeItem('analytics_token');
    setToken(null);
  };

  const handleVisitClick = (visit) => {
    setSelectedVisit(visit);
    if (visit.latitude && visit.longitude) {
      fetchNearby(visit.latitude, visit.longitude);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(iq => 
      iq.name.toLowerCase().includes(inqSearch.toLowerCase()) || 
      iq.email.toLowerCase().includes(inqSearch.toLowerCase()) ||
      iq.subject.toLowerCase().includes(inqSearch.toLowerCase())
    );
  }, [inquiries, inqSearch]);

  const selectInquiry = (inq) => {
    setSelectedVisit(inq);
    if (window.innerWidth <= 768) {
      setInqMobileFocus(true);
    }
  };

  if (!token) {
    return <AdminLogin onLogin={(t) => setToken(t)} />;
  }

  return (
    <div className={`admin-saas-container ${mobileMenuOpen ? 'menu-open' : ''}`}>
      {/* Mobile Bar */}
      <div className="admin-mobile-bar">
        <div className="admin-sidebar-logo" style={{ marginBottom: 0 }}>
          <span className="logo-bracket">{'<'}</span>
          <span className="logo-text">HP</span>
          <span className="logo-bracket">{' />'}</span>
        </div>
        <button className={`admin-hamburger ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`admin-saas-sidebar ${mobileMenuOpen ? 'show' : ''}`}>
        <div className="admin-sidebar-logo desktop-only" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <span className="logo-bracket">{'<'}</span>
          <span className="logo-text">HP</span>
          <span className="logo-bracket">{' />'}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px', fontWeight: '400' }}>ADMIN</span>
        </div>

        <nav className="admin-sidebar-nav">
          <button 
            className={`admin-sidebar-btn ${activeTab === 'analytics' ? 'active' : ''}`} 
            onClick={() => switchTab('analytics')}
          >
            <BarChart3 size={18} /> <span>Analytics</span>
          </button>

          <button 
            className={`admin-sidebar-btn ${activeTab === 'reviews' ? 'active' : ''}`} 
            onClick={() => switchTab('reviews')}
          >
            <Star size={18} /> <span>Reviews</span>
          </button>

          <button 
            className={`admin-sidebar-btn ${activeTab === 'inquiries' ? 'active' : ''}`} 
            onClick={() => switchTab('inquiries')}
          >
            <Mail size={18} /> <span>Inquiries</span>
            {inqCounts.new > 0 && <span className="tab-badge">{inqCounts.new}</span>}
          </button>

          <button 
            className={`admin-sidebar-btn ${activeTab === 'social' ? 'active' : ''}`} 
            onClick={() => switchTab('social')}
          >
            <Share2 size={18} /> <span>Social</span>
          </button>

          <button 
            className={`admin-sidebar-btn ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => switchTab('settings')}
          >
            <Settings size={18} /> <span>Settings</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" className="admin-sidebar-btn" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={18} /> <span>Back to Site</span>
          </a>
          <button onClick={handleLogout} className="admin-sidebar-btn" style={{ color: '#ef4444' }}>
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        <header className="admin-section-header">
          {activeTab === 'analytics' && (
            <>
              <h2>Analytics Overview</h2>
              <p>Real-time insights on your portfolio visitors and engagement.</p>
            </>
          )}

          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <h2>Manage Reviews</h2>
                <p>Curate the social proof displayed on your home page.</p>
              </div>
              <button className="admin-btn" onClick={createSampleReviews}>
                ✦ Seed Masterpiece Reviews
              </button>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <>
              <h2>Inquiry Management</h2>
              <p>Track and respond to client inquiries from your contact form.</p>
            </>
          )}

          {activeTab === 'social' && (
            <>
              <h2>Social Orchestration</h2>
              <p>Manage your public links and digital presence across the web.</p>
            </>
          )}

          {activeTab === 'settings' && (
            <>
              <h2>Account Settings</h2>
              <p>Manage your administrative credentials and security.</p>
            </>
          )}
        </header>

        {/* Stats Grid */}
        {activeTab === 'analytics' && stats && (
          <div className="admin-stat-grid">
            <div className="admin-glass-card">
              <div className="stat-desc">Total Visits</div>
              <div className="stat-value">{stats.total?.toLocaleString()}</div>
            </div>
            <div className="admin-glass-card">
              <div className="stat-desc">Unique Countries</div>
              <div className="stat-value">{stats.uniqueCountries}</div>
            </div>
            <div className="admin-glass-card">
              <div className="stat-desc">Unique Cities</div>
              <div className="stat-value">{stats.uniqueCities}</div>
            </div>
            <div className="admin-glass-card">
              <div className="stat-desc">Mobile Reach</div>
              <div className="stat-value">
                {stats.deviceBreakdown?.find(d => d.device_type === 'mobile')?.count || 0}
              </div>
            </div>
          </div>
        )}

      {/* Charts Row */}
      {activeTab === 'analytics' && stats && (
        <div className="admin-charts" style={{ marginTop: '24px' }}>
          {/* Daily Trend */}
          <div className="admin-glass-card">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-muted)' }}>DAILY VISITS (LAST 30 DAYS)</h3>
            <div className="mini-chart">
              {stats.dailyCounts?.length > 0 ? (
                <svg viewBox={`0 0 ${stats.dailyCounts.length * 20} 100`} className="chart-svg">
                  {stats.dailyCounts.map((d, i) => {
                    const maxCount = Math.max(...stats.dailyCounts.map(dc => dc.count), 1);
                    const h = (d.count / maxCount) * 80;
                    return (
                      <g key={i}>
                        <rect
                          x={i * 20 + 2}
                          y={100 - h - 10}
                          width={16}
                          height={h}
                          rx={3}
                          className="chart-bar"
                        />
                        <title>{d.day}: {d.count} visits</title>
                      </g>
                    );
                  })}
                </svg>
              ) : <p className="admin-muted">No data yet</p>}
            </div>
          </div>

          {/* Top Countries */}
          <div className="admin-glass-card">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-muted)' }}>TOP COUNTRIES</h3>
            <div className="top-list">
              {stats.topCountries?.map((c, i) => (
                <div key={i} className="top-item">
                  <span className="top-label">{getFlagEmoji(c.country)} {c.country}</span>
                  <span className="top-count">{c.count}</span>
                  <div className="top-bar">
                    <div
                      className="top-bar-fill"
                      style={{ width: `${(c.count / (stats.topCountries[0]?.count || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Cities */}
          <div className="admin-glass-card">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-muted)' }}>TOP CITIES</h3>
            <div className="top-list">
              {stats.topCities?.map((c, i) => (
                <div key={i} className="top-item">
                  <span className="top-label">📍 {c.city}, {c.region}</span>
                  <span className="top-count">{c.count}</span>
                  <div className="top-bar">
                    <div
                      className="top-bar-fill"
                      style={{ width: `${(c.count / (stats.topCities[0]?.count || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Views */}
          <div className="admin-glass-card">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-muted)' }}>SECTION VIEWS</h3>
            <div className="top-list">
              {stats.sectionViews?.map((s, i) => (
                <div key={i} className="top-item">
                  <span className="top-label">{getSectionIcon(s.page_section)} {s.page_section}</span>
                  <span className="top-count">{s.count}</span>
                  <div className="top-bar">
                    <div
                      className="top-bar-fill"
                      style={{ width: `${(s.count / (stats.sectionViews[0]?.count || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      {activeTab === 'analytics' && (
      <div className="admin-filters">
        <h3>🔍 Filter Visits</h3>
        <div className="filter-row">
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="admin-select">
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
            <option value={9999}>All time</option>
          </select>

          <select
            value={selectedCountry}
            onChange={(e) => { setSelectedCountry(e.target.value); setSelectedRegion(''); setSelectedCity(''); }}
            className="admin-select"
          >
            <option value="">All Countries</option>
            {filters.countries.map(c => <option key={c} value={c}>{getFlagEmoji(c)} {c}</option>)}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => { setSelectedRegion(e.target.value); setSelectedCity(''); }}
            className="admin-select"
            disabled={!selectedCountry}
          >
            <option value="">All States/Provinces</option>
            {filters.regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="admin-select"
            disabled={!selectedRegion}
          >
            <option value="">All Cities</option>
            {filters.cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      )}

      {/* Visits Table + Nearby Panel */}
      {activeTab === 'analytics' && (
      <div className="admin-content" style={{ marginTop: '24px', alignItems: 'flex-start' }}>
        <div className="admin-glass-card admin-table-wrapper" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-muted)' }}>RECENT VISITS {loading && '⏳'}</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>City</th>
                <th>Region</th>
                <th>Country</th>
                <th>Section</th>
                <th>Device</th>
                <th>Coords</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((v) => (
                <tr
                  key={v.id}
                  className={`visit-row ${selectedVisit?.id === v.id ? 'selected' : ''}`}
                  onClick={() => handleVisitClick(v)}
                >
                  <td>{formatTime(v.timestamp)}</td>
                  <td>{v.city || '—'}</td>
                  <td>{v.region || '—'}</td>
                  <td>{v.country ? `${getFlagEmoji(v.country)} ${v.country}` : '—'}</td>
                  <td><span className="section-badge">{v.page_section}</span></td>
                  <td>{getDeviceIcon(v.device_type)}</td>
                  <td className="coords">
                    {v.latitude && v.longitude
                      ? `${Number(v.latitude).toFixed(4)}, ${Number(v.longitude).toFixed(4)}`
                      : '—'}
                  </td>
                </tr>
              ))}
              {visits.length === 0 && !loading && (
                <tr><td colSpan={7} className="admin-muted" style={{ textAlign: 'center', padding: '40px' }}>No visits found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nearby Businesses Panel */}
        {selectedVisit && (
          <div className="nearby-panel">
            <h3>
              🏢 Nearby Businesses
              {selectedVisit.city && <span className="nearby-city"> — {selectedVisit.city}, {selectedVisit.region}</span>}
            </h3>
            {nearbyLoading ? (
              <div className="admin-muted" style={{ padding: '20px', textAlign: 'center' }}>Loading nearby businesses...</div>
            ) : nearby && nearby.length > 0 ? (
              <ul className="nearby-list">
                {nearby.map((b, i) => (
                  <li key={i} className="nearby-item">
                    <div className="nearby-name">{getBusinessIcon(b.type)} {b.name}</div>
                    <div className="nearby-meta">
                      <span className="nearby-type">{b.type}</span>
                      {b.address && <span>{b.address}</span>}
                    </div>
                    {b.website && (
                      <a href={b.website} target="_blank" rel="noopener noreferrer" className="nearby-link">
                        Visit Website →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : nearby && nearby.length === 0 ? (
              <div className="admin-muted" style={{ padding: '20px', textAlign: 'center' }}>No businesses found within 500m</div>
            ) : null}
            <button className="nearby-close" onClick={() => { setSelectedVisit(null); setNearby(null); }}>
              ✕ Close
            </button>
          </div>
        )}
      </div>
      )}



      {/* ─── Inquiries Tab ─── */}
      {activeTab === 'inquiries' && (
        <div className="admin-content" style={{ marginTop: '24px', gridTemplateColumns: '1fr' }}>
          <div className="admin-glass-card inq-layout">
            <div className={`inq-list-container ${inqMobileFocus ? 'hidden-mobile' : ''}`}>
              <h3 className="inq-header">ACTIVE LEADS {inqLoading && '⏳'}</h3>
              <div className="inq-search-wrap">
                <Search className="inq-search-icon" size={16} />
                <input 
                  type="text" 
                  placeholder="Search leads..." 
                  className="inq-search-input"
                  value={inqSearch}
                  onChange={(e) => setInqSearch(e.target.value)}
                />
              </div>
              <div className="inq-cards">
                {filteredInquiries.map((inq) => (
                  <div 
                    key={inq.id} 
                    className={`inq-card ${inq.status} ${selectedVisit?.id === inq.id ? 'active' : ''}`}
                    onClick={() => selectInquiry(inq)}
                  >
                    <div className="inq-card-top">
                      <span className="inq-name">{inq.name}</span>
                      <span className={`inq-badge ${inq.status}`}>{inq.status}</span>
                    </div>
                    <div className="inq-card-subject">{inq.subject}</div>
                    <div className="inq-card-meta">{formatTime(inq.timestamp)}</div>
                  </div>
                ))}
                {filteredInquiries.length === 0 && !inqLoading && (
                  <div className="admin-muted" style={{ padding: '40px', textAlign: 'center' }}>No inquiries found.</div>
                )}
              </div>
            </div>

            <div className={`inq-detail-container ${!inqMobileFocus && window.innerWidth <= 768 ? 'hidden-mobile' : ''} ${inqMobileFocus ? 'show-mobile' : ''}`}>
              {selectedVisit && selectedVisit.email ? (
                <div className="inq-detail-card">
                  <div className="inq-detail-header">
                    <button className="mobile-only admin-circle-btn" style={{ marginBottom: '16px' }} onClick={() => setInqMobileFocus(false)}>
                      <ArrowLeft size={18} />
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3>{selectedVisit.name}</h3>
                        <p className="inq-detail-email">{selectedVisit.email}</p>
                      </div>
                      <span className={`inq-badge ${selectedVisit.status}`}>{selectedVisit.status}</span>
                    </div>
                  </div>
                  <div className="inq-detail-body">
                    <strong style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', opacity: 0.6 }}>MESSAGE:</strong>
                    <p className="inq-detail-message">{selectedVisit.message}</p>
                  </div>
                  <div className="inq-detail-actions">
                    <button className="admin-btn inq-reply-btn" onClick={() => window.location.href = `mailto:${selectedVisit.email}?subject=Re: ${selectedVisit.subject}`}>
                      <Mail size={16} style={{ marginRight: '8px' }} /> Reply via Email
                    </button>
                    <div className="inq-status-btns">
                      <button 
                        className="admin-circle-btn approve" 
                        onClick={() => updateInquiry(selectedVisit.id, 'replied')}
                        disabled={selectedVisit.status === 'replied'}
                        title="Mark Replied"
                      >
                         <Check size={18} />
                      </button>
                      <button 
                        className="admin-circle-btn close" 
                        onClick={() => updateInquiry(selectedVisit.id, 'closed')}
                        disabled={selectedVisit.status === 'closed'}
                        title="Close Lead"
                      >
                         <EyeOff size={18} />
                      </button>
                      <button 
                        className="admin-circle-btn delete" 
                        onClick={() => deleteInquiry(selectedVisit.id)}
                        title="Delete Permanently"
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                      >
                         <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="inq-empty-state">
                  <Mail size={48} style={{ opacity: 0.1, marginBottom: '16px' }} />
                  <p>Select an inquiry to view details and respond.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Reviews Tab ─── */}
      {activeTab === 'reviews' && (
        <div className="admin-content" style={{ marginTop: '24px', gridTemplateColumns: '1fr' }}>
          <div className="admin-glass-card admin-table-wrapper">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-muted)' }}>
              CLIENT FEEDBACK {revLoading && '⏳'}
            </h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Business</th>
                  <th>Rating</th>
                  <th>Content</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td>{r.business_name || '—'}</td>
                    <td style={{ color: 'var(--accent-primary)' }}>{'✦'.repeat(r.rating)}</td>
                    <td style={{ maxWidth: '300px', fontSize: '0.85rem' }}>{r.content}</td>
                    <td>
                      <span className={`status-pill ${r.status}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>{r.is_featured ? '⭐ Yes' : '—'}</td>
                    <td>
                      <div className="admin-actions">
                        {r.status === 'pending' && (
                          <button className="admin-circle-btn approve" onClick={() => updateReview(r.id, { status: 'approved' })} title="Approve">
                            <Check size={18} />
                          </button>
                        )}
                        {r.status === 'approved' && (
                          <button className="admin-circle-btn" onClick={() => updateReview(r.id, { status: 'hidden' })} title="Hide from Public View">
                            <EyeOff size={18} />
                          </button>
                        )}
                        {r.status === 'hidden' && (
                          <button className="admin-circle-btn approve" onClick={() => updateReview(r.id, { status: 'approved' })} title="Unhide & Publish">
                            <Eye size={18} />
                          </button>
                        )}
                        <button 
                          className={`admin-circle-btn ${r.is_featured ? 'active' : ''}`} 
                          onClick={() => updateReview(r.id, { is_featured: !r.is_featured })}
                          title={r.is_featured ? 'Remove from Featured' : 'Feature on Homepage'}
                          style={r.is_featured ? { color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', background: 'var(--accent-glow)' } : {}}
                        >
                          <Star size={18} fill={r.is_featured ? "var(--accent-primary)" : "none"} />
                        </button>
                        <button className="admin-circle-btn delete" onClick={() => deleteReview(r.id)} style={{ color: '#ef4444' }} title="Permanently Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {reviews.length === 0 && !revLoading && (
                  <tr><td colSpan={7} className="admin-muted" style={{ textAlign: 'center', padding: '40px' }}>No reviews yet. Seed some to begin.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Social Tab ─── */}
      {activeTab === 'social' && (
        <div className="admin-content" style={{ marginTop: '24px' }}>
          <div className="admin-glass-card">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '24px', color: 'var(--text-muted)' }}>
              DYNAMIC SOCIAL LINKS {socialLoading && '⏳'}
            </h3>
            
            <div className="social-manage-grid">
              {socialLinks.map((link, idx) => (
                <div key={idx} className="social-manage-item">
                  <div className="social-manage-header">
                    <span className="platform-tag">{link.platform}</span>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={link.visible} 
                        onChange={(e) => {
                          const newLinks = [...socialLinks];
                          newLinks[idx].visible = e.target.checked;
                          setSocialLinks(newLinks);
                        }}
                      />
                      <span className="slider-toggle round"></span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Platform Icon (Emoji)</label>
                    <input 
                      type="text" 
                      value={link.icon} 
                      onChange={(e) => {
                        const newLinks = [...socialLinks];
                        newLinks[idx].icon = e.target.value;
                        setSocialLinks(newLinks);
                      }}
                      className="admin-input"
                    />
                  </div>
                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label>URL</label>
                    <input 
                      type="text" 
                      value={link.url} 
                      onChange={(e) => {
                        const newLinks = [...socialLinks];
                        newLinks[idx].url = e.target.value;
                        setSocialLinks(newLinks);
                      }}
                      className="admin-input"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-footer-actions" style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
              <button className="admin-btn" onClick={saveSocialConfig} disabled={socialSaving}>
                {socialSaving ? 'Saving...' : '✦ Save Social Strategy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Settings Tab ─── */}
      {activeTab === 'settings' && (
        <div className="settings-section">
          <div className="settings-card">
            <h3>🔐 Change Password</h3>
            <div className="form-group">
              <label htmlFor="pw-current">Current Password</label>
              <input id="pw-current" type="password" value={pwForm.current}
                onChange={(e) => setPwForm(p => ({...p, current: e.target.value}))} placeholder="Enter current password" className="admin-input" />
            </div>
            <div className="form-group" style={{marginTop: '12px'}}>
              <label htmlFor="pw-new">New Password</label>
              <input id="pw-new" type="password" value={pwForm.newPw}
                onChange={(e) => setPwForm(p => ({...p, newPw: e.target.value}))} placeholder="Enter new password (min 6 chars)" className="admin-input" />
            </div>
            <div className="form-group" style={{marginTop: '12px'}}>
              <label htmlFor="pw-confirm">Confirm New Password</label>
              <input id="pw-confirm" type="password" value={pwForm.confirm}
                onChange={(e) => setPwForm(p => ({...p, confirm: e.target.value}))} placeholder="Confirm new password" className="admin-input" />
            </div>
            {pwStatus === 'success' && <div className="form-success" style={{marginTop: '12px'}}>✅ Password changed successfully!</div>}
            {pwStatus === 'error' && <div className="form-error" style={{marginTop: '12px'}}>❌ {pwError}</div>}
            <button className="admin-btn" style={{marginTop: '16px'}} disabled={pwStatus === 'saving' || !pwForm.current || !pwForm.newPw || !pwForm.confirm}
              onClick={async () => {
                setPwStatus('saving'); setPwError('');
                if (pwForm.newPw !== pwForm.confirm) { setPwError('Passwords do not match'); setPwStatus('error'); return; }
                if (pwForm.newPw.length < 6) { setPwError('Password must be at least 6 characters'); setPwStatus('error'); return; }
                try {
                  const resp = await fetch('/api/admin/password', {
                    method: 'PATCH',
                    headers: { ...headers, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ current_password: pwForm.current, new_password: pwForm.newPw }),
                  });
                  const data = await resp.json();
                  if (resp.ok) { setPwStatus('success'); setPwForm({ current: '', newPw: '', confirm: '' }); }
                  else { setPwError(data.error || 'Failed'); setPwStatus('error'); }
                } catch { setPwError('Connection failed'); setPwStatus('error'); }
              }}>
              {pwStatus === 'saving' ? 'Saving...' : 'Change Password'}
            </button>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}

// ─── Helpers ───

function formatTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts + 'Z');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function getFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🌍';
  return String.fromCodePoint(
    ...[...countryCode.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65)
  );
}

function getDeviceIcon(type) {
  const icons = { desktop: '💻', mobile: '📱', tablet: '📋' };
  return icons[type] || '❓';
}

function getSectionIcon(section) {
  const icons = { page_load: '🏠', hero: '🎯', about: '👤', tech: '⚡', projects: '🚀', journey: '📅', contact: '✉️' };
  return icons[section] || '📄';
}

function getBusinessIcon(type) {
  const icons = {
    restaurant: '🍽️', cafe: '☕', bank: '🏦', office: '🏢', pharmacy: '💊',
    hospital: '🏥', hotel: '🏨', supermarket: '🛒', convenience: '🏪',
  };
  return icons[type] || '🏪';
}


