import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

function getFavicon(url) {
  try { return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`; }
  catch { return null; }
}

function getInitial(title) {
  return title ? title.charAt(0).toUpperCase() : '?';
}

function Dashboard() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');

  const [editOpen, setEditOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
    try {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.isAdmin || false);
        setUsername(decoded.sub || '');
      }
    } catch {}
  }, []);

  const showMsg = (text, type = 'success') => {
    setMessage(text); setMsgType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const fetchLinks = async () => {
    try {
      const res = await api.get('/api/links');
      setLinks(res.data);
    } catch { showMsg('Could not load links.', 'error'); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!url.startsWith('http')) { showMsg('URL must start with http:// or https://', 'error'); return; }
    setLoading(true);
    try {
      await api.post('/api/links', { title, url });
      setTitle(''); setUrl('');
      showMsg('Link added!');
      fetchLinks();
    } catch { showMsg('Failed to add link.', 'error'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/links/${id}`);
      showMsg('Link removed.');
      fetchLinks();
    } catch { showMsg('Failed to delete.', 'error'); }
  };

  const openEdit = (link) => {
    setEditingLink(link);
    setEditTitle(link.title);
    setEditUrl(link.url);
    setEditOpen(true);
  };

  const closeEdit = () => { setEditOpen(false); setEditingLink(null); };

  const handleEditSave = async () => {
    if (!editUrl.startsWith('http')) { showMsg('URL must start with http:// or https://', 'error'); return; }
    setEditLoading(true);
    try {
      await api.put(`/api/links/${editingLink.id}`, { title: editTitle, url: editUrl, category: editingLink.category });
      showMsg('Link updated!');
      closeEdit();
      fetchLinks();
    } catch { showMsg('Failed to update.', 'error'); }
    finally { setEditLoading(false); }
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-content">

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem'}}>
          <div>
            <h1 style={{fontFamily:'var(--font-display)', fontSize:'1.8rem', color:'var(--text-primary)', lineHeight:1.2}}>
              {username}'s links
            </h1>
            <a href={`/${username}`} target="_blank" rel="noreferrer"
              style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>
              linknest/{username} ↗
            </a>
          </div>
          <div style={{display:'flex', gap:'0.5rem'}}>
            {isAdmin && (
              <button className="btn btn-danger btn-sm" onClick={() => window.location.href='/admin'}>
                Admin
              </button>
            )}
          </div>
        </div>

        {message && <div className={`alert alert-${msgType}`}>{message}</div>}

        <div className="add-link-card">
          <div className="section-title">Add a link</div>
          <form onSubmit={handleAdd}>
            <div className="add-link-row">
              <div>
                <label className="form-label">Title</label>
                <input className="form-input" placeholder="GitHub" value={title}
                  onChange={e => setTitle(e.target.value)} required />
              </div>
              <div>
                <label className="form-label">URL</label>
                <input className="form-input" placeholder="https://github.com/yajnesh" value={url}
                  onChange={e => setUrl(e.target.value)} required />
              </div>
              <div style={{paddingBottom:'0'}}>
                <button type="submit" className="btn btn-primary" disabled={loading}
                  style={{height:'38px', marginTop:'1.35rem'}}>
                  {loading ? '...' : '+ Add'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="section-title">{links.length} link{links.length !== 1 ? 's' : ''}</div>

        {links.length === 0 ? (
          <div style={{textAlign:'center', padding:'3rem 0', color:'var(--text-muted)', fontSize:'0.9rem'}}>
            No links yet. Add your first one above.
          </div>
        ) : (
          <div className="links-list">
            {links.map(link => (
              <div className="link-item" key={link.id}>
                <div className="link-favicon">
                  <img
                    src={getFavicon(link.url)}
                    alt=""
                    onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                  />
                  <span style={{display:'none'}}>{getInitial(link.title)}</span>
                </div>
                <div className="link-info">
                  <div className="link-title">{link.title}</div>
                  <div className="link-url">{link.url}</div>
                </div>
                <div className="link-actions">
                  <button className="icon-btn" onClick={() => openEdit(link)} title="Edit">
                    ✏️
                  </button>
                  <button className="icon-btn danger" onClick={() => handleDelete(link.id)} title="Delete">
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editOpen && (
        <div className="modal-overlay" onClick={closeEdit}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Edit link</div>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="form-input" value={editTitle} onChange={e => setEditTitle(e.target.value)} autoFocus />
            </div>
            <div className="form-group">
              <label className="form-label">URL</label>
              <input className="form-input" value={editUrl} onChange={e => setEditUrl(e.target.value)} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeEdit}>Cancel</button>
              <button className="btn btn-primary" onClick={handleEditSave} disabled={editLoading}>
                {editLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
