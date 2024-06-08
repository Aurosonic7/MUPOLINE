import axios from './axios';

export const getAllArtworks = async () => {
  try {
    const response = await axios.get('/artworks');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch artworks', error);
    return null;
  }
};

export const createArtwork = async (title, description, audio, image, workerid) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  if (audio) formData.append('audio', audio);
  if (image) formData.append('image', image);
  formData.append('workerid', workerid);

  try {
    const response = await axios.post('/artworks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create artwork', error);
    throw error;
  }
};

export const updateArtwork = async (id, title, description, audio, image, workerid) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  if (audio) formData.append('audio', audio);
  if (image) formData.append('image', image);
  formData.append('workerid', workerid);

  try {
    const response = await axios.put(`/artworks/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update artwork with id ${id}`, error);
    throw error;
  }
};

export const deleteArtwork = async (id) => {
  try {
    await axios.delete(`/artworks/${id}`);
  } catch (error) {
    console.error(`Failed to delete artwork with id ${id}`, error);
  }
};
