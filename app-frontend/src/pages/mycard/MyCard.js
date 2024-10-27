import React, { useState } from "react";
import { Root, TextStyle, TitleStyle } from "../cardAnalysis/CardAnalysis";
import CommonTabs from "../../common/CommonTabs";
import CardRegTab from "./CardRegTab";
import CardRecTab from "./CardRecTab";

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
