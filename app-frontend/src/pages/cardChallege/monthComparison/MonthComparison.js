import React from 'react';
import styled from 'styled-components';
import Barchart from './Barchart';
import useCountUp from './UseCountUp';
import Barchart from '../../cardAnalysis/monthlyStatistics/chart/Barchart';
import { useEffect, useState } from 'react';

const Root = styled.div`
  width: 100%;
  height: 545px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrap = styled.div`
  width: 720px;
  height: 530px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // border: 1px solid rgba(169, 169, 169, 0.3);
  // border-radius: 7px;
`;

const Titlediv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  // font-weight: bold;
  padding-bottom: 30px;
`;

// const Titlediv2 = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 30px;
// `;

const BarchartWrap = styled.div`
  width: 480px;
  height: 530px;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > div {
    background-color: #eff3fd;
    display: flex;
    flex-direction: column;
    height: 150px;
    width: 400px;
    margin-right: 30px;
    border-radius: 30px;
  }
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
  const previousMonthAmount = useCountUp(2000000); // 전달 금액
  const currentMonthAmount = useCountUp(1000000); // 이번달 금액
  const badgeCount = useCountUp(200); // 예상 뱃지 개수

const MonthComparision = ({ ...props }) => {
  // 임의의 초기값 지정 (UI만 확인하기 위한 고정값)
  const [currentMonthSpending, setCurrentMonthSpending] = useState(20); // 이번 달 지출 (임의의 값)
  const [lastMonthSpending, setLastMonthSpending] = useState(10); // 저번 달 지출 (임의의 값)

  // 숫자를 애니메이션으로 카운트 업하는 커스텀 훅
  const useCountUp = (end, start = 0, duration = 500) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      let currentNum = start;
      const delay = Math.max(duration / end, 10); // 최소 딜레이 10ms
      const countUp = setInterval(() => {
        currentNum++;
        setCount(currentNum);
        if (currentNum >= end) {
          clearInterval(countUp); // 목표 숫자에 도달하면 애니메이션 중지
        }
      }, delay);

      return () => clearInterval(countUp); // 컴포넌트가 언마운트될 때 인터벌 정리
    }, [end, start, duration]);

    return count.toFixed(0); // 정수로 반환
  };

  // 애니메이션 값 얻기
  const animatedCurrentSpending = useCountUp(currentMonthSpending);
  const animatedLastSpending = useCountUp(lastMonthSpending);

  // 데이터 받아오는 부분 (실제 데이터를 나중에 받아올 때 업데이트)
  useEffect(() => {
    // 예시로 3초 후에 데이터를 받아오는 시뮬레이션
    setTimeout(() => {
      setCurrentMonthSpending(20); // 실제 데이터로 업데이트
      setLastMonthSpending(10); // 실제 데이터로 업데이트
    }, 3000);
  }, []);

  return (
    <Root>
      <TextWrap>
        <Titlediv>
          전달에 사용하신 금액은 &nbsp;{' '}
          <b>{previousMonthAmount.toLocaleString()}원</b>&nbsp; 입니다.
        </Titlediv>
        {/* <Titlediv2>{previousMonthAmount.toLocaleString()}원 입니다.</Titlediv2> */}
        <br />
        <Titlediv>
          이번달에 사용하신 금액은 &nbsp;
          <b>{currentMonthAmount.toLocaleString()}원</b>&nbsp; 입니다.
        </Titlediv>
        {/* <Titlediv2>{currentMonthAmount.toLocaleString()}원 입니다.</Titlediv2> */}
        <br />
        <Titlediv>
          이번달 예상 뱃지 갯수는 &nbsp; <b>{badgeCount.toLocaleString()}개</b>
          &nbsp; 입니다.
        </Titlediv>
        {/* <Titlediv2>{badgeCount.toLocaleString()}개 입니다.</Titlediv2> */}
      </TextWrap>
      <BarchartWrap>
        <Barchart data={barchart_data} />
      </BarchartWrap>
    </Root>
  );
};

export default MonthComparision;
