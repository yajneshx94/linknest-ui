import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import the useParams hook
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Link as MuiLink } from '@mui/material';

function PublicProfile() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { username } = useParams(); // This hook gets the 'username' from the URL

    useEffect(() => {
        const fetchPublicLinks = async () => {
            try {
                // Use a standard axios call, NOT the api helper, because this is a public request
                const response = await axios.get(`http://localhost:8080/api/links/public/${username}`);
                setLinks(response.data);
            } catch (err) {
                setError(`Could not find a profile for user: ${username}`);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchPublicLinks();
        }
    }, [username]); // This effect runs whenever the username in the URL changes

    if (loading) {
        return <CircularProgress />; // Show a loading spinner while fetching
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                @{username}
            </Typography>
            {links.length > 0 ? (
                <List>
                    {links.map(link => (
                        <ListItem key={link.id} button component="a" href={link.url} target="_blank" rel="noopener noreferrer">
                            <ListItemText primary={link.title} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>This user has no links yet.</Typography>
            )}
        </Box>
    );
}

export default PublicProfile;