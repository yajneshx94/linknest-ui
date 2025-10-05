import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    // Check if the JWT token exists in localStorage
    const token = localStorage.getItem('jwtToken');

    // If a token exists, render the child component (the Outlet).
    // Otherwise, redirect the user to the login page.
    return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
