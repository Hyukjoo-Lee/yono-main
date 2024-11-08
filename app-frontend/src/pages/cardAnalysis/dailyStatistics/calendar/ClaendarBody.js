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
import { ReactComponent as Coins1 } from "../../../../assets/images/Coins1.svg";
import { ReactComponent as Coins2 } from "../../../../assets/images/Coins2.svg";
import { ReactComponent as Coins3 } from "../../../../assets/images/Coins3.svg";
import { ReactComponent as Coins4 } from "../../../../assets/images/Coins4.svg";

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
    width: 22px;
    height: 22px;
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
    props.$selected ? props.theme.color.blue : "transpernt"};
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

      const history = format(day, "MM-dd") === "11-10";
      const history2 =
        format(day, "MM-dd") === "11-06" || format(day, "MM-dd") === "11-08";

      const history3 = format(day, "MM-dd") === "11-18";
      const history4 =
        format(day, "MM-dd") === "11-24" || format(day, "MM-dd") === "11-04";

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
            style={{
              color: isSameDay(day, selectedDate)
                ? "#FFFFFF"
                : format(currentMonth, "M") !== format(day, "M")
                ? "#d0d0d0"
                : "",
            }}
          >
            {formattedDate}
          </DayBox>
          {history ? (
            <Coins1 />
          ) : history2 ? (
            <Coins2 />
          ) : history3 ? (
            <Coins3 />
          ) : history4 ? (
            <Coins4 />
          ) : (
            ""
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
