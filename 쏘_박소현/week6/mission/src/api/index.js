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
  baseURL: 'http://localhost:3000/auth',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosInstance, authAxiosInstance };