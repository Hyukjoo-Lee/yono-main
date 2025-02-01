import axios from 'axios';

// 카드 소비내역 가져오기
export const fetchDailyStatistics = async (userNum) => {
  const response = await axios.get('/user/daily-statistics', {
    params: { userNum },
  });
  return response.data;
};
