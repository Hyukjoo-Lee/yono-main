import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import CommonTabs from '../../common/CommonTabs';
import CommonRoot from '../../common/CommonRoot';
import CommonDialog from '../../common/CommonDialog';

import CardRegTab from './CardRegTab';
import CardRecTab from './CardRecTab';

const RootIn = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;

export function MyCard() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userFromStore = useSelector((state) => state.user.user);

  const [selectedTab, setSelectedTab] = useState(0);
  const [user, setUser] = useState('');
  const [isShowDialog, setIsShowDialog] = useState(false);

  const navigate = useNavigate();

  const items = [{ text: '카드 등록' }, { text: '카드 추천' }];
  const panels = [<CardRegTab user={user}/>, <CardRecTab user={user}/>];

  useEffect(() => {
    if (!isLoggedIn) {
      setIsShowDialog(true);
    } else {
      setUser(userFromStore);
    }
  }, [isLoggedIn, userFromStore]);

  return (
    <CommonRoot>
      <RootIn>
        <CommonTabs
          items={items}
          value={selectedTab}
          selectedTab={setSelectedTab}
        />

        {React.cloneElement(panels[selectedTab], { user })}
      </RootIn>

      {isShowDialog && (
        <CommonDialog
          open={isShowDialog}
          onClick={() => navigate('/login')}
          onClose={() => navigate('/login')}
          submitText="로그인"
        >
          <p style={{ textAlign: 'center' }}>
            로그인 정보가 없습니다. 로그인을 진행해주세요!
          </p>
        </CommonDialog>
      )}
    </CommonRoot>
  );
}
