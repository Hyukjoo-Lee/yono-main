import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ReactComponent as ArrowIcon } from '../../../../assets/images/ArrowIcon.svg';
import { ReactComponent as ArrowsIcon } from '../../../../assets/images/ArrowsIcon.svg';
import { useSelector } from 'react-redux';

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
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
  padding: 0px 10px;
  border: 0px;
  border-radius: 4px;
  margin: 0 2px;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  background: ${(props) => props.theme.color.white};
  cursor: pointer;
`;

const TextStyle = styled.p`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.color.black};
  font-weight: bold;
  margin: 0px;
  & span {
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: 500;
    margin-left: 16px;
    color: ${(props) => props.theme.color.lightGray};
  }
`;

const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  prevYear,
  nextYear,
}) => {
  const isSpendingTarget = useSelector(
    (state) => state.user.user?.spendingTarget,
  );
  const [money, setMoney] = useState();

  const formatMoney = (value) => {
    if (value == null) return '-'; // 값이 없을 때 처리
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  useEffect(() => {
    setMoney(isSpendingTarget);
  }, [isSpendingTarget]);

  return (
    <Root>
      <Box>
        <TextStyle>
          {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월
          <span>일일 목표 금액: {formatMoney(money)}원</span>
        </TextStyle>
      </Box>
      <Box>
        <IconButton onClick={prevYear}>
          <ArrowsIcon />
        </IconButton>
        <IconButton onClick={prevMonth}>
          <ArrowIcon />
        </IconButton>
        <IconButton onClick={nextMonth}>
          <ArrowIcon style={{ transform: 'scaleX(-1)' }} />
        </IconButton>
        <IconButton onClick={nextYear}>
          <ArrowsIcon style={{ transform: 'scaleX(-1)' }} />
        </IconButton>
      </Box>
    </Root>
  );
};

export default CalendarHeader;
