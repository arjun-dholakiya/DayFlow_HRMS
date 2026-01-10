import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export default api;
