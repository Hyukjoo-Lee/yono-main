import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { getUserInfoByGoogle } from '../../../apis/authApi';
import { v4 as uuidv4 } from 'uuid';
import { checkUserIdExists, signUpUser } from '../../../apis/userApi';
import { loginUser } from '../../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  font-size: medium;
  color: #5f6368;
  border-radius: 50%;
  border: 1px solid #dfe1e5;
  cursor: pointer;
`;

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (res) => {
    try {
      // 구글 사용자 정보 요청
      const userInfo = await getUserInfoByGoogle(res.access_token);

      if (!userInfo) {
        console.error('구글 사용자 정보를 가져오지 못했습니다.');
        return;
      }

      const userId = generateUserId(userInfo.sub);

      const formData = {
        userId,
        password: uuidv4(),
        name: '테스팅',
        // TODO: 이메일 중복 체크 처리
        email: userInfo.email,
      };

      const loginFormData = {
        userId,
        password: '',
        isSocialLogin: true,
      };

      const checkIdResponse = await checkUserIdExists(userId);

      if (checkIdResponse.userIdAvailable) {
        try {
          const registerResponse = await signUpUser(formData);
          if (registerResponse.status === 201) {
            console.log('회원가입 성공:', registerResponse);
          } else {
            console.log('회원가입 실패');
          }

          // 회원가입 후 로그인 요청
          const loginResponse = await dispatch(loginUser(loginFormData));

          if (loginResponse.payload.status === 200) {
            localStorage.setItem('accessToken', loginResponse.payload?.token);
            navigate('/');
          }
        } catch (error) {
          console.error('회원가입 중 오류 발생:', error);
        }
      } else {
        // 기존 회원이면 로그인 진행
        const loginResponse = await dispatch(loginUser(loginFormData));

        if (loginResponse.payload.status === 200) {
          localStorage.setItem('accessToken', loginResponse.payload?.token);
          navigate('/');
        }
      }
    } catch (error) {
      console.error('구글 로그인 에러:', error);
    }
  };

  const generateUserId = (sub) => {
    // 아이디 12 자리로 변환
    return `google${sub}`.substring(0, 12);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleLogin,
    onError: (error) => console.error('구글 로그인 실패:', error),
  });

  return (
    <StyledButton onClick={handleGoogleLogin}>
      <FcGoogle size={24} />
    </StyledButton>
  );
};

export default GoogleLoginButton;
