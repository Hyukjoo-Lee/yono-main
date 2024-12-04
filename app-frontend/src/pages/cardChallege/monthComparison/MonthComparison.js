import React from 'react';
import styled from 'styled-components';
import Calendar from '../../cardAnalysis/dailyStatistics/calendar/Calendar';
import Barchart from '../../cardAnalysis/monthlyStatistics/chart/Barchart';

const Root = styled.div``;

const barchart_data = [
  {
    bottle: '9월',
    외식: 1200,
    의류: 1000,
    온라인쇼핑: 1100,
    주류: 3000,
    전자제품: 1500,
  },
  {
    bottle: '10월',
    외식: 2200,
    의류: 2000,
    온라인쇼핑: 2100,
    주류: 10000,
    전자제품: 3500,
  },
  {
    bottle: '11월',
    외식: 3200,
    의류: 3000,
    온라인쇼핑: 3100,
    주류: 5000,
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
