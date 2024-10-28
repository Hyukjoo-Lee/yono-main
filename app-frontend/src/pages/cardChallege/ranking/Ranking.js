import React from "react";
import styled from "styled-components";
import RankingComponent from "./RankingComponent";

const Root = styled.div`
  width: 918px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: 30px;
  padding-bottom: 180px;
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

const Ranking = () => {
  return (
    <Root>
      <TitleStyle>뱃지 랭킹확인</TitleStyle>
      <TextStyle>
        나의 소비패턴을 확인하고 절약하면 뱃지를 드려요! <br />
        친구들과 경쟁하며 뱃지 랭킹 확인 해보세요!
      </TextStyle>
      <RankingComponent />
    </Root>
  );
};
export default Ranking;
