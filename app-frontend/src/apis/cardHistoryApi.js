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

export const updateHistory = async (userNum) => {
  try {
    await axios.get('/cardHistory/update', {
      params: { userNum },
    });
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};
