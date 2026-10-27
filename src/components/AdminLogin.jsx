import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const resp = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await resp.json();

      if (resp.ok && data.token) {
        sessionStorage.setItem('analytics_token', data.token);
        onLogin(data.token);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset admin credentials to default (Username: admin, Password: Admin@123456)?')) {
      return;
    }
    setResetLoading(true);
    setError('');
    setResetMsg('');

    try {
      const resp = await fetch('/api/admin/reset', { method: 'POST' });
      const data = await resp.json();
      if (resp.ok && data.ok) {
        setUsername('admin');
        setPassword('Admin@123456');
        setResetMsg('Credentials reset to default (admin / Admin@123456) and autofilled!');
      } else {
        setError(data.error || 'Reset failed');
      }
    } catch {
      setError('Failed to connect to reset endpoint');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-icon">🔐</div>
        <h2>Analytics Dashboard</h2>
        <p>Admin access only</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoFocus
          className="admin-input"
          autoComplete="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="admin-input"
          style={{ marginTop: '12px' }}
          autoComplete="current-password"
        />
        {error && <div className="admin-error">{error}</div>}
        {resetMsg && (
          <div style={{
            color: '#10b981',
            fontSize: '0.82rem',
            marginTop: '10px',
            background: 'rgba(16, 185, 129, 0.12)',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            textAlign: 'left'
          }}>
            ✓ {resetMsg}
          </div>
        )}
        <button type="submit" disabled={loading || !username || !password} className="admin-btn">
          {loading ? 'Authenticating...' : 'Login →'}
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', gap: '8px' }}>
          <button
            type="button"
            onClick={handleReset}
            disabled={resetLoading}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: 0,
              fontSize: '0.85rem',
              textDecoration: 'underline',
              opacity: resetLoading ? 0.6 : 1,
            }}
          >
            {resetLoading ? 'Resetting...' : 'Forgot password? Reset'}
          </button>
          <a href="/" className="admin-back" style={{ marginTop: 0 }}>← Back to Portfolio</a>
        </div>
      </form>
    </div>
  );
}
