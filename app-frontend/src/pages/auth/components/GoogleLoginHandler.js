import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../../redux/actions/userAction';
import styled from 'styled-components';

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

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      dispatch(loginWithGoogle(code));
    }

    navigate('/');
  }, [dispatch, navigate]);

  return (
    <Root>
      <LoadingText>구글 로그인 처리 중...</LoadingText>
    </Root>
  );
};

export default GoogleAuthRedirect;
