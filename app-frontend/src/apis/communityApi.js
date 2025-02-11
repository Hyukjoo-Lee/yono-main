import axios from 'axios';

export const createPost = async (postFormData, postImg) => {
  const formData = new FormData();

  formData.append('postFormData', JSON.stringify(postFormData));

  if (postImg) {
    formData.append('file', postImg);
  }

  try {
    const response = await axios.post('/posts/write', formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
