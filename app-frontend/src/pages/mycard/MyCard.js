import React, { useEffect, useState } from 'react';
import CommonTabs from '../../common/CommonTabs';
import CardRegTab from './CardRegTab';
import CardRecTab from './CardRecTab';
import styled from 'styled-components';

import CommonRoot from '../../common/CommonRoot';
import { getUserCards } from '../../apis/cardApi';

const RootIn = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;

export function MyCard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [cardList, setCardList] = useState([]);

  const items = [{ text: '카드 등록' }, { text: '카드 추천' }];

  useEffect(() => {
    const fetchCardListData = async () => {
      try {
        const cardList = await getUserCards();
        setCardList(cardList);
      } catch (error) {
        console.error('유저 정보를 불러오는 중 오류 발생:', error);
        setCardList(null);
      }
    };

    fetchCardListData();
  }, []);

  const panels = [<CardRegTab />, <CardRecTab />];

  console.log('cardList: ' + cardList);
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
