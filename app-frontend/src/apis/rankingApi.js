import axios from 'axios';

// 유저 랭킹 가져오기
export const fetchUserRanking = async () => {
  const response = await axios.get('/user/ranking');
  return response.data;
};
