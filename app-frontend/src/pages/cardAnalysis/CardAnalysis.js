import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getprimaryCardInfo } from '../../apis/cardApi.js';
import CommonDialog from '../../common/CommonDialog.js';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CommonTabs from '../../common/CommonTabs';
import CategoryStatics from './CategoryStatics/CategoryStatics';
import DailyStatistics from './dailyStatistics/DailyStatistics';
import MonthlyStatistics from './monthlyStatistics/MonthlyStatistics';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { updateHistory } from '../../apis/cardHistoryApi.js';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const MessageBox = styled.p`
  text-align: center;
  color: ${(props) => props.theme.color.blue};
  margin: 0;
  animation: ${blink} 1s step-start infinite;
`;

const CardAnalysis = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [isShowLoginDialog, setIsShowLoginDialog] = useState(false);
  const [isShowCardDialog, setIsShowCardDialog] = useState(false);
  const [isShowPanels, setIsShowPanels] = useState(false);
  const [isHistory, setIsHistory] = useState(null);
  const navigate = useNavigate();

  const userNum = user?.userNum;

  const [selectedTab, setSelectedTab] = useState(0);
  const items = [
    { text: '일별 통계' },
    { text: '목차별 통계' },
    { text: '월별 통계' },
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      if (!isLoggedIn || !userNum) {
        setIsShowLoginDialog(true);
        return;
      } else {
        const card = await getprimaryCardInfo(userNum);
        if (card == null || typeof card == 'string') {
          setIsShowCardDialog(true);
          return;
        }
      }
      setIsShowPanels(true);

      // const history = await updateHistory(userNum);
      // setIsHistory(history.data);
    };

    fetchHistory();
  }, [userNum, isLoggedIn]);

  const panels = [
    <DailyStatistics isHistory={isHistory} />,
    <CategoryStatics isHistory={isHistory} />,
    <MonthlyStatistics isHistory={isHistory} />,
  ];
  return (
    <CommonRoot>
      <CommonTabs
        items={items}
        value={selectedTab}
        selectedTab={setSelectedTab}
      />
      <CommonPageInfo
        title={
          selectedTab === 0
            ? '일별통계(캘린더)'
            : selectedTab === 1
              ? '목차별통계(원형그래프)'
              : '월별통계(막대/원형그래프)'
        }
        text={
          selectedTab === 0 ? (
            <p>
              유저가 선택한 날짜의 소비내역을 알려드립니다. <br />
              캘린더의 날짜를 클릭하시면 소비 내역을 확인하실수 있습니다.
            </p>
          ) : selectedTab === 1 ? (
            <p>
              최근 1개월의 목차별 원형그래프로 소비를 알려드립니다. <br />
              카테고리를 클릭하면 상세 내역을 확인할 수 있습니다.
            </p>
          ) : (
            <p>
              유저의 최근 3개월간의 소비 내역을 분석해드립니다. <br />
              막대와 원형 그래프를 통해 직관적으로 확인할 수 있습니다.
            </p>
          )
        }
      />
      <div style={{ height: isHistory !== true ? 44 : 0 }}>
        {isHistory !== true && isLoggedIn && (
          <MessageBox>
            {isHistory === null
              ? '최신 데이터를 갱신 중입니다. 이 작업은 몇 초 정도 소요될 수 있습니다.'
              : '최신 데이터를 갱신 중 오류가 발생했습니다. 다시 실행해주세요.'}
          </MessageBox>
        )}
      </div>

      {isShowPanels && panels[selectedTab]}

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

      {isShowCardDialog && (
        <CommonDialog
          open={isShowCardDialog}
          onClick={() => navigate('/mycard')}
          onClose={() => navigate('/mycard')}
          submitText="대표카드 등록하기"
        >
          <p style={{ textAlign: 'center' }}>
            등록된 대표카드가 없습니다! 대표카드를 등록해주세요.
          </p>
        </CommonDialog>
      )}
    </CommonRoot>
  );
};
export default CardAnalysis;
