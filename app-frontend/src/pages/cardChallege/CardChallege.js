import React, { useState } from 'react';
import styled from 'styled-components';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonTabs from '../../common/CommonTabs';
import MonthComparision from './monthComparison/MonthComparison';
import Ranking from './ranking/Ranking';

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
export function CardChallege() {
  const [selectedTab, setSelectedTab] = useState(0);
  const items = [{ text: '전월비교' }, { text: '뱃지랭킹' }];

  const panels = [<MonthComparision />, <Ranking />];
  return (
    <Root>
      <RootIn>
        <CommonTabs
          items={items}
          value={selectedTab}
          selectedTab={setSelectedTab}
        />

        <CommonPageInfo
          title={selectedTab === 0 ? '전월비교' : '뱃지 랭킹확인'}
          text={
            selectedTab === 0 ? (
              <p>
                지난 달과 이번 달의 소비 패턴을 분석해드립니다.
                <br />
                캘린더에서 원하는 날짜를 클릭하여, 소비 내역를 쉽게 확인하세요.
              </p>
            ) : (
              <p>
                나만의 소비 패턴을 분석하고, 절약을 통해 뱃지를 획득하세요. {' '}
                <br />
                다른 유저들과 함께 경쟁하며, 더 나은 소비 습관을 만들어가세요.
              </p>
            )
          }
        />
        {panels[selectedTab]}
      </RootIn>
    </Root>
  );
}
