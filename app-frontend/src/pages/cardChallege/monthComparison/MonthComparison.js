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
  const userNum = useSelector((state) => state.user.user?.userNum);

  useEffect(() => {
    if (!userNum) {
      console.error('로그인된 사용자 정보가 없습니다.');
      return;
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousMonthYear =
      currentMonth === 1 ? currentYear - 1 : currentYear;

    // const previousToPreviousMonth =
    //   previousMonth === 1 ? 12 : previousMonth - 1;
    // const previousToPreviousMonthYear =
    //   previousMonth === 1 ? previousMonthYear - 1 : previousMonthYear;

    const previousMonthStr = `${previousMonthYear}${String(previousMonth).padStart(2, '0')}`;
    // const previousToPreviousMonthStr = `${previousToPreviousMonthYear}${String(previousToPreviousMonth).padStart(2, '0')}`;

    // 백엔드로 API 요청을 보내고 금액 및 뱃지 데이터를 받아옴
    const fetchData = async () => {
      try {
        const response = await axios.get('/month/Comparison', {
          params: {
            userNum,
            yearMonth: previousMonthStr,
          },
        });

        if (response.status === 200) {
          const data = response.data.data;
          console.log(data);

          const formattedData = {
            previousMonthAmount: data.currentMonthAmount || 0,
            previousToPreviousMonthAmount: data.previousMonthAmount || 0,
            previousBadgeRanking: data.ranking || 0,
            PreviousBadgeCount: data.badge || 0,
          };

          setMonthlyData(formattedData);

          setBarData([
            {
              bottle: '저저번달',
              사용금액: data.previousMonthAmount,
            },
            { bottle: '저번달', 사용금액: data.currentMonthAmount },
          ]);
        }
      } catch (error) {
        console.error('리액트에서 월별 금액 조회 실패:', error);
      }
    };

    fetchData();
  }, [userNum]);

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
