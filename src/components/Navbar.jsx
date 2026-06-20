import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('jwtToken');
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  };
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">LinkNest</Link>
      <div className="navbar-actions">
        {token ? (
          <>
            <Link to="/dashboard"><button className="btn btn-ghost btn-sm">Dashboard</button></Link>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn btn-ghost btn-sm">Login</button></Link>
            <Link to="/register"><button className="btn btn-primary btn-sm">Get started</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;