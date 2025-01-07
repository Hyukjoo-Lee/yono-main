import axios from 'axios';

// 유저 랭킹 가져오기
export const fetchDailyStatistics = async () => {
  const response = await axios.get('/user/daily-statistics');
  return response.data;
};
