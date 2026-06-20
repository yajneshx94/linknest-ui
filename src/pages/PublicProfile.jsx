import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        const [linksRes, profileRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/links/public/${username}`),
          axios.get(`http://localhost:8080/api/profile/public/${username}`)
        ]);
        setLinks(linksRes.data);
        setProfile(profileRes.data);
      } catch {
        setError(`No public profile found for @${username}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [username]);

  if (loading) return (
    <div className="page-loading">
      <div className="spinner"></div>
    </div>
  );

  if (error) return (
    <div className="profile-page">
      <div className="profile-card" style={{textAlign:'center', paddingTop:'4rem'}}>
        <div style={{fontSize:'2rem', marginBottom:'1rem'}}>🔍</div>
        <p style={{color:'var(--text-secondary)'}}>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {username.charAt(0).toUpperCase()}
        </div>
        <h1 className="profile-username">@{username}</h1>

        {profile?.bio && (
          <p className="profile-bio">{profile.bio}</p>
        )}

        {links.length === 0 ? (
          <p style={{textAlign:'center', color:'var(--text-muted)', fontSize:'0.9rem'}}>
            This profile has no links yet.
          </p>
        ) : (
          <div>
            {links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="public-link"
                onClick={() => axios.post(`http://localhost:8080/api/links/${link.id}/click`).catch(() => {})}
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