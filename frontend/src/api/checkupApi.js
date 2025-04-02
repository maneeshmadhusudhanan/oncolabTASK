import axios from 'axios';

const API_URL = 'http://localhost:5000/api/checkup';

export const createCheckup = async (checkupData) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post(API_URL, checkupData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getCheckups = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getCheckupById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`${API_URL}/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateCheckup = async (id, checkupData) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.put(`${API_URL}/${id}`, checkupData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteCheckup = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.delete(`${API_URL}/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
