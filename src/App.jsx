import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import PublicProfile from './pages/PublicProfile';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './index.css';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Named routes FIRST — before the wildcard */}
      <Route path="/" element={<><Navbar /><Home /></>} />
      <Route path="/login" element={<><Navbar /><Login /></>} />
      <Route path="/register" element={<><Navbar /><Register /></>} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* Wildcard LAST — only matches if nothing above matched */}
      <Route path="/:username" element={<PublicProfile />} />
    </Routes>
  );
}

export default App;