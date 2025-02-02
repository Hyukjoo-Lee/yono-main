import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Barchart from './Barchart';

const TextWrap = styled.div`
  width: 720px;
  height: 530px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Titlediv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
  width: 335px;
  height: 235px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.color.lightBlue};

  & p {
    padding-bottom: 30px;
    font-size: ${(props) => props.theme.fontSize.md};
    margin: 0px;
  }
  & span {
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: bold;
  }
  & hr {
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    margin: 0 20px 40px 20px;
    width: 70%;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MonthComparisonTable = () => {
  const [monthlyData, setMonthlyData] = useState(null); // API로부터 받은 데이터 저장

  // 로그인한 사용자 정보 가져오기
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

    const previousToPreviousMonth =
      previousMonth === 1 ? 12 : previousMonth - 1;
    const previousToPreviousMonthYear =
      previousMonth === 1 ? previousMonthYear - 1 : previousMonthYear;

    const previousMonthStr = `${previousMonthYear}${String(previousMonth).padStart(2, '0')}`;
    const previousToPreviousMonthStr = `${previousToPreviousMonthYear}${String(previousToPreviousMonth).padStart(2, '0')}`;

    // 백엔드로 API 요청을 보내고 금액 및 뱃지 데이터를 받아옴
    const fetchData = async () => {
      try {
        const response = await axios.get('/month/Comparison', {
          params: {
            userNum,
            yearMonth: previousMonthStr,
          },
        });

        console.log('로그인 :' + userNum);

        if (response.status === 200) {
          // API 응답에서 data를 추출
          const data = response.data.data; // 실제 응답 데이터는 response.data.data 안에 있음

          console.log('받은 데이터: ', data);

          // 상태 업데이트
          setMonthlyData({
            previousMonthAmount: data.previousMonthAmount || 0, // 저번 달 금액
            previousToPreviousMonthAmount: data.currentMonthAmount || 0, // 이전 달 금액
            previousBadgeRanking: data.badge || 0, // 절약률로 얻은 배지 개수
            PreviousBadgeCount: data.badge || 0, // 배지 개수
          });
        }
      } catch (error) {
        console.error('리액트에서 월별 금액 조회 실패:', error);
      }
    };

    fetchData();
  }, [userNum]);

  if (!monthlyData) {
    return <div>Loading...</div>;
  }

  return (
    <TextWrap>
      <TitleGroup>
        <Titlediv>
          <p>저저번달에 사용하신 금액</p>
          <hr />
          <span>
            {monthlyData.previousToPreviousMonthAmount.toLocaleString()}원
          </span>
        </Titlediv>
        <Titlediv>
          <p>저번달에 사용하신 금액</p>
          <hr />
          <span>{monthlyData.previousMonthAmount.toLocaleString()}원</span>
        </Titlediv>
      </TitleGroup>
      <TitleGroup>
        <Titlediv>
          <p>등수</p>
          <hr />
          <span>{monthlyData.previousBadgeRanking.toLocaleString()}등</span>
        </Titlediv>
        <Titlediv>
          <p>뱃지 갯수</p>
          <hr />
          <span>{monthlyData.PreviousBadgeCount.toLocaleString()}개</span>
        </Titlediv>
      </TitleGroup>

      {/* <Barchart data={Barchart} /> */}
    </TextWrap>
  );
};

export default MonthComparisonTable;
