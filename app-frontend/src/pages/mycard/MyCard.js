import React, { useState } from "react";
import CommonTabs from "../../common/CommonTabs";
import CardRegTab from "./CardRegTab";
import CardRecTab from "./CardRecTab";
import styled from "styled-components";
import CommonPageInfo from "../../common/CommonPageInfo";

const Root = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
  display: flex;
  justify-content: center;

`;

const RootIn = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;

export function MyCard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const items = [{text: "카드 등록"}, {text: "카드 추천"}]
  /**
   * 띄울 탭 페이지
   */
  const panels = [
    <CardRegTab />,
    <CardRecTab />
  ];

  return (
    <Root>
      <RootIn>
        <CommonTabs
          items={items}
          value={selectedTab}
          selectedTab={setSelectedTab}
        />
        
        <CommonPageInfo
          title="나의 카드 등록"
          text={
            <p>
              소비패턴을 확인하고 싶은 카드로 등록하세요. <br />
              등록하고 싶은 카드를 입력 후 카드 리스트에서 확인하세요.
            </p>
          }
        />
        {panels[selectedTab]}
      </RootIn>
    </Root>
  );
}
