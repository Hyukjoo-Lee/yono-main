import React from "react";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  // border: 1px solid #d4d5d6;
  & > div {
    padding: 5px 10px;
    width: calc(100% / 7);
    text-align: center;
    // border-right: 1px solid #d4d5d6;
    &:last-child {
      border-right: 0px;
    }
  }
`;

const CalendarDays = (props) => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(<div key={i}>{date[i]}</div>);
  }

  return <Root>{days}</Root>;
};

export default CalendarDays;
