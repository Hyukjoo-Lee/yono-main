import React from 'react';
import styled from 'styled-components';
import CommonRoot from '../../common/CommonRoot';
import MainBox from './MainBox';
import MainCardBox from './MainCardBox';
import MainIntro from './MainIntro';
import { useSelector } from 'react-redux';

const StyledWrap = styled.div`
  width: 1200px;
`;

export function MainPage() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  // redux 상태를 확인
  console.log('로그인 된 유저: ' + user);

  return (
    <CommonRoot>
      <StyledWrap>
        <MainIntro />
        <MainBox />
        <MainCardBox isLoggedIn={isLoggedIn} />
      </StyledWrap>
    </CommonRoot>
  );
}
