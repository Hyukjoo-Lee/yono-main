import React, { useState } from 'react';
import DailyStatistics from './dailyStatistics/DailyStatistics';
import MonthlyStatistics from './monthlyStatistics/MonthlyStatistics';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CommonTabs from '../../common/CommonTabs';
import CategoryStatics from './CategoryStatics/CategoryStatics';

const CardAnalysis = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const items = [
    { text: '일별 통계' },
    { text: '월별 통계' },
    { text: '목차별 통계' },
  ];

  const panels = [
    <DailyStatistics />,
    <MonthlyStatistics />,
    <CategoryStatics />,
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
              ? '월별통계(막대그래프)'
              : '목차별통계(원형그래프)'
        }
        text={
          selectedTab === 0 ? (
            <p>
              내가 선택한 날짜의 소비내역을 알려드립니다. <br />
              캘린더의 날짜 클릭하시면 소비 내역을 확인하실수 있습니다.
            </p>
          ) : selectedTab === 1 ? (
            <p>
              유저가 선택한 최근 3개월의 소비내역을 알려드립니다. <br />
              현재 날짜 기준으로 막대,원형 그래프를 확인하실수 있습니다.
            </p>
          ) : (
            <p>
              최근 3개월의 목차별 원형그래프로 소비를 알려드립니다. <br />
              카테고리를 클릭하시면 소비 내역을 확인하실수 있습니다.
            </p>
          )
        }
      />
      {panels[selectedTab]}
    </CommonRoot>
  );
};
export default CardAnalysis;
