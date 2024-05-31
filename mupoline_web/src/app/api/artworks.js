import axios from './axios';

export const getAllArtworks = async () => {
  try {
    const response = await axios.get('/artworks');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};