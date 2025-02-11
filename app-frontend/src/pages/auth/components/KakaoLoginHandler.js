import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAccessToken, getUserInfo } from '../../../apis/authApi';
import styled from 'styled-components';
import { checkUserIdExists, signUpUser } from '../../../apis/userApi';
import { loginUser } from '../../../redux/actions/userAction';
import { v4 as uuidv4 } from 'uuid';

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
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code'); // URL에서 'code' 추출

  useEffect(() => {
    const handleLogin = async () => {
      if (!code) return;

      try {
        const accessToken = await getAccessToken(code);
        const userInfo = await getUserInfo(accessToken);

        const userId = 'kakao' + userInfo.id.toString();
        const formData = {
          userId,
          password: uuidv4(),
          name: userInfo.kakao_account.profile.nickname,
          email: userInfo.kakao_account.email,
        };

        const loginFormData = {
          userId,
          password: '',
          isSocialLogin: true,
        };

        console.log('formData:', formData);

        // 중복 아이디 체크
        const checkIdResponse = await checkUserIdExists(userId);
        console.log(typeof userIdAvailable);

        if (checkIdResponse.userIdAvailable) {
          try {
            // 회원가입
            const registerResponse = await signUpUser(formData);
            if (registerResponse.status === 201) {
              console.log('회원가입 성공:', registerResponse);
            } else {
              console.log('회원가입 실패');
            }

            const loginResponse = await dispatch(loginUser(loginFormData));

            if (loginResponse.payload.status === 200) {
              localStorage.setItem('accessToken', loginResponse.payload?.token);
              navigate('/');
            }
          } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
          }
        } else {
          // 기존 회원이면 로그인
          const loginResponse = await dispatch(loginUser(loginFormData));

          if (loginResponse.payload.status === 200) {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('카카오 로그인 에러:', error);
      }
    };

    handleLogin();
  }, [code, navigate, dispatch]);

  return (
    <Root>
      <LoadingText>카카오 로그인 중입니다...</LoadingText>
    </Root>
  );
};

export { KakaoLoginHandler };
