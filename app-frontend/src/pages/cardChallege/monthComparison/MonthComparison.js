import React, { useState } from 'react';
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

const MonthComparision = () => {
  const [barData, setBarData] = useState([]); // 차트 데이터 상태

  // 월별 데이터가 업데이트되면 차트 데이터 업데이트
  const handleMonthComparisonData = (data) => {
    const transformedData = [
      {
        bottle: '저저번달',
        사용금액: data.previousToPreviousMonthAmount,
      },
      {
        bottle: '저번달',
        사용금액: data.previousMonthAmount,
      },
    ];
    setBarData(transformedData);
  };

  return (
    <Root>
      <MonthComparisionTable onDataUpdate={handleMonthComparisonData} />
      <BarchartWrap>
        <Barchart data={barData} />
      </BarchartWrap>
    </Root>
  );
};

export default MonthComparision;
