import axios from 'axios';

// Create a new axios instance
const api = axios.create({
    baseURL: 'https://linknest-api-d2ym.onrender.com'
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