import axios from 'axios';

// Create a new axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// Use an interceptor to add the token to every request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;