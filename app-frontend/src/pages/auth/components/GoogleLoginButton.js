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
  };

  return (
    <StyledButton onClick={handleGoogleLogin}>
      <FcGoogle size={24} />
    </StyledButton>
  );
};

export default GoogleLoginButton;
