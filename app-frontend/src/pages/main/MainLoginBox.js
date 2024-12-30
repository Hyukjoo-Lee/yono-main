import React from 'react';
import styled from 'styled-components';
import MainCardButton from './MainCardButton';
import MainCardComponent from './MainCardComponent';

const StyledWrap = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 400px;
`;

const StyledCardP = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: bold;
  margin: 0;
  padding-bottom: 30px;
`;
const StyledCardWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & > div:last-child {
    transform: scaleX(-1);
  }
`;
//로그인시 나오는 등록카드 확인 박스
const MainLoginBox = () => {
  return (
    <StyledWrap>
      <StyledCardP>나의 등록 카드</StyledCardP>
      <StyledCardWrap>
        <MainCardButton />
        <MainCardComponent />
        <MainCardButton />
      </StyledCardWrap>
    </StyledWrap>
  );
};

export default MainLoginBox;
