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

    const increaseAmount = end >= 10000 ? 10000 : 1;

    const counter = setInterval(() => {
      currentNumber += increaseAmount;
      setCount(currentNumber);

      // 목표 값에 도달했으면 카운터 종료
      if (
        (increaseAmount === 10000 && currentNumber >= end) ||
        (increaseAmount === 1 && currentNumber >= end)
      ) {
        clearInterval(counter);
      }
    }, stepTime);

    return () => clearInterval(counter); // cleanup
  }, [start, end, duration, stepTime]);

  return count;
}
