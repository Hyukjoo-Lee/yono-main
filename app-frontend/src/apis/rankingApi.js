import axios from 'axios';

// 로그인한 유저 정보
export const userRankings = async (userNum) => {
  const response = await axios.get('/badge/userList', {
    params: { userNum: Number(userNum) },
  });
  if (response.status === 204) {
    return null;
  } else if (response.status === 200) {
    return response.data;
  } else {
    return response.message;
  }
};

// 등수 업데이트 호출
export const updateRankings = async () => {
  const response = await axios.get('/badge/list');
  if (response.status === 204) {
    return null;
  } else if (response.status === 200) {
    return response.data;
  } else {
    return response.message;
  }
};
