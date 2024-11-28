import React, { useState } from 'react';
import styled from 'styled-components';
import CommonTabs from '../../common/CommonTabs';
import CommunityTable from './CommunityTable';
import NoticeTable from './NoticeTable';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
`;

const TabStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Community() {
  const [selectedTab, setSelectedTab] = useState(0);
  const items = [{ text: '커뮤니티' }, { text: '공지사항' }];

  const panels = [<CommunityTable />, <NoticeTable />];

  return (
    <>
      <Root>
        <TabStyle>
          <CommonTabs
            items={items}
            value={selectedTab}
            selectedTab={setSelectedTab}
          ></CommonTabs>
        </TabStyle>
        {panels[selectedTab]}
      </Root>
    </>
  );
}
export default Community;
