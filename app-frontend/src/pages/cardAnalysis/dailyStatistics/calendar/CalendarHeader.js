import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { ReactComponent as ArrowIcon } from "../../../../assets/images/ArrowIcon.svg";
import { ReactComponent as ArrowsIcon } from "../../../../assets/images/ArrowsIcon.svg";

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  box-sizing: border-box;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  border: 0px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.white};
  cursor: pointer;
  & svg {
    width: 35px;
    height: 35px;
  }
`;

const TextStyle = styled.p`
  // font-size: ${(props) => props.theme.fontSize.md};
  font-size: 1.5rem;
  // color: ${(props) => props.theme.color.black};
  color: #212121;
  font-weight: bold;
  margin: 0px;
`;

const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  prevYear,
  nextYear,
}) => {
  return (
    <Root>
      <Box>
        <IconButton onClick={prevYear}>
          <ArrowsIcon />
        </IconButton>
        <IconButton onClick={prevMonth}>
          <ArrowIcon />
        </IconButton>
      </Box>
      <Box>
        <TextStyle>
          {format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월
        </TextStyle>
      </Box>
      <Box>
        <IconButton onClick={nextMonth}>
          <ArrowIcon style={{ transform: "scaleX(-1)" }} />
        </IconButton>
        <IconButton onClick={nextYear}>
          <ArrowsIcon style={{ transform: "scaleX(-1)" }} />
        </IconButton>
      </Box>
    </Root>
  );
};

export default CalendarHeader;
