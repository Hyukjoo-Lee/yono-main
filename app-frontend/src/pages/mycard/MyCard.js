import React, { useState } from "react";
import CommonTabs from "../../common/CommonTabs";
import CardRegTab from "./CardRegTab";
import CardRecTab from "./CardRecTab";
import styled from "styled-components";

const Root = styled.div`
  width: 1101px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
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

export function MyCard() {
  const [selectedTab, setSelectedTab] = useState(0);

  /**
   * 띄울 탭 페이지
   */
  const panels = [
    <CardRegTab />,
    <CardRecTab />
  ];

  return (
    <Root>
      <CommonTabs
        labels={["카드 등록", "카드 추천"]}
        value={selectedTab}
        onTabChange={setSelectedTab}
      />
      <TitleStyle>나의 카드 등록</TitleStyle>
      <TextStyle>
        소비패턴을 확인하고 싶은 카드로 등록하세요. <br />
        등록하고 싶은 카드를 입력 후 카드 리스트에서 확인하세요.
      </TextStyle>
      {panels[selectedTab]}
    </Root>
  );
}
