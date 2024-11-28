import React from 'react';
import Calendar from './calendar/Calendar';
import styled from 'styled-components';
import CommonCardListBox from '../../../common/CommonCardListBox';
import CardImage from '../../../assets/images/CardImage.png';
import { ReactComponent as Coins1 } from '../../../assets/images/Coins1.svg';

const Root = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 600px 1fr;
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
  align-items: center
  box-sizing: border-box;
  margin-top: 5px;
  & div {
    display: flex;
    align-items: center;
  & p{
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
  height: 488px;
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
  const cardList = [
    {
      title: '현대카드(신용)',
      cardImage: CardImage,
      info: [
        { label: '날짜', value: '2024.10.20' },
        { label: '사용처', value: '88맥주집' },
        { label: '카테고리', value: '식당' },
      ],
    },
    {
      title: '신한카드(체크)',
      cardImage: CardImage,
      info: [
        { label: '날짜', value: '2024.10.20' },
        { label: '사용처', value: '삼겹살' },
        { label: '카테고리', value: '식당' },
      ],
    },
    {
      title: '국민카드(신용)',
      cardImage: CardImage,
      info: [
        { label: '날짜', value: '2024.10.20' },
        { label: '사용처', value: 'kg중국집' },
        { label: '카테고리', value: '식당' },
      ],
    },
    {
      title: '현대카드(신용)',
      cardImage: CardImage,
      info: [
        { label: '날짜', value: '2024.10.20' },
        { label: '사용처', value: 'kg쌀국수' },
        { label: '카테고리', value: '식당' },
      ],
    },
    {
      title: '현대카드(신용)',
      cardImage: CardImage,
      info: [
        { label: '날짜', value: '2024.10.20' },
        { label: '사용처', value: 'kg쌀국수' },
        { label: '카테고리', value: '식당' },
      ],
    },
  ];

  const Lists = [
    { icon: <Coins1 />, text: '0~25% 소비절약' },
    { icon: <Coins1 />, text: '26~50% 소비절약' },
    { icon: <Coins1 />, text: '51~75% 소비절약' },
    { icon: <Coins1 />, text: '76~100% 소비절약' },
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
        {cardList.map((item, index) => (
          <CommonCardListBox
            key={index}
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
