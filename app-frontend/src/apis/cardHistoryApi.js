import axios from 'axios';

export const uploadThreeMonthHistory = async (userNum) => {
  try {
    const response = await axios.get('/cardHistory/monthlyUpload', {
      params: { userNum },
    });

    if (response.status === 204) {
      return null;
    } else if (response.status === 200) {
      return response.data;
    } else {
      return response.message;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};

export const uploadOneMonthHistory = async (userNum) => {
  try {
    const response = await axios.get('/cardHistory/categoryUpload', {
      params: { userNum },
    });

    if (response.status === 204) {
      return null;
    } else if (response.status === 200) {
      return response.data;
    } else {
      return response.message;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};

export const monthData = async (userNum) => {
  try {
    const response = await axios.get('/cardHistory/monthData', {
      params: { userNum },
    });

    if (response.status === 204) {
      return null;
    } else if (response.status === 200) {
      return response.data;
    } else {
      return response.message;
    }
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
