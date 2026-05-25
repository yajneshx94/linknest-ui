import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import PublicProfile from './pages/PublicProfile';
import Home from './pages/Home';
import './index.css';
import './App.css';

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

function App() {
  return (
    <>
      <Routes>
        <Route path="/:username" element={<PublicProfile />} />
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
