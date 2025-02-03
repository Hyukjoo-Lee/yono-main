import axios from 'axios';

// 카드 소비내역 가져오기
export const fetchDailyStatistics = async (userNum) => {
  const response = await axios.get('/user/daily-statistics', {
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
