import React from 'react';
import styled from 'styled-components';
import Barchart from './Barchart';
import MonthComparisionTable from './MonthComparisonTable';

const Root = styled.div`
  width: 100%;
  height: 545px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BarchartWrap = styled.div`
  width: 480px;
  height: 530px;
`;

const barchart_data = [
  {
    bottle: '저번달',
    목표금액: 3000,
    사용금액: 2000,
  },
  {
    bottle: '이번달',
    목표금액: 2000,
    사용금액: 1500,
  },
];

const MonthComparision = () => {
  return (
    <Root>
      <MonthComparisionTable />
      <BarchartWrap>
        <Barchart data={barchart_data} />
      </BarchartWrap>
    </Root>
  );
};

export default MonthComparision;
