import Piechart from '../monthlyStatistics/chart/Piechart';
import styled from 'styled-components';
const ChartBoard = styled.div`
  display: 'flex';
  justifycontent: 'space-around';
  alignitems: 'center';
`;

const piechart_data = [
  { id: '분식', value: 3 },
  { id: '의류', value: 1 },
  { id: '온라인쇼핑', value: 2 },
  { id: '주류', value: 8 },
  { id: '전자제품', value: 3 },
];

const CategoryStatics = () => {
  return (
    <ChartBoard>
      <Piechart data={piechart_data} />
    </ChartBoard>
  );
};

export default CategoryStatics;
