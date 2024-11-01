import React, { useState } from "react";
import CommonPageInfo from "../../common/CommonPageInfo";
import CommonTabs from "../../common/CommonTabs";
import Ranking from "./ranking/Ranking";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
  display: flex;
  justify-content: center;
`;

const RootIn = styled.div`
  width: ${(props) => props.theme.display.sm};
  margin: 0 auto;
  box-sizing: border-box;
`;
export function CardChallege() {
  const [selectedTab, setSelectedTab] = useState(0);
  const items = [{ text: "전월비교" }, { text: "뱃지랭킹" }];

  const panels = [<Ranking />, <Ranking />];
  return (
    <Root>
      <RootIn>
        <CommonTabs
          items={items}
          value={selectedTab}
          selectedTab={setSelectedTab}
        />
        <CommonPageInfo
          title="뱃지 랭킹확인"
          text={
            <p>
              나의 소비패턴을 확인하고 절약하면 뱃지를 드려요! <br />
              친구들과 경쟁하며 뱃지 랭킹 확인 해보세요!
            </p>
          }
        />
        {panels[selectedTab]}
      </RootIn>
    </Root>
  );
}
