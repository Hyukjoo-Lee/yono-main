import CommonRoot from "../../common/CommonRoot";
import CommonPageInfo from "../../common/CommonPageInfo";
import CommonTabs from "../../common/CommonTabs";
import BadgeInfo from "./BadgeInfo";
import CheckUserInfo from "./CheckUserInfo";
import Box from '@mui/material/Box';
import { useState } from "react";

export function MyPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const items = [{text: "뱃지 현황"}, {text: "회원 정보"}]

  // Data
  const userInfo = {
    userId : "테스트 아이디",
    password : "테스트 비밀번호",
    nickname : "테스트 닉네임",
    character : "테스트 캐릭터",
  };

  const panels = [
    <BadgeInfo />,
    <CheckUserInfo 
      {...userInfo}
    />
  ];

  return (
    <CommonRoot>
      <CommonPageInfo
        title = "마이 페이지"
        text = {<p></p>}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}>
        <CommonTabs
          items={items}
          value={selectedTab}
          selectedTab={setSelectedTab}
        />
      </Box>

      {panels[selectedTab]}    

    </CommonRoot>
  );
}
