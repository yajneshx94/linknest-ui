import React from 'react';
import { Box, Typography } from '@mui/material';

function Home() {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                LinkNest - Your Personal Launchpad
            </Typography>
            <Typography variant="body1" paragraph>
                LinkNest is your personal hub for all your important links. Create a single, easy-to-share public page that directs your audience to your social media, portfolio, online store, or any other content you want to share.
            </Typography>
            <Typography variant="body1" paragraph>
                Simply register for an account, log in to your private dashboard, and start adding your links. Your public page is created instantly and can be shared using a clean URL: <code>/your-username</code>.
            </Typography>
        </Box>
    );
}

export default Home;