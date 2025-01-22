import axios from 'axios';

// 유저 랭킹 가져오기
export const fetchUserRanking = async () => {
  const response = await axios.get('/user/ranking');
  return response.data;
};

// 등수 업데이트 호출
export const updateRankings = async () => {
  try {
    await axios.post('/user/ranking/update');
  } catch (error) {
    console.log(error);
  }
};
