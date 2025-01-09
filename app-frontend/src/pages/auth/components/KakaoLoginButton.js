import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';

const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2;
  background-color: #fee500;
  font-size: medium;
  color: ${({ theme }) => theme.color.gray};
  border-radius: 50%;
  border: 1px solid transparent;
  cursor: pointer;
`;
const KakaoLoginButton = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <StyledButton onClick={handleKakaoLogin}>
      <RiKakaoTalkFill size={50} />
    </StyledButton>
  );
};

export default KakaoLoginButton;
