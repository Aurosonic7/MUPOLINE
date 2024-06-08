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

export const createArtwork = async (title, description, audio, image, workerid) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('audio', audio);
    formData.append('workerid', workerid);

    if (image) {
      formData.append('image', image);
    }

    const response = await axios.post('/artworks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteArtwork = async (id) => {
  try {
    const response = await axios.delete(`/artworks/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateArtwork = async (id, title, description, audio, image, workerid) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('audio', audio);
    formData.append('workerid', workerid);

    if (image) {
      formData.append('image', image);
    }

    const response = await axios.put(`/artworks/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};