import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicProfile from './pages/PublicProfile';

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
            {/* Specific routes first */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* --- THIS IS THE ONLY PART THAT HAS CHANGED --- */}
            <Route path="/" element={
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  LinkNest Your Personal Launchpad
                </Typography>
                <Typography variant="body1" paragraph>
                  LinkNest is your personal hub for all your important links. Create a single, easy-to-share public page that directs your audience to your social media, portfolio, online store, or any other content you want to share.
                </Typography>
                <Typography variant="body1" paragraph>
                  Simply register for an account, log in to your private dashboard, and start adding your links. Your public page is created instantly and can be shared using a clean URL: `.../your-username`.
                </Typography>
              </Box>
            } />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Dynamic route last */}
            <Route path="/:username" element={<PublicProfile />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default App;