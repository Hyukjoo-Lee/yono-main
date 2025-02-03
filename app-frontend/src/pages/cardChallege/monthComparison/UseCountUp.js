import { useEffect, useMemo, useState } from 'react';

export default function useCountUp(end, start = 0, duration = 2000) {
  const [count, setCount] = useState(start);

  const stepTime = useMemo(() => {
    return Math.abs(Math.floor(duration / (end - start)));
  }, [start, end, duration]);

  useEffect(() => {
    if (start === end) {
      setCount(start);
      return;
    }

    let currentNumber = start;

    // 수치가 10000 이상일 때 증가 값을 크게 설정
    const increaseAmount = end >= 10000 ? 10000 : 1;

    const counter = setInterval(() => {
      currentNumber += increaseAmount;
      setCount(currentNumber); // 반올림 없이 그대로 설정

      // 목표 값에 도달했으면 카운터 종료
      if (
        (increaseAmount === 10000 && currentNumber >= end) ||
        (increaseAmount === 1 && currentNumber >= end)
      ) {
        clearInterval(counter);
        setCount(end); // 정확한 값 설정
      }
    }, stepTime);

    return () => clearInterval(counter); // cleanup
  }, [start, end, duration, stepTime]);

  return count;
}
