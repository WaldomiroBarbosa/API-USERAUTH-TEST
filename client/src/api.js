import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const registerUser = async (user) => {
  try {
    const response = await api.post('/register', user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUser = async (token) => {
  try {
    const response = await api.get('/home', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};