import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.post('/api/auth/register', { username, password });
      setSuccess(true);
      setMessage('Account created! Redirecting...');
      setTimeout(() => { window.location.href = '/login'; }, 1500);
    } catch (err) {
      setMessage(err.response?.data || 'Registration failed. Try a different username.');
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
        <div className="auth-subtitle">Create your free page</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" type="text" placeholder="johndoe" required
              value={username} onChange={e => setUsername(e.target.value)} />
            <div style={{fontSize:'0.78rem', color:'var(--text-muted)', marginTop:'0.3rem'}}>
              Your public page will be at /{username || 'username'}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" required
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {message && <div className={`alert ${success ? 'alert-success' : 'alert-error'}`}>{message}</div>}
          <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{marginTop:'0.5rem'}}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;