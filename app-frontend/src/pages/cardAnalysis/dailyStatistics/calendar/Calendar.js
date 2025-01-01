import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarBody from './ClaendarBody';
import { addMonths, subMonths, addYears, subYears } from 'date-fns';
import styled from 'styled-components';

const Root = styled.div`
  border-radius: 7px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  overflow: hidden;
`;

const Calendar = ({ selectedDate, onDateClick, statistics }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevYear = () => {
    setCurrentMonth(subYears(currentMonth, 1));
  };

  const nextYear = () => {
    setCurrentMonth(addYears(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // const onDateClick = (day) => {
  //   onDateSelect(day); // 부모 컴포넌트로 선택된 날짜 전달
  // };

  return (
    <Root>
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        prevYear={prevYear}
        nextYear={nextYear}
      />
      <CalendarDays />
      <CalendarBody
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        statistics={statistics}
      />
    </Root>
  );
};

export default Calendar;
