import React from 'react';
import styled from 'styled-components';
import Calendar from '../../cardAnalysis/dailyStatistics/calendar/Calendar';
import Barchart from '../../cardAnalysis/monthlyStatistics/chart/Barchart';

const Root = styled.div``;

const barchart_data = [
  {
    bottle: '9월',
    식비: 1200,
    교통비: 1000,
    쇼핑: 1100,
    문화: 3000,
    전자제품: 1500,
  },
  {
    bottle: '10월',
    식비: 2200,
    교통비: 2000,
    쇼핑: 2100,
    문화: 10000,
    전자제품: 3500,
  },
  {
    bottle: '11월',
    식비: 3200,
    교통비: 3000,
    쇼핑: 3100,
    문화: 5000,
    전자제품: 10500,
  },
];

const MonthComparision = () => {
  return (
    <Root>
      <div style={{ width: 700 }}>
        <Calendar />
      </div>
      {/* 위치질문있음! */}
      <Barchart data={barchart_data} />
    </Root>
  );
};

export default MonthComparision;
