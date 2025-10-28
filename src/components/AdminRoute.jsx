import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminRoute() {
    const [isChecking, setIsChecking] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAdminStatus();
    }, []);

    const checkAdminStatus = () => {
        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                setIsAuthenticated(false);
                setIsChecking(false);
                return;
            }

            setIsAuthenticated(true);

            // Decode JWT token to check admin status
            const decoded = jwtDecode(token);

            // Check if token has admin claim
            const adminStatus = decoded.isAdmin || decoded.admin || false;

            setIsAdmin(adminStatus);
            setIsChecking(false);
        } catch (error) {
            console.error('Error checking admin status:', error);
            setIsAuthenticated(false);
            setIsAdmin(false);
            setIsChecking(false);
        }
    };

    if (isChecking) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;