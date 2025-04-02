import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`${API_URL}/profile`, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateProfile = async (userData) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.put(`${API_URL}/profile`, userData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const changePassword = async (passwordData) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.put(`${API_URL}/change-password`, passwordData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
