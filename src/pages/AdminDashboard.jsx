import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [statsRes, usersRes, growthRes] = await Promise.all([
        api.get('/api/admin/stats'),
        api.get('/api/admin/users'),
        api.get('/api/admin/growth'),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setGrowthData(growthRes.data);
    } catch (err) {
      setError(err.response?.status === 403 ? 'Access denied.' : 'Failed to load data.');
    } finally { setLoading(false); }
  };

  const toggleAdmin = async (userId, uname) => {
    try {
      await api.post(`/api/admin/users/${userId}/toggle-admin`);
      setMessage(`Updated ${uname}`);
      setTimeout(() => setMessage(''), 2500);
      const res = await api.get('/api/admin/users');
      setUsers(res.data);
    } catch { setError('Failed to update.'); }
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '—';

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  if (error && !stats) return (
    <div className="page-center">
      <div style={{textAlign:'center'}}>
        <div className="alert alert-error">{error}</div>
        <Link to="/dashboard"><button className="btn btn-outline" style={{marginTop:'1rem'}}>Back to dashboard</button></Link>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      <nav className="navbar">
        <span className="navbar-logo">LinkNest Admin</span>
        <div className="navbar-actions">
          <Link to="/dashboard"><button className="btn btn-ghost btn-sm">Dashboard</button></Link>
          <button className="btn btn-outline btn-sm" onClick={() => { localStorage.removeItem('jwtToken'); window.location.href='/login'; }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="admin-content">
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <h1 style={{fontFamily:'var(--font-display)', fontSize:'1.8rem', marginBottom:'1.5rem'}}>Overview</h1>

        <div className="stats-grid">
          {[
            { label: 'Total users', value: stats?.totalUsers ?? 0 },
            { label: 'Total links', value: stats?.totalLinks ?? 0 },
            { label: 'Active users', value: stats?.activeUsers ?? 0 },
            { label: 'New (7 days)', value: stats?.recentRegistrations ?? 0 },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        {growthData.length > 0 && (
          <div className="admin-table-card" style={{padding:'1.5rem', marginBottom:'1.5rem'}}>
            <div className="admin-table-header" style={{padding:'0 0 1rem', border:'none'}}>User growth — last 30 days</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{fontSize:11, fill:'var(--text-muted)'}} />
                <YAxis tick={{fontSize:11, fill:'var(--text-muted)'}} />
                <Tooltip contentStyle={{background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, fontSize:13}} />
                <Line type="monotone" dataKey="count" stroke="var(--accent)" strokeWidth={2} dot={false} name="New users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="admin-table-card">
          <div className="admin-table-header">All users</div>
          <div style={{overflowX:'auto'}}>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Links</th>
                  <th>Joined</th>
                  <th>Public</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td style={{fontWeight:500}}>{u.username}</td>
                    <td><span className="badge badge-gray">{u.linkCount}</span></td>
                    <td style={{color:'var(--text-secondary)'}}>{fmt(u.createdAt)}</td>
                    <td>
                      <span className={`badge ${u.isPublic ? 'badge-green' : 'badge-gray'}`}>
                        {u.isPublic ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <label className="toggle">
                        <input type="checkbox" checked={u.isAdmin || false}
                          onChange={() => toggleAdmin(u.id, u.username)} />
                        <span className="toggle-track"></span>
                        <span className="toggle-thumb"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
