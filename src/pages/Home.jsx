import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-hero">
      <h1 className="home-title">Your links,<br />one place.</h1>
      <p className="home-sub">
        Create a clean public page with all your important links — portfolio, socials, projects — and share it with a single URL.
      </p>
      <div className="home-actions">
        <Link to="/register"><button className="btn btn-primary">Create your page</button></Link>
        <Link to="/login"><button className="btn btn-outline">Sign in</button></Link>
      </div>
    </div>
  );
}

export default Home;
