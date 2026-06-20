import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post('/api/auth/login', { username, password });
      localStorage.setItem('jwtToken', response.data.token);
      window.location.href = '/dashboard';
    } catch {
      setMessage('Incorrect username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 56px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'var(--bg-base)'
    }}>
      <div className="auth-card" style={{width: '100%', maxWidth: '420px'}}>
        <div className="auth-logo">LinkNest</div>
        <div className="auth-subtitle">Sign in to your account</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" type="text" placeholder="your username" required
              value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" required
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {message && <div className="alert alert-error">{message}</div>}
          <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{marginTop:'0.5rem'}}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="auth-footer">
          No account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;