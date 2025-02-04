import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonTabs from '../../common/CommonTabs';
import MonthComparision from './monthComparison/MonthComparison';
import Ranking from './ranking/Ranking';
import { useSelector } from 'react-redux';
import { findUserById } from '../../apis/userApi';
import CommonDialog from '../../common/CommonDialog';
import { useNavigate } from 'react-router-dom';

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
  const isLoggedIn = useSelector((state) => state.user.user?.userNum); // 현재 로그인한 유저의 userNum
  const [users, setUsers] = useState(null);
  const [isShowLoginDialog, setIsShowLoginDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const items = [{ text: '전월비교' }, { text: '뱃지랭킹' }];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoggedIn) {
        setIsShowLoginDialog(true);
      } else {
        const user = await findUserById(isLoggedIn);
        if (user != null && typeof user != 'string') {
          setUsers(user.data);
        }
      }
    };

    fetchUser();
  }, [isLoggedIn, users]);

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
                나만의 소비 패턴을 분석하고, 절약을 통해 뱃지를 획득하세요.
                <br />
                다른 유저들과 함께 경쟁하며, 더 나은 소비 습관을 만들어가세요.
              </p>
            )
          }
        />
        {panels[selectedTab]}
      </RootIn>

      {isShowLoginDialog && (
        <CommonDialog
          open={isShowLoginDialog}
          onClick={() => navigate('/login')}
          onClose={() => navigate('/login')}
          submitText="로그인"
        >
          <p style={{ textAlign: 'center' }}>
            로그인 정보가 없습니다. 로그인을 진행해주세요!
          </p>
        </CommonDialog>
      )}
    </Root>
  );
}
