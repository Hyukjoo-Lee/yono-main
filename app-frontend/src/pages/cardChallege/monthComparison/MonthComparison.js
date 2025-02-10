import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Barchart from './Barchart';
import MonthComparisionTable from './MonthComparisonTable';
import { useSelector } from 'react-redux';
import { monthlyComparision } from '../../../apis/MonthComparisionApi';

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

const BoxStyle = styled.div`
  width: 100%;
  border-radius: 7px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  overflow: hidden;
`;

const EmptyBox = styled(BoxStyle)`
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    margin: 0px;
    font-size: ${(props) => props.theme.fontSize.eighteen};
    color: ${(props) => props.theme.color.gray};
  }
`;

const MonthComparision = () => {
  const [barData, setBarData] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const userNum = user?.userNum;

  const currentMonth = new Date();
  const previousMonth = new Date(currentMonth);
  previousMonth.setMonth(currentMonth.getMonth() - 1);
  const previousToPreviousMonth = new Date(currentMonth);
  previousToPreviousMonth.setMonth(currentMonth.getMonth() - 2);

  const formatMonth = (date) => String(date.getMonth() + 1);
  const previousMonthString = formatMonth(previousMonth);
  const previousToPreviousMonthString = formatMonth(previousToPreviousMonth);

  useEffect(() => {
    if (!isLoggedIn || !userNum) return;

    const fetchData = async () => {
      const data = await monthlyComparision(userNum);
      if (data) {
        console.log('data:', data);

        const formattedData = {
          previousMonthAmount: data.currentMonthAmount || 0,
          previousToPreviousMonthAmount: data.previousMonthAmount || 0,
          previousBadgeRanking: data.ranking || 0,
          previousBadgeCount: data.badge || 0,
        };

        setMonthlyData(formattedData);
        console.log('받은 데이터:', formattedData);

        setBarData([
          {
            bottle: `${previousToPreviousMonthString}월`,
            사용금액: data.previousMonthAmount,
          },
          {
            bottle: `${previousMonthString} 월`,
            사용금액: data.currentMonthAmount,
          },
        ]);
      }
    };

    fetchData();
  }, [userNum, isLoggedIn, previousToPreviousMonthString, previousMonthString]);

  return (
    <Root>
      {Object.keys(monthlyData).length === 0 ? (
        <EmptyBox>
          <p>
            새로 가입하신 계정입니다. 이전 달과 지지난 달의 정산 내역은 생성되지
            않았습니다. 다음 달부터 확인하실 수 있습니다.
          </p>
        </EmptyBox>
      ) : (
        <>
          <MonthComparisionTable
            data={monthlyData}
            previousMonthString={previousMonthString}
            previousToPreviousMonthString={previousToPreviousMonthString}
          />
          <BarchartWrap>
            <Barchart data={barData} />
          </BarchartWrap>
        </>
      )}
    </Root>
  );
};

export default MonthComparision;
