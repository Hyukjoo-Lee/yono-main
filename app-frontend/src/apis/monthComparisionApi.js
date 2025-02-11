import axios from 'axios';

export const monthlyComparision = async (userNum) => {
  try {
    const response = await axios.get('/badge/Comparison', {
      params: { userNum },
    });

    if (response.status === 200) {
      return response.data.data; // 필요한 데이터만 반환
    }
    return null;
  } catch (error) {
    console.error('API 호출 실패:', error);
    return null;
  }
};
