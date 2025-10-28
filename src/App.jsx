import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import PublicProfile from './pages/PublicProfile';
import Home from './pages/Home';

// Import MUI components for layout and styling
import { Container, CssBaseline, Box, Typography, Link as MuiLink } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            LinkNest
          </Typography>
          <nav>
            <MuiLink component={Link} to="/" sx={{ mr: 2 }}>
              Home
            </MuiLink>
            <MuiLink component={Link} to="/register" sx={{ mr: 2 }}>
              Register
            </MuiLink>
            <MuiLink component={Link} to="/login" sx={{ mr: 2 }}>
              Login
            </MuiLink>
            <MuiLink component={Link} to="/dashboard">
              Dashboard
            </MuiLink>
          </nav>
          <hr style={{ margin: '16px 0' }}/>

          <Routes>
            {/* Public routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* Protected User routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Protected Admin routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Dynamic public profile route last */}
            <Route path="/:username" element={<PublicProfile />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default App;
