import React from "react";

import CommonButton from "../../common/CommonButton";
import CommonInput from "../../common/CommonInput";
import styled from "styled-components";
import CommonTabs from "../../common/CommonTabs";
import CommunityTable from "./CommunityTable";
import Notice from "./Notice";

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
`;


const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items : center;
  margin-bottom:30px;
  margin-right:10px;
  & Button {
  margin-top:6px;
  margin-left: 10px;
  }

`;
const TabStyle = styled.div`
  display :flex;
  align-items: center;
  justify-content: center;
`;

export function Community() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const items = [{ text: "커뮤니티"}, { text: "공지사항" }];
  

  const panels = [
    <CommunityTable />,
    <Notice />
  ];


  return (
    <>
      <Root>
        <Box>
          <CommonInput width="228px" height="39px" placeholder="검색어를 입력하세요" />
          <CommonButton width="74px" height="39px" background-color="#3563E9" color="white" text="검색" borderRadius="5px" />
        </Box>

        <TabStyle>
          <CommonTabs
            items={items}
            value={selectedTab}
            selectedTab={setSelectedTab}
            >
            </CommonTabs>

        </TabStyle>
        {panels[selectedTab]}
        

      </Root>
    </>
  );
}
export default Community;



