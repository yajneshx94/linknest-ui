import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard() {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [links, setLinks] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchLinks();
        checkAdminStatus();
    }, []);

    const checkAdminStatus = () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decoded = jwtDecode(token);
                setIsAdmin(decoded.isAdmin || decoded.admin || false);
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
        }
    };

    const fetchLinks = async () => {
        try {
            const response = await api.get('/api/links');
            setLinks(response.data);
        } catch (error) {
            setMessage('Could not fetch links.');
            console.error('Error fetching links:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!url || !url.startsWith('http')) {
            setMessage('Please enter a valid URL starting with http:// or https://');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            await api.post('/api/links', { title, url });
            setMessage('Link added successfully!');
            setTitle('');
            setUrl('');
            fetchLinks();
        } catch (error) {
            setMessage('Failed to add link.');
            console.error('Error adding link:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/links/${id}`);
            setMessage('Link deleted successfully!');
            fetchLinks();
        } catch (error) {
            setMessage('Failed to delete link.');
            console.error('Error deleting link:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography component="h1" variant="h4">Your Dashboard</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {isAdmin && (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => window.location.href = '/admin'}
                        >
                            ADMIN PANEL
                        </Button>
                    )}
                    <Button variant="outlined" onClick={handleLogout}>LOGOUT</Button>
                </Box>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    placeholder="LinkedIn"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="url"
                    label="URL"
                    name="url"
                    placeholder="https://linkedin.com/in/yajneshk04"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? 'Adding...' : 'ADD LINK'}
                </Button>
            </Box>

            {message && (
                <Typography
                    color={message.includes('success') ? 'success.main' : 'error'}
                    sx={{ mb: 2 }}
                >
                    {message}
                </Typography>
            )}

            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>Your Links</Typography>

            {links.length === 0 ? (
                <Typography>You have no links yet. Add one above!</Typography>
            ) : (
                <List>
                    {links.map((link) => (
                        <ListItem
                            key={link.id}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleDelete(link.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={link.title}
                                secondary={
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.url}
                                    </a>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
}

export default Dashboard;