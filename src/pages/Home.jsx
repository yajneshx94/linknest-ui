import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 56px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 2rem',
      background: 'var(--bg-base)'
    }}>
      <div style={{textAlign: 'center', maxWidth: '640px', width: '100%'}}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 6vw, 4rem)',
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: '1.25rem'
        }}>
          One link.<br />Everything you are.
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          maxWidth: '480px',
          margin: '0 auto 2.5rem'
        }}>
          Build a clean public page with all your links — portfolio, socials, projects — and share it anywhere with a single URL.
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link to="/register">
            <button className="btn btn-primary" style={{padding: '0.75rem 2rem', fontSize: '1rem'}}>
              Get started free
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-outline" style={{padding: '0.75rem 2rem', fontSize: '1rem'}}>
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;