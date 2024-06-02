import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api', // Asegúrate de que esta es la URL base correcta de tu API
  withCredentials: true, // Importante si estás enviando cookies o credenciales
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default instance;