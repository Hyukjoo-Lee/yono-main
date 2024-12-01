import CommonCardListBox from '../../../common/CommonCardListBox';
import Piechart from '../monthlyStatistics/chart/Piechart';
import styled from 'styled-components';
import CardImage from '../../../assets/images/CardImage.png';

const ChartBoard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 600px 1fr;
  gap: 30px;
  box-sizing: border-box;
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

const piechart_data = [
  { id: '분식', value: 3 },
  { id: '의류', value: 1 },
  { id: '온라인쇼핑', value: 2 },
  { id: '주류', value: 8 },
  { id: '전자제품', value: 3 },
];

const CategoryStatics = () => {
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
  return (
    <ChartBoard>
      <Piechart data={piechart_data} />
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
    </ChartBoard>
  );
};

export default CategoryStatics;
