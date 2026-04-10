import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        <button type="submit" disabled={loading || !username || !password} className="admin-btn">
          {loading ? 'Authenticating...' : 'Login →'}
        </button>
        <a href="/" className="admin-back">← Back to Portfolio</a>
      </form>
    </div>
  );
}
