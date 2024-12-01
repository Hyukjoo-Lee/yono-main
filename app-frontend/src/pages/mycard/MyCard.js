import React, { useState } from 'react';
import CommonTabs from '../../common/CommonTabs';
import CardRegTab from './CardRegTab';
import CardRecTab from './CardRecTab';
import styled from 'styled-components';

import CommonRoot from '../../common/CommonRoot';

const RootIn = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;

export function MyCard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const items = [{ text: '카드 등록' }, { text: '카드 추천' }];

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
