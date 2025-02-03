import axios from 'axios';

export const uploadThreeMonthHistory = async (userNum) => {
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
};

export const uploadOneMonthHistory = async (userNum) => {
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
};

export const monthData = async (userNum) => {
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
};

export const updateHistory = async (userNum) => {
  const response = await axios.get('/cardHistory/update', {
    params: { userNum },
  });

  console.log(response.data);
  return response.data;
};
