import axios from 'axios';

// 로그인한 유저 정보
export const userRankings = async (userNum) => {
  try {
    const response = await axios.get('/badge/userList', {
      params: { userNum: Number(userNum) },
    });
    return response.data;
  } catch (error) {
    console.error('유저 랭킹 정보 실패:', error.response?.data || error.message);
  }
};

// 등수 업데이트 호출
export const updateRankings = async () => {
  try {
    const response = await axios.get('/badge/list');
    return response.data;
  } catch (error) {
    console.error('등수 업데이트 실패:', error.response?.data || error.message);
  }
};
