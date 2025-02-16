// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,  // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or modify headers here
    const token = localStorage.getItem('token'); // Example of getting a token from localStorage
    if (token) {
      config.headers['authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can handle successful responses here (e.g., logging)
    return response;
  },
  (error) => {
    // Handle response errors here (e.g., logging out on 401)
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, logging out...');
      // Perform any logic such as redirecting to login page
      // or clearing out local storage/session storage.
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
