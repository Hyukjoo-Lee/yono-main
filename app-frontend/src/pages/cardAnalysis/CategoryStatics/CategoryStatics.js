import CommonCardListBox from '../../../common/CommonCardListBox';
import Piechart from '../monthlyStatistics/chart/Piechart';
import styled from 'styled-components';
import { dailyStatisticsCardData } from '../../../mockData/cardMockData';

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

const pieChart_data = [
  { id: '분식', value: 3 },
  { id: '의류', value: 1 },
  { id: '온라인쇼핑', value: 2 },
  { id: '주류', value: 8 },
  { id: '전자제품', value: 3 },
];

const CategoryStatics = () => {
  return (
    <ChartBoard>
      <Piechart data={pieChart_data} />
      <ListBox>
        {dailyStatisticsCardData.map((item, index) => (
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
