import axios from 'axios';

// 아이디 중복 확인
export const checkUserIdExists = async (userId) => {
  const response = await axios.post('/user/check-exists', {
    field: 'userId',
    value: userId,
  });
  return response.data;
};

// 회원가입
export const signUpUser = async (formData) => {
  const response = await axios.post('/user/signup', formData);
  console.log(response.data);
  return response.data;
};

// 회원번호로 회원정보 조회
export const findUserById = async (id) => {
  const response = await axios.get(`/user/${id}`);
  return response.data;
};

// 회원정보 수정
export const modifyUser = async (formData) => {
  console.log(formData.userNum);
  const response = await axios.put(`/user/${formData.userNum}`, formData);
  console.log(response.data);
};
