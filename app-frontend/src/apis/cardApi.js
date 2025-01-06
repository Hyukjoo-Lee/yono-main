import axios from 'axios';

export const getToken = async () => {
  await axios.get('/codef/getToken');
};

export const getConId = async () => {
  await axios.get('/codef/getConId');
};

export const getCardHistory = async () => {
  const response = await axios.get('/codef/getCardHistory');
  return response.data;
};

export const getUserCards = async () => {
  const response = await axios.get('/codef/getUserCards');
  return response.data;
};

export const getUserPerformance = async () => {
  const response = await axios.get('/codef/getUserPerformance');
  return response.data;
};
