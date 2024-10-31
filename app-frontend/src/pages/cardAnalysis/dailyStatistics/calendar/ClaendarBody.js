import React from "react";
import styled from "styled-components";
import {
  format,
  isSameDay,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";

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
  background: ${(props) =>
    props.$selected ? "#eee" : props.theme.color.white};
  &:last-child {
    border-right: 0px;
  }
`;

const DayBox = styled.div`
  font-size: ${(props) => props.theme.fontSize.base};
  text-align: center;
  color: ${(props) =>
    props.$today
      ? "red"
      : props.$lastMonth
      ? props.theme.color.brightGray
      : props.$selected
      ? props.theme.color.blue
      : props.theme.color.black};
`;

const HistoryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  & div {
    border-radius: 50%;
    background: ${(props) => props.theme.color.blue};
    width: 8px;
    height: 8px;
    margin-right: 3px;
    &:last-child {
      margin-right: 0px;
    }
  }
`;

const CalendarBody = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const history =
        format(day, "MM-dd") === "10-03" ||
        format(day, "MM-dd") === "10-02" ||
        format(day, "MM-dd") === "10-04";

      days.push(
        <DaysBox
          key={day}
          $selected={isSameDay(day, selectedDate)}
          onClick={() => onDateClick(cloneDay)}
        >
          <DayBox
            $today={isSameDay(day, new Date())}
            $selected={isSameDay(day, selectedDate)}
            $lastMonth={format(currentMonth, "M") !== format(day, "M")}
          >
            {formattedDate}
          </DayBox>
          {history && (
            <HistoryBox>
              <div />
              <div style={{ background: "red" }} />
              <div style={{ background: "pink" }} />
              <div style={{ background: "green" }} />
              <div style={{ background: "orange" }} />
            </HistoryBox>
          )}
        </DaysBox>
      );
      day = addDays(day, 1);
    }
    rows.push(<RowBox key={day}>{days}</RowBox>);
    days = [];
  }

  return <Root>{rows}</Root>;
};

export default CalendarBody;
