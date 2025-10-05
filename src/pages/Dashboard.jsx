import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
    Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard() {
    const [links, setLinks] = useState([]);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const fetchLinks = async () => {
        try {
            const response = await api.get('/links');
            setLinks(response.data);
        } catch (error) {
            console.error("Error fetching links:", error);
            setMessage("Could not fetch links.");
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleAddLink = async (e) => {
        e.preventDefault();
        try {
            await api.post('/links', { title, url });
            setMessage('Link added successfully!');
            setTitle('');
            setUrl('');
            fetchLinks();
        } catch (error) {
            console.error("Error adding link:", error);
            setMessage("Failed to add link.");
        }
    };

    const handleDeleteLink = async (id) => {
        try {
            await api.delete(`/links/${id}`);
            setMessage('Link deleted successfully!');
            fetchLinks();
        } catch (error) {
            console.error("Error deleting link:", error);
            setMessage("Failed to delete link.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Your Dashboard</Typography>
                <Button variant="outlined" onClick={handleLogout}>Logout</Button>
            </Box>

            <Box component="form" onSubmit={handleAddLink} sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
                <TextField label="URL" type="url" value={url} onChange={(e) => setUrl(e.target.value)} required fullWidth />
                <Button type="submit" variant="contained">Add Link</Button>
            </Box>
            {message && <Typography color="text.secondary" sx={{ mt: 2 }}>{message}</Typography>}

            <Typography component="h2" variant="h6" sx={{ mt: 4 }}>Your Links</Typography>
            {links.length > 0 ? (
                <List>
                    {links.map(link => (
                        <ListItem key={link.id} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteLink(link.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            {/* --- THIS IS THE PART THAT WAS CHANGED --- */}
                            <ListItemText
                                primary={link.title}
                                secondary={
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                                        {link.url}
                                    </a>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography sx={{ mt: 2 }}>You have no links yet. Add one above!</Typography>
            )}
        </Box>
    );
}

export default Dashboard;