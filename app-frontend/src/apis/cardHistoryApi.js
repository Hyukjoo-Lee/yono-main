import axios from 'axios';

export const uploadRecentHistory = async (userNum) => {
  try {
    const response = await axios.get('/cardHistory/monthlyUpload', {
      params: { userNum },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};
