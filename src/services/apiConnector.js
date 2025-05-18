import axios from "axios";

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4003/api/v1",
  withCredentials: true, // Important for sending cookies with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Increase timeout to 30 seconds
  timeout: 30000,
});

// Request interceptor to add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Redirect to login or handle token refresh here
      console.log('Unauthorized access - redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData || null,
    headers: headers || {},
    params: params || null,
    withCredentials: true, // Ensure credentials are sent with the request
  });
};
