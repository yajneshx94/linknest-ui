import React, { useState } from 'react';
import api from '../services/api'; // Add this import
import { Box, TextField, Button, Typography } from '@mui/material';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Changed from axios.post to api.post and removed hardcoded URL
            const response = await api.post('/api/auth/register', { username, password });
            setMessage(response.data);

            // Redirect to login after successful registration
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        } catch (error) {
            setMessage(error.response?.data || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5">Register</Typography>
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
                {loading ? 'Registering...' : 'Register'}
            </Button>
            {message && <Typography color={message.includes('successfully') ? 'success.main' : 'error'}>{message}</Typography>}
        </Box>
    );
}

export default Register;