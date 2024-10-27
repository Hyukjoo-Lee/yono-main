import React from "react";
import styled from "styled-components";
import DailyStatistics from "./dailyStatistics/DailyStatistics";

const Root = styled.div`
  width: 1154px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: 30px;
`;
const TitleStyle = styled.p`
  margin: 0px;
  font-size: 32px;
  color: #212121;
  text-align: center;
  font-weight: bold;
`;

const TextStyle = styled.p`
  margin: 8px 0px 20px;
  font-size: 16px;
  color: #757575;
  line-height: 24px;
  text-align: center;
`;

const CardAnalysis = () => {
  return (
    <Root>
      <TitleStyle>일별통계(캘린더)</TitleStyle>
      <TextStyle>
        내가 선택한 날짜의 소비내역을 알려드립니다. <br />
        캘린더의 날짜 클릭하시면 소비 내역을 확인하실수 있습니다.
      </TextStyle>
      <DailyStatistics />
    </Root>
  );
};
export default CardAnalysis;
