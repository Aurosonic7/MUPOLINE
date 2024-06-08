import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
  timeout: 60000,
  headers: {
    'Accept': 'application/json',
  },
});

export default instance;
