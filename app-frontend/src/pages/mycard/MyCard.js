import React, { useEffect, useState } from 'react';
import CommonTabs from '../../common/CommonTabs';
import CardRegTab from './CardRegTab';
import CardRecTab from './CardRecTab';
import styled from 'styled-components';

import CommonRoot from '../../common/CommonRoot';
import { saveCodefCard } from '../../apis/cardApi';

const RootIn = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;

export function MyCard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const items = [{ text: '카드 등록' }, { text: '카드 추천' }];

  // Codef 에서 실제 가지고 보유하고 있는 카드리스트 + 혜택 정보 저장
  // organization, userNum
  useEffect(() => {
    const fetchCardListData = async () => {
      try {
        const response = await saveCodefCard();
        console.log('DB 저장 완료: ' + response);
      } catch (error) {
        console.error('카드 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchCardListData();
  }, []);

  const panels = [<CardRegTab />, <CardRecTab />];

  return (
    <CommonRoot>
      <RootIn>
        <CommonTabs
          items={items}
          value={selectedTab}
          selectedTab={setSelectedTab}
        />
        {panels[selectedTab]}
      </RootIn>
    </CommonRoot>
  );
}
