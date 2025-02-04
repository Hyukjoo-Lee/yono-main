import React, { useEffect, useState } from 'react';
import DailyStatistics from './dailyStatistics/DailyStatistics';
import MonthlyStatistics from './monthlyStatistics/MonthlyStatistics';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CommonTabs from '../../common/CommonTabs';
import CategoryStatics from './CategoryStatics/CategoryStatics';
import { updateHistory } from '../../apis/cardHistoryApi';
import { useSelector } from 'react-redux';
import CommonLoading from '../../common/CommonLoading';

const CardAnalysis = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const userNum = user?.userNum;

  const [selectedTab, setSelectedTab] = useState(0);
  const items = [
    { text: '일별 통계' },
    { text: '목차별 통계' },
    { text: '월별 통계' },
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      if (!isLoggedIn || !userNum) return;

      try {
        const data = await updateHistory(userNum);
        console.log('업데이트된 데이터:', data);
      } catch (error) {
        console.error('업데이트 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
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
          {panels[selectedTab]}
        </>
      )}
    </CommonRoot>
  );
};
export default CardAnalysis;
