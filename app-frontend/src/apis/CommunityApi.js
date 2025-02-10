// src/api/communityApi.js
import axios from 'axios';

const API_URL = '/posts/write'; // 실제 API 엔드포인트로 변경

export const submitPost = async (postFormData, postImg) => {
  const formData = new FormData();

  formData.append('postFormData', JSON.stringify(postFormData));

  if (postImg) {
    formData.append('file', postImg);
  }

  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
