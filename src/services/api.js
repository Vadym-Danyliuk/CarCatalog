import axios from 'axios';

const API_BASE_URL = 'https://car-rental-api.goit.global';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const getCars = async (params = {}) => {
  try {
    const response = await api.get('/cars', { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cars');
  }
};

export const getCarById = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch car details');
  }
};

export const getBrands = async () => {
  try {
    const response = await api.get('/brands');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch brands');
  }
};
