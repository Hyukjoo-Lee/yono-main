import React from 'react';
import styled from 'styled-components';
import CardImg from '../../assets/images/main_card.svg';

const StyledCardContainer = styled.div`
  height: 285px;
  display: flex;
  align-items: center;
`;

const StyledCard1 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const StyledCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 120px;
  align-items: flex-start;
  height: 100%;
`;

const StyledCardInfo1 = styled.p`
  font-size: 28px;
  font-weight: 700;
  margin: 0px 0px 15px 0px;
`;

const StyledCardInfo2 = styled.p`
  font-size: 22px;
  font-weight: 500;
  margin: 0px 0px 15px 0px;
`;

const StyledCardInfo3 = styled.p`
  font-size: 18px;
  font-weight: 200;
  line-height: 25px;
  margin: 0px;
`;

const MainCardComponent = () => {
  const mainCardData = [
    {
      title: `현대카드 ZERO Edition3(할인형)`,
      subtitle: `국내외 가맹점 0.8% 할인`,
      info1: `스타벅스 50% 할인(월 1회)`,
      info2: `대중교통 10% 할인(청구할인)`,
      info3: `영화 쿠폰 제공(연 12회)`,
      imgSrc: CardImg,
    },
  ];
  return (
    <StyledCardContainer>
      {mainCardData.map((item) => (
        <StyledCard1>
          <img src={item.imgSrc} alt="메인카드" />

          <StyledCardInfo>
            <StyledCardInfo1>{item.title}</StyledCardInfo1>
            <StyledCardInfo2>{item.subtitle}</StyledCardInfo2>
            <StyledCardInfo3>
              {item.info1}
              <br />
              {item.info2}
              <br />
              {item.info3}
              <br />
            </StyledCardInfo3>
          </StyledCardInfo>
        </StyledCard1>
      ))}
    </StyledCardContainer>
  );
};

export default MainCardComponent;
