import axios from 'axios';

// 1. 로그인: 카카오계정을 통한 빠르고 간편한 사용자 로그인 기능입니다.
// 2. 로그아웃: 사용자 토큰을 만료시켜 로그인 상태를 해제합니다.
// 3. 사용자 정보 가져오기: 사용자 카카오계정에 등록된 정보를 제공합니다. 완료
// 4. 사용자 정보 저장하기: 사용자 카카오계정에 사용자 정의(Custom)한 서비스 데이터를 저장합니다.

// 카카오 로그인을 위한 Access Token 요청
export const getAccessToken = async (authCode) => {
  const access_token_uri = 'https://kauth.kakao.com/oauth/token';

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', process.env.REACT_APP_KAKAO_REST_API_KEY);
  params.append('redirect_uri', process.env.REACT_APP_KAKAO_REDIRECT_URI);
  params.append('code', authCode);

  const header = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  };

  const response = await axios.post(access_token_uri, params, header);
  return response.data.access_token;
};

// 카카오 사용자 정보 요청
export const getUserInfo = async (accessToken) => {
  const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 구글 사용자 정보 요청
export const getUserInfoByGoogle = async (accessToken) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('구글 사용자 정보 요청 실패:', error);
    return null;
  }
};
