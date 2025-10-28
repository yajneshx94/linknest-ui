import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Chip,
    Alert,
    CircularProgress,
    Switch,
    FormControlLabel
} from '@mui/material';
import {
    People as PeopleIcon,
    Link as LinkIcon,
    TrendingUp as TrendingUpIcon,
    PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [growthData, setGrowthData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            setError('');

            const [statsRes, usersRes, recentRes, growthRes] = await Promise.all([
                api.get('/api/admin/stats'),
                api.get('/api/admin/users'),
                api.get('/api/admin/users/recent'),
                api.get('/api/admin/growth')
            ]);

            setStats(statsRes.data);
            setUsers(usersRes.data);
            setRecentUsers(recentRes.data);
            setGrowthData(growthRes.data);
        } catch (err) {
            if (err.response?.status === 403) {
                setError('Access denied. Admin privileges required.');
            } else {
                setError('Failed to load admin data. Please try again.');
            }
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAdmin = async (userId, username) => {
        try {
            await api.post(`/api/admin/users/${userId}/toggle-admin`);
            setMessage(`Successfully updated admin status for ${username}`);

            const usersRes = await api.get('/api/admin/users');
            setUsers(usersRes.data);

            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(`Failed to update admin status for ${username}`);
            console.error('Error toggling admin:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error && !stats) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
                <Button onClick={() => window.location.href = '/dashboard'} sx={{ mt: 2 }}>
                    Back to Dashboard
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    Admin Dashboard
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" onClick={() => window.location.href = '/dashboard'}>
                        User Dashboard
                    </Button>
                    <Button variant="outlined" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Box>

            {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PeopleIcon sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {stats?.totalUsers || 0}
                                    </Typography>
                                    <Typography variant="body2">Total Users</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LinkIcon sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {stats?.totalLinks || 0}
                                    </Typography>
                                    <Typography variant="body2">Total Links</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TrendingUpIcon sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {stats?.activeUsers || 0}
                                    </Typography>
                                    <Typography variant="body2">Active Users</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PersonAddIcon sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {stats?.recentRegistrations || 0}
                                    </Typography>
                                    <Typography variant="body2">New (7 days)</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {growthData.length > 0 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                            User Growth (Last 30 Days)
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#667eea"
                                    strokeWidth={2}
                                    name="New Users"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Recent Users (Last 10)
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Username</strong></TableCell>
                                    <TableCell><strong>Display Name</strong></TableCell>
                                    <TableCell><strong>Joined</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.displayName || 'N/A'}</TableCell>
                                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                                        <TableCell>
                                            {user.isAdmin && <Chip label="Admin" color="error" size="small" sx={{ mr: 1 }} />}
                                            {user.isPublic && <Chip label="Public" color="success" size="small" />}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                        All Users
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell><strong>Username</strong></TableCell>
                                    <TableCell><strong>Display Name</strong></TableCell>
                                    <TableCell><strong>Links</strong></TableCell>
                                    <TableCell><strong>Joined</strong></TableCell>
                                    <TableCell><strong>Admin</strong></TableCell>
                                    <TableCell><strong>Public</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.displayName || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Chip label={user.linkCount} color="primary" size="small" />
                                        </TableCell>
                                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                                        <TableCell>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={user.isAdmin || false}
                                                        onChange={() => handleToggleAdmin(user.id, user.username)}
                                                        color="error"
                                                    />
                                                }
                                                label={user.isAdmin ? 'Yes' : 'No'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {user.isPublic ? (
                                                <Chip label="Yes" color="success" size="small" />
                                            ) : (
                                                <Chip label="No" color="default" size="small" />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}

export default AdminDashboard;