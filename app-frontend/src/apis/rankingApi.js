import axios from 'axios';

// 등수 업데이트 호출
export const updateRankings = async () => {
  try {
    const response = await axios.get('/user/ranking/list');
    return response.data;
  } catch (error) {
    console.error('등수 업데이트 실패:', error.response?.data || error.message);
  }
};
