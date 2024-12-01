import React from 'react';
import Calendar from './calendar/Calendar';
import styled from 'styled-components';
import CommonCardListBox from '../../../common/CommonCardListBox';
import { ReactComponent as ExcellentCoin } from '../../../assets/images/ExcellentCoin.svg';
import { ReactComponent as VeryGoodCoin } from '../../../assets/images/VeryGoodCoin.svg';
import { ReactComponent as GoodCoin } from '../../../assets/images/GoodCoin.svg';
import { ReactComponent as BadCoin } from '../../../assets/images/BadCoin.svg';
import { dailyStatisticsCardData } from '../../../mockData/cardMockData.js';

const Root = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 740px 1fr;
  gap: 30px;
  box-sizing: border-box;
`;
const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-top: 5px;
  & div {
    display: flex;
    align-items: center;
  }
  & p {
    margin: 0 0 0 8px;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.color.lightGray};
  }
  & svg {
    width: 20px;
    height: 20px;
  }
`;

const ListBox = styled.div`
  height: 541px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const DailyStatistics = () => {
  const Lists = [
    { icon: <BadCoin />, text: '0~25% 소비절약' },
    { icon: <GoodCoin />, text: '26~50% 소비절약' },
    { icon: <VeryGoodCoin />, text: '51~75% 소비절약' },
    { icon: <ExcellentCoin />, text: '76~100% 소비절약' },
  ];
  return (
    <Root>
      <CalendarBox>
        <Calendar />
        <CalendarBottomBox>
          {Lists.map((item, index) => (
            <div key={index}>
              {item.icon}
              <p>{item.text}</p>
            </div>
          ))}
        </CalendarBottomBox>
      </CalendarBox>
      <ListBox>
        {dailyStatisticsCardData.map((item, index) => (
          <CommonCardListBox
            key={item.id}
            cardTitle={item.title}
            cardImg={item.cardImage}
            cardInfo={item.info}
            showDetailed={false}
          />
        ))}
      </ListBox>
    </Root>
  );
};
export default DailyStatistics;
