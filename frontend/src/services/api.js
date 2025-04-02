import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

export const patientApi = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (patientData) => api.post('/patients', patientData),
  update: (id, patientData) => api.put(`/patients/${id}`, patientData),
  delete: (id) => api.delete(`/patients/${id}`),
};

export const checkupApi = {
  getAll: () => api.get('/checkups'),
  getById: (id) => api.get(`/checkups/${id}`),
  create: (checkupData) => api.post('/checkups', checkupData),
  update: (id, checkupData) => api.put(`/checkups/${id}`, checkupData),
  delete: (id) => api.delete(`/checkups/${id}`),
};

export const billingApi = {
  getAll: () => api.get('/billing'),
  getById: (id) => api.get(`/billing/${id}`),
  create: (billData) => api.post('/billing', billData),
  update: (id, billData) => api.put(`/billing/${id}`, billData),
  delete: (id) => api.delete(`/billing/${id}`),
  getReports: (startDate, endDate) => 
    api.get('/billing/reports', {
      params: { startDate, endDate }
    }),
};
