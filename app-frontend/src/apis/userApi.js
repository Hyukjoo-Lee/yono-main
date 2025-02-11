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
  return response.data;
};

// 로그인
export const login = async (formData) => {
  const response = await axios.post('/user/login', formData);
  return response.data;
};

// 회원번호로 회원정보 조회
export const findUserById = async (id) => {
  const response = await axios.get(`/user/${id}`);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 204) {
    return null;
  } else {
    return response.message;
  }
};

// 마이 페이지 내 패스워드 매칭 여부 판단
export const validatePwd = async (userData) => {
  const response = await axios.post('/user/validatePwd', userData);
  return response;
};

// 회원정보 수정
export const modifyUser = async (formData) => {
  try {
    const parsedUserInfo = JSON.parse(formData.get('userInfo'));
    const response = await axios.put(
      `/user/${parsedUserInfo.userNum}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};

// 회원 이름과 메일로 아이디 조회 (아이디 찾기)
export const findId = async (name, email) => {
  try {
    const response = await axios.get('/user/findId', {
      params: { name, email },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};

// 회원 이름, 아이디, 메일로 비밀번호 조회 (비밀번호 찾기)
export const findPwd = async (name, email, id) => {
  try {
    const response = await axios.get('/user/findPwd', {
      params: { name, email, id },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};

// 임시 비밀번호 발급 및 변경
export const updateTempPwd = async (email) => {
  const response = await axios.put('/user/updateTempPwd', null, {
    params: { email },
  });

  return response.data;
};

// 비밀번호 변경
export const updatePwd = async (password, userId) => {
  const response = await axios.put('/user/updatePwd', null, {
    params: { password, userId },
  });

  return response.data;
};

// 회원 탈퇴
export const deleteUser = async (userNum) => {
  await axios.delete('/user/deleteUser', {
    params: { userNum },
  });
};
