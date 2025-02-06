import React from 'react';
import styled from 'styled-components';
import {
  format,
  isSameDay,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { ReactComponent as ExcellentCoin } from '../../../../assets/images/ExcellentCoin.svg';
import { ReactComponent as VeryGoodCoin } from '../../../../assets/images/VeryGoodCoin.svg';
import { ReactComponent as GoodCoin } from '../../../../assets/images/GoodCoin.svg';
import { ReactComponent as BadCoin } from '../../../../assets/images/BadCoin.svg';

const Root = styled.div``;

const RowBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DaysBox = styled.div`
  width: calc(100% / 7);
  aspect-ratio: 1 / 0.8;
  cursor: pointer;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.color.white};
  &:last-child {
    border-right: 0px;
  }
  &:first-child {
    & > div {
      color: ${(props) => props.theme.color.red};
    }
  }
  & svg {
    width: 20px;
    height: 20px;
  }
`;

const DayBox = styled.div`
  width: 28px;
  height: 28px;
  font-size: ${(props) => props.theme.fontSize.base};
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  margin-bottom: 4px;
  color: ${(props) =>
    props.$today
      ? props.theme.color.blue
      : props.$selected
        ? props.theme.color.white
        : props.theme.color.black};
  background: ${(props) =>
    props.$selected ? props.theme.color.blue : 'transparent'};
`;

const MoneyText = styled.p`
  font-size: ${(props) => props.theme.fontSize.xs};
  margin: 4px 0 0;
`;

const CalendarBody = ({
  currentMonth,
  selectedDate,
  onDateClick,
  statistics,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;

  // 백분율 범위를 계산
  const getIcon = (totalAmount, targetAmount) => {
    const percentage = (totalAmount / targetAmount) * 100;

    if (percentage <= 25) return <ExcellentCoin />;
    if (percentage <= 50) return <VeryGoodCoin />;
    if (percentage <= 75) return <GoodCoin />;
    return <BadCoin />;
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day; // day를 고정된 값으로 복사

      // 현재 날짜에 대한 통계 필터링
      const dailyStats = statistics.filter(
        (stat) => stat.resUsedDate === format(cloneDay, 'yyyyMMdd'),
      );

      // 총액과 목표액을 계산 (문자열을 숫자로 변환)
      const totalAmount = dailyStats.reduce(
        (sum, stat) => sum + (parseFloat(stat.resUsedAmount) || 0), // resUsedAmount를 숫자로 변환
        0,
      );

      const targetAmount =
        dailyStats.length > 0 ? parseFloat(dailyStats[0].spendingTarget) : 0; // spendingTarget을 숫자로 변환

      days.push(
        <DaysBox
          key={cloneDay}
          $selected={isSameDay(cloneDay, selectedDate)}
          onClick={() => onDateClick(cloneDay)}
        >
          <DayBox
            $today={isSameDay(cloneDay, new Date())}
            $selected={isSameDay(cloneDay, selectedDate)}
            $lastMonth={format(currentMonth, 'M') !== format(cloneDay, 'M')}
            style={{
              color: isSameDay(cloneDay, selectedDate)
                ? '#FFFFFF'
                : format(currentMonth, 'M') !== format(cloneDay, 'M')
                  ? '#d0d0d0'
                  : '',
            }}
          >
            {format(cloneDay, 'd')}
          </DayBox>
          {targetAmount > 0 ? getIcon(totalAmount, targetAmount) : null}
          <MoneyText>
            {totalAmount === 0 ? null : totalAmount.toLocaleString()}
          </MoneyText>
        </DaysBox>,
      );
      day = addDays(day, 1);
    }
    rows.push(<RowBox key={day}>{days}</RowBox>);
    days = [];
  }

  return <Root>{rows}</Root>;
};

export default CalendarBody;
