import React from 'react';
import styled from 'styled-components';
import Calendar from '../../cardAnalysis/dailyStatistics/calendar/Calendar';
import Piechart from '../../cardAnalysis/monthlyStatistics/chart/Piechart';

const Root = styled.div``;

const piechart_data = [
  { id: '외식', value: 3 },
  { id: '의류', value: 1 },
  { id: '온라인쇼핑', value: 2 },
  { id: '주류', value: 8 },
  { id: '전자제품', value: 3 },
];

const MonthComparision = () => {
  return (
    <Root>
      <div style={{ width: 700 }}>
        <Calendar />
      </div>
      {/* 위치질문있음! */}
      <Piechart data={piechart_data} />
    </Root>
  );
};

export default MonthComparision;
