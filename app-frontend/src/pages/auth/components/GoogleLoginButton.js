import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

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
  const handleGoogleLogin = () => {
    console.log('Google 로그인 클릭');
    // TODO: 여기에 Google OAuth 로직 추가
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=email`;

    window.location.href = googleAuthURL;
  };

  return (
    <StyledButton onClick={handleGoogleLogin}>
      <FcGoogle size={24} />
    </StyledButton>
  );
};

export default GoogleLoginButton;
