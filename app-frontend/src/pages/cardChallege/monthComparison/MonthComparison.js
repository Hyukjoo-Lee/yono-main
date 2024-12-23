import React from 'react';
import styled from 'styled-components';
import Barchart from '../../cardAnalysis/monthlyStatistics/chart/Barchart';
import { useEffect, useState } from 'react';

const Root = styled.div`
  width: 100%;
  height: 545px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    bottle: '9월',
    식비: 1200,
    교통비: 1000,
    쇼핑: 1100,
    문화: 3000,
    전자제품: 1500,
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
      <Box>
        <div>
          <h2>이번달 쓴 금액은 {animatedCurrentSpending} 입니다</h2>
        </div>

        <div>
          <h2>저번달 쓴 금액은 {animatedLastSpending}입니다다</h2>
        </div>
      </Box>
      <Barchart data={barchart_data} />
    </Root>
  );
};

export default MonthComparision;
