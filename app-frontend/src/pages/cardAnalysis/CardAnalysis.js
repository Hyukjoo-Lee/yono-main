import React from "react";
import styled from "styled-components";
import DailyStatistics from "./dailyStatistics/DailyStatistics";
import CommonPageInfo from "../../common/CommonPageInfo";

const Root = styled.div`
  width: 1154px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
`;
const CardAnalysis = () => {
  return (
    <Root>
      <CommonPageInfo
        title={"일별통계(캘린더)"}
        text={
          <p>
            내가 선택한 날짜의 소비내역을 알려드립니다. <br />
            캘린더의 날짜 클릭하시면 소비 내역을 확인하실수 있습니다.
          </p>
        }
      />
      <DailyStatistics />
    </Root>
  );
};
export default CardAnalysis;
