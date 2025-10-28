import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h2" gutterBottom>
                Welcome to LinkNest
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Manage all your important links in one place
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/login')}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/register')}
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
}

export default Home;