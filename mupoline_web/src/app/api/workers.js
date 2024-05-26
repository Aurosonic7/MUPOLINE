import axios from './axios';

export const loginWorker = async (email, password) => {
  try {
    const response = await axios.post('/workers/login', { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}