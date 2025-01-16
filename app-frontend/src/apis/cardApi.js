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
  const response = await axios.get('/codef/getUserCardList');
  return response.data;
};

export const getUserPerformance = async () => {
  const response = await axios.get('/codef/getUserPerformance');
  return response.data;
};

export const saveUserCardData = async (cardList, cardBenefits) => {
  try {
    const requestBody = {
      cardList: cardList,
      performanceList: cardBenefits,
    };

    const response = await axios.post('/card/saveUserCardData', requestBody);
    console.log(response.data.message);
  } catch (error) {
    console.error('데이터 저장 중 오류 발생:', error);
  }
};
