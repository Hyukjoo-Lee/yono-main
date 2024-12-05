import * as React from 'react';
import styled from 'styled-components';
import { ResponsivePie } from '@nivo/pie';

const StyledChart = styled.div`
  width: 582px;
  height: 600px;
  margin: 0 auto;
`;

const Piechart = ({ data }) => {
  return (
    <StyledChart>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 120, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        // 1. 커스텀해서 사용할 때
        // colors={['red', 'pink', 'orange', 'skyblue', 'violet', 'green', 'purple', 'yellow']}
        // 2. nivo에서 제공해주는 색상 조합 사용할 때
        // colors={{ scheme: 'pastel1' }}
        colors={['#DDEBF7', '#CBD6EF', '#9ECAE0', '#6BAED6', '#4292C6']}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#101010"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }} // pad 색상에 따라감
        arcLabelsSkipAngle={10}
        theme={{
          labels: {
            text: {
              fontSize: '0.8rem',
              fill: '#101010',
              fontFamily: 'Pretendard-Regular',
            },
          },

          legends: {
            text: {
              fontSize: '1rem',
              fill: '#101010',
              fontFamily: 'Pretendard-Regular',
            },
          },
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 80,
            itemsSpacing: 10,
            itemWidth: 100,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 15,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemWidth: 'olive',
                },
              },
            ],
          },
        ]}
      />
    </StyledChart>
  );
};

export default Piechart;
