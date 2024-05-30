import axios from './axios';

export const loginWorker = async (email, password) => {
  try {
    const response = await axios.post('/workers/login', { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getWorkers = async () => {
  try {
    const response = await axios.get('/workers');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const registerWorker = async ( email, password) => {
  try {
    const response = await axios.post('/workers/register', { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteWorker = async (id) => {
  try {
    const response = await axios.delete(`/workers/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateWorker = async (id, email, password) => {
  try {
    const response = await axios.put(`/workers/${id}`, { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};