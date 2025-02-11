import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ReactComponent as ArrowIcon } from '../../../../assets/images/ArrowIcon.svg';
import { ReactComponent as ArrowsIcon } from '../../../../assets/images/ArrowsIcon.svg';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

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
  position: relative;
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

const themeTooltip = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#4064e6',
          color: 'white',
          fontSize: '14px',
          padding: '8px 16px 10px',
          borderRadius: '6px',
        },
        arrow: {
          color: '#4064e6',
        },
      },
    },
  },
});

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
  const [showTooltip, setShowTooltip] = useState(false);

  const formatMoney = (value) => {
    if (value == null) return '-'; // 값이 없을 때 처리
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  useEffect(() => {
    setMoney(isSpendingTarget);
  }, [isSpendingTarget]);

  // 5초 툴팁 후 자동 숨김
  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={themeTooltip}>
      <Root>
        <Box>
          <TextStyle>
            {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월
            <Tooltip
              title="마이페이지에서 일일목표금액을 설정해주세요."
              arrow
              placement="bottom"
              open={formatMoney(money) === '0' && showTooltip}
            >
              <span>일일 목표 금액: {formatMoney(money)}원</span>
            </Tooltip>
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
    </ThemeProvider>
  );
};

export default CalendarHeader;
