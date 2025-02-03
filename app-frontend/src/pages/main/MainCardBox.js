// import React, { useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import { registeredCardData } from '../../mockData/cardMockData';
// import CustomSlides from '../mycard/CardSlider';

const StyledWrap = styled.div`
  margin-top: 50px;
  width: 100%;
  height: auto;
  & span {
    font-size: 20px;
  }
`;

const StyledCardContainer = styled.div`
  margin: -18px 0 30px 0;
`;

const StyledCardP = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  border-radius: 7px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const MainCardBox = ({ isLoggedIn }) => {
  // 등록된 카드 데이터
  const cardData = registeredCardData;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <StyledWrap>
      <StyledCardP>나의 등록 카드</StyledCardP>
      <StyledCardContainer>
        {!cardData || cardData.length === 0 ? (
          <EmptyBox>
            <p>등록된 카드가 없습니다! (카드 등록 후 보여집니다.)</p>
          </EmptyBox>
        ) : (
          // <CustomSlides cardData={cardData} showDetailed={true} />
          <></> // TODO: 카드 등록 폼 내 슬라이드 변경으로 인해 에러 발생 => 메인 페이지 내 알맞게 적용 필요
        )}
      </StyledCardContainer>
    </StyledWrap>
  );
};

export default MainCardBox;
