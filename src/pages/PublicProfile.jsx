import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API = 'https://linknest-api-x9to.onrender.com';

function PublicProfile() {
  const { username } = useParams();
  const [links, setLinks] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) return;

    const fetchAll = async () => {
      try {
        const linksRes = await axios.get(`${API}/api/links/public/${username}`);
        setLinks(linksRes.data);
        try {
          const profileRes = await axios.get(`${API}/api/profile/public/${username}`);
          setProfile(profileRes.data);
        } catch {}
      } catch {
        setError(`No public profile found for @${username}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [username]);

  if (loading) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
      <div className="spinner"></div>
    </div>
  );

  if (error) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'2rem', marginBottom:'1rem'}}>🔍</div>
        <p style={{color:'var(--text-muted)'}}>{error}</p>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'var(--bg-base)'
    }}>
      <div className="profile-card" style={{width:'100%', maxWidth:'480px'}}>
        <div className="profile-avatar">
          {username.charAt(0).toUpperCase()}
        </div>
        <h1 className="profile-username">@{username}</h1>

        {profile?.bio && (
          <p className="profile-bio">{profile.bio}</p>
        )}

        {links.length === 0 ? (
          <p style={{textAlign:'center', color:'var(--text-muted)', fontSize:'0.9rem', marginTop:'1.5rem'}}>
            This profile has no links yet.
          </p>
        ) : (
          <div style={{marginTop:'1.5rem'}}>
            {links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="public-link"
                onClick={() => axios.post(`${API}/api/links/${link.id}/click`).catch(() => {})}
              >
                {link.title}
              </a>
            ))}
          </div>
        )}

        <div style={{textAlign:'center', marginTop:'2.5rem'}}>
          <a href="/" style={{fontSize:'0.78rem', color:'var(--text-muted)'}}>
            Made with LinkNest
          </a>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;