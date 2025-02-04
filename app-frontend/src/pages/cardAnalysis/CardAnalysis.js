import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getprimaryCardInfo } from '../../apis/cardApi.js';
import CommonDialog from '../../common/CommonDialog.js';
import CommonLoading from '../../common/CommonLoading';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CommonTabs from '../../common/CommonTabs';
import CategoryStatics from './CategoryStatics/CategoryStatics';
import DailyStatistics from './dailyStatistics/DailyStatistics';
import MonthlyStatistics from './monthlyStatistics/MonthlyStatistics';
import { useNavigate } from 'react-router-dom';

const CardAnalysis = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowLoginDialog, setIsShowLoginDialog] = useState(false);
  const [isShowCardDialog, setIsShowCardDialog] = useState(false);
  const [isShowPanels, setIsShowPanels] = useState(false);
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
        setIsLoading(false);
        return;
      } else {
        const card = await getprimaryCardInfo(userNum);
        if (card == null || typeof card == 'string') {
          setIsShowCardDialog(true);
          setIsLoading(false);
          return;
        }
      }
      setIsShowPanels(true);
      setIsLoading(false);
    };

    fetchHistory();
  }, [userNum, isLoggedIn]);

  const panels = [
    <DailyStatistics />,
    <CategoryStatics />,
    <MonthlyStatistics />,
  ];
  return (
    <CommonRoot>
      {isLoading ? (
        <CommonLoading />
      ) : (
        <>
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
          {isShowPanels && panels[selectedTab]}
        </>
      )}

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
