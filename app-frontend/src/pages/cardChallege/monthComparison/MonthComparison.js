import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Barchart from './Barchart';
import MonthComparisionTable from './MonthComparisonTable';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
  const [monthlyData, setMonthlyData] = useState([]); // API로부터 받은 데이터 저장
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const userNum = user?.userNum;

  useEffect(() => {
    if (!isLoggedIn || !userNum) return;

    // 백엔드로 API 요청을 보내고 금액 및 뱃지 데이터를 받아옴
    const fetchData = async () => {
      try {
        const response = await axios.get('/badge/Comparison', {
          params: {
            userNum,
          },
        });

        if (response.status === 200) {
          const data = response.data.data;
          console.log('data: ' + data);

          const formattedData = {
            previousMonthAmount: data.currentMonthAmount || 0,
            previousToPreviousMonthAmount: data.previousMonthAmount || 0,
            previousBadgeRanking: data.ranking || 0,
            PreviousBadgeCount: data.badge || 0,
          };

          setMonthlyData(formattedData);

          setBarData([
            {
              bottle: '지지난달',
              사용금액: data.previousMonthAmount,
            },
            { bottle: '지난달', 사용금액: data.currentMonthAmount },
          ]);
        }
      } catch (error) {
        console.error('리액트에서 월별 금액 조회 실패:', error);
      }
    };

    fetchData();
  }, [userNum, isLoggedIn]);

  return (
    <Root>
      <MonthComparisionTable data={monthlyData} />
      <BarchartWrap>
        <Barchart data={barData} />
      </BarchartWrap>
    </Root>
  );
};

export default MonthComparision;
