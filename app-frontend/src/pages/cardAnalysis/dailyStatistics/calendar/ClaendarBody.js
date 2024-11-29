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
      color: red;
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
    props.$selected ? props.theme.color.blue : 'transpernt'};
`;

const CalendarBody = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;

      const history = format(day, 'MM-dd') === '12-10';
      const history2 =
        format(day, 'MM-dd') === '12-06' || format(day, 'MM-dd') === '12-08';

      const history3 = format(day, 'MM-dd') === '12-18';
      const history4 =
        format(day, 'MM-dd') === '12-24' || format(day, 'MM-dd') === '12-04';

      days.push(
        <DaysBox
          key={day}
          $selected={isSameDay(day, selectedDate)}
          onClick={() => onDateClick(cloneDay)}
        >
          <DayBox
            $today={isSameDay(day, new Date())}
            $selected={isSameDay(day, selectedDate)}
            $lastMonth={format(currentMonth, 'M') !== format(day, 'M')}
            style={{
              color: isSameDay(day, selectedDate)
                ? '#FFFFFF'
                : format(currentMonth, 'M') !== format(day, 'M')
                  ? '#d0d0d0'
                  : '',
            }}
          >
            {formattedDate}
          </DayBox>
          {history ? (
            <ExcellentCoin />
          ) : history2 ? (
            <VeryGoodCoin />
          ) : history3 ? (
            <GoodCoin />
          ) : history4 ? (
            <BadCoin />
          ) : (
            ''
          )}
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
