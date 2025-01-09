import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, getUserInfo } from '../../../apis/authApi';
import styled from 'styled-components';
import { checkUserIdExists } from '../../../apis/userApi';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.div`
  font-size: 24px;
  color: #999;
`;

const KakaoLoginHandler = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code'); // URL에서 'code' 추출

  useEffect(() => {
    const handleLogin = async () => {
      if (!code) return;

      try {
        const accessToken = await getAccessToken(code);
        console.log('Access Token: ', accessToken);

        const userInfo = await getUserInfo(accessToken);
        console.log('User Info ID: ', userInfo.id);

        const userIdAvailable = await checkUserIdExists(userInfo.id);
        console.log(userIdAvailable);

        if (userIdAvailable) {
          navigate('/signup', { state: { userInfo } });
        } else {
          console.log('로그인');
        }
      } catch (error) {
        console.error('카카오 로그인 에러:', error);
      }
    };

    handleLogin();
  }, [code, navigate]);

  return (
    <Root>
      <LoadingText>카카오 로그인 중입니다...</LoadingText>
    </Root>
  );
};

export { KakaoLoginHandler };
