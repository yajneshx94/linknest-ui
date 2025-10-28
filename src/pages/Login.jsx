import React, { useState } from 'react';
import api from '../services/api'; // ADD THIS IMPORT
import { Box, TextField, Button, Typography } from '@mui/material';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // CHANGE THIS LINE - Remove hardcoded localhost
            const response = await api.post('/api/auth/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            window.location.href = '/dashboard';
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5">Login</Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
            >
                {loading ? 'Logging in...' : 'Login'}
            </Button>
            {message && <Typography color="error">{message}</Typography>}
        </Box>
    );
}

export default Login;