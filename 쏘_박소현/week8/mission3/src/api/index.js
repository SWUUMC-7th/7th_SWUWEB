import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});

const authAxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

authAxiosInstance.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('accessToken'); 
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`; 
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export { axiosInstance, authAxiosInstance };