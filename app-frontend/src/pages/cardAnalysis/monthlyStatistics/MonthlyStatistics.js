import React from 'react';
import styled from 'styled-components';
import Piechart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Piechart';
import Barchart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Barchart';

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

const piechart_data = [
  { id: '외식', value: 3 },
  { id: '의류', value: 1 },
  { id: '온라인쇼핑', value: 2 },
  { id: '주류', value: 8 },
  { id: '전자제품', value: 3 },
];

const Root = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MonthlyStatistics = () => {
  return (
    <Root>
      <Barchart data={barchart_data} />
      <Piechart data={piechart_data} />
    </Root>
  );
};

export default MonthlyStatistics;
