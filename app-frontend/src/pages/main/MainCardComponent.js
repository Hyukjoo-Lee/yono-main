import React from "react";
import styled from "styled-components";
import CardImg from "./main_card.svg";

const StyledCardContainer = styled.div`
  height: 285px;
  display: flex;
  align-items: center;
`

const StyledCard1 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`

const StyledCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 120px;
  align-items: flex-start;
  height: 100%;
`

const StyledCardInfo1 = styled.p`
  font-size: 28px;
  font-weight: 700;
  margin: 0px 0px 15px 0px;
`

const StyledCardInfo2 = styled.p`
  font-size: 22px;
  font-weight: 500;
  margin: 0px 0px 15px 0px;
`

const StyledCardInfo3 = styled.p`
  font-size: 18px;
  font-weight: 200;
  line-height: 25px;
  margin: 0px;
`

const MainCardComponent = () => {
  return (
    <StyledCardContainer>
      {/* <!--card1--> */}
      {/* map으로 돌려야댐 */}
      <StyledCard1>
        <img src={CardImg} alt="메인카드" />

        <StyledCardInfo>
          <StyledCardInfo1>현대카드 ZERO Edition3(할인형)</StyledCardInfo1>
          <StyledCardInfo2>국내외 가맹점 0.8% 할인</StyledCardInfo2>
          <StyledCardInfo3>
            스타벅스 50% 할인(월 1회)
            <br />
            대중교통 10% 할인(청구할인)
            <br />
            영화 쿠폰 제공(연 12회)
            <br />
          </StyledCardInfo3>
        </StyledCardInfo>
      </StyledCard1>

      {/* <!--/card1--> */}

      {/* <!--card2--> */}
      {/* <div class="card2">
        <img src="./main_card2.svg" alt="메인카드" />

        <div class="card_info">
          <p class="card_info1">현대카드 Edition3(할인형)</p>
          <p class="card_info2">국내외 가맹점 0.8% 할인</p>
          <p class="card_info3">
            스타벅스 30% 할인(월 1회)
            <br />
            대중교통 20% 할인(청구할인)
            <br />
            영화 쿠폰 제공(연 6회)
            <br />
          </p>
        </div>
      </div> */}

      {/* <!--/card2--> */}
    </StyledCardContainer>
  );
};

export default MainCardComponent;
