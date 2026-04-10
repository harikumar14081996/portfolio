import { useState, useEffect, useCallback } from 'react';
import AdminLogin from './AdminLogin';

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

  // Inquiries state
  const [inquiries, setInquiries] = useState([]);
  const [inqStatusFilter, setInqStatusFilter] = useState('');
  const [inqStatusCounts, setInqStatusCounts] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

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

  const fetchInquiries = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (inqStatusFilter) params.set('status', inqStatusFilter);
      const resp = await fetch(`/api/inquiries?${params}`, { headers });
      if (resp.status === 401) { handleLogout(); return; }
      const data = await resp.json();
      setInquiries(data.inquiries || []);
      setInqStatusCounts(data.statusCounts || []);
    } catch { /* silent */ }
  }, [token, inqStatusFilter]);

  const updateInquiry = async (id, updates) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      fetchInquiries();
    } catch { /* silent */ }
  };

  useEffect(() => {
    if (token) {
      fetchStats();
      fetchVisits();
      fetchInquiries();
    }
  }, [token, fetchStats, fetchVisits, fetchInquiries]);

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

  if (!token) {
    return <AdminLogin onLogin={(t) => setToken(t)} />;
  }

  return (
    <div className="admin-saas-container">
      {/* Sidebar Navigation */}
      <aside className="admin-saas-sidebar">
        <div className="admin-sidebar-logo">
          <span>📊</span>
          <span>ADMIN</span>
        </div>

        <nav className="admin-sidebar-nav">
          <button 
            className={`admin-sidebar-btn ${activeTab === 'analytics' ? 'active' : ''}`} 
            onClick={() => setActiveTab('analytics')}
          >
            📈 <span>Analytics</span>
          </button>
          <button 
            className={`admin-sidebar-btn ${activeTab === 'inquiries' ? 'active' : ''}`} 
            onClick={() => setActiveTab('inquiries')}
          >
            📩 <span>Inquiries</span>
            {inqStatusCounts.find(s => s.status === 'new')?.count > 0 && (
              <span className="tab-badge">{inqStatusCounts.find(s => s.status === 'new').count}</span>
            )}
          </button>
          <button 
            className={`admin-sidebar-btn ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ <span>Settings</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" className="admin-sidebar-btn" style={{ textDecoration: 'none' }}>
            ← <span>Back to Site</span>
          </a>
          <button onClick={handleLogout} className="admin-sidebar-btn" style={{ color: '#ef4444' }}>
            🚪 <span>Logout</span>
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
          {activeTab === 'inquiries' && (
            <>
              <h2>Inquiry Management</h2>
              <p>Track and respond to incoming potential client leads.</p>
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
      {stats && (
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
      <div className="admin-content" style={{ marginTop: '24px' }}>
        <div className="admin-glass-card" style={{ overflowX: 'auto' }}>
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
        <div className="inquiries-section">
          {/* Status Filter Tabs */}
          <div className="inq-status-tabs">
            <button className={`inq-tab ${inqStatusFilter === '' ? 'active' : ''}`} onClick={() => setInqStatusFilter('')}>
              All ({inqStatusCounts.reduce((s, c) => s + c.count, 0)})
            </button>
            {['new', 'reviewed', 'replied', 'closed'].map(st => (
              <button key={st} className={`inq-tab ${inqStatusFilter === st ? 'active' : ''}`} onClick={() => setInqStatusFilter(st)}>
                {getStatusIcon(st)} {st.charAt(0).toUpperCase() + st.slice(1)} ({inqStatusCounts.find(c => c.status === st)?.count || 0})
              </button>
            ))}
          </div>

          <div className="inq-layout">
            {/* Inquiries List */}
            <div className="inq-list">
              {inquiries.map(inq => (
                <div key={inq.id} className={`inq-card ${selectedInquiry?.id === inq.id ? 'selected' : ''}`}
                  onClick={() => { setSelectedInquiry(inq); setAdminNotes(inq.admin_notes || ''); }}>
                  <div className="inq-card-header">
                    <strong>{inq.name}</strong>
                    <span className={`inq-status-badge status-${inq.status}`}>{getStatusIcon(inq.status)} {inq.status}</span>
                  </div>
                  <div className="inq-card-email">{inq.email}</div>
                  <div className="inq-card-meta">
                    {inq.project_type && <span>{inq.project_type}</span>}
                    {inq.budget && <span>💰 {inq.budget}</span>}
                  </div>
                  <div className="inq-card-preview">{inq.message?.substring(0, 120)}...</div>
                  <div className="inq-card-time">{formatTime(inq.created_at)}</div>
                </div>
              ))}
              {inquiries.length === 0 && <div className="admin-muted" style={{ padding: '40px', textAlign: 'center' }}>No inquiries found</div>}
            </div>

            {/* Inquiry Detail */}
            {selectedInquiry && (
              <div className="inq-detail">
                <h3>📧 Inquiry from {selectedInquiry.name}</h3>
                <div className="inq-detail-grid">
                  <div><span className="inq-label">Email</span><a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a></div>
                  <div><span className="inq-label">Project</span>{selectedInquiry.project_type || '—'}</div>
                  <div><span className="inq-label">Budget</span>{selectedInquiry.budget || '—'}</div>
                  <div><span className="inq-label">Received</span>{formatTime(selectedInquiry.created_at)}</div>
                </div>
                <div className="inq-message">
                  <span className="inq-label">Message</span>
                  <p>{selectedInquiry.message}</p>
                </div>

                <div className="inq-actions">
                  <span className="inq-label">Update Status</span>
                  <div className="inq-action-btns">
                    {['new', 'reviewed', 'replied', 'closed'].map(st => (
                      <button key={st} className={`inq-action-btn ${selectedInquiry.status === st ? 'active' : ''}`}
                        onClick={() => { updateInquiry(selectedInquiry.id, { status: st }); setSelectedInquiry({...selectedInquiry, status: st}); }}>
                        {getStatusIcon(st)} {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="inq-notes">
                  <span className="inq-label">Admin Notes</span>
                  <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} placeholder="Add private notes about this inquiry..." rows={3} />
                  <button className="inq-save-notes" onClick={() => updateInquiry(selectedInquiry.id, { admin_notes: adminNotes })}>
                    Save Notes
                  </button>
                </div>

                <a href={`mailto:${selectedInquiry.email}?subject=Re: Your Portfolio Inquiry&body=${encodeURIComponent(`Hi ${selectedInquiry.name},\n\nThank you for reaching out!\n\n`)}`}
                  className="inq-reply-btn">✉️ Reply via Email</a>
              </div>
            )}
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

function getStatusIcon(status) {
  const icons = { new: '🔵', reviewed: '🟡', replied: '🟢', closed: '⚪' };
  return icons[status] || '⚪';
}
