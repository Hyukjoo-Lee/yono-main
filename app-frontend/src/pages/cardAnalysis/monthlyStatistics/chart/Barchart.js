import React from 'react';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';

const StyledChart = styled.div`
  width: 45%;
  height: 600px;
  margin: 0 auto;
`;

const Barchart = ({ data }) => {
  // const handle = {
  //   barClick: (data) => {},
  //   legendClick: (data) => {},
  // };

  const transformedData = data.map((item) => {
    const categoryTotals = item.categoryTotals;
    return {
      month: item.month,
      ...categoryTotals,
    };
  });

  const keys = data[0] ? Object.keys(data[0].categoryTotals) : [];

  return (
    <StyledChart>
      <ResponsiveBar
        data={transformedData}
        keys={keys}
        indexBy="month"
        margin={{ top: 40, right: 40, bottom: 80, left: 80 }}
        valueFormat=" >-,"
        padding={0.3}
        groupMode="grouped"
        // colors={{ scheme: 'blues' }}
        colors={['#DDEBF7', '#CBD6EF', '#9ECAE0', '#6BAED6', '#4292C6']}
        // colors = {['olive', 'brown', 'orange']} -> 커스텀하여 사용할 때
        // colors = {{ scheme: 'nivo' }} -> nivo 에서 제공해주는 색상 조합 사용할 때
        colorBy="id"
        // 색상을 keys 요소들에 각각 적용
        // colorBy="indexValue" -> indexBy 로 묵인 인덱스별로 각각 적용
        borderRadius={0}
        theme={{
          // label style (bar 에 표현되는 글씨)
          labels: {
            text: {
              fontSize: '0.8rem',
              fill: '#000000',
            },
          },
          // legend style (default 로 우측 하단에 있는 색상별 key 표시)
          legends: {
            text: {
              fontSize: '1rem',
              fill: '#000000',
            },
          },
          axis: {
            // axis legend style (bottom, left에 있는 글씨)
            legend: {
              text: {
                fontSize: 20,
                fill: '#000000',
              },
            },
            // axis ticks style (bottom, left에 있는 값)
            ticks: {
              text: {
                fontSize: 16,
                fill: '#000000',
              },
            },
          },
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 0,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -60,
          ticks: true,
          format: (value) => new Intl.NumberFormat().format(value),
        }}
        labelSkipWidth={36}
        labelSkipHeight={12}
        // 토탈 값 표시
        // enableTotals = {true}
        // onClick={handle.barClick}
        // legends={[
        //   {
        //     dataFrom: 'keys',
        //     anchor: 'bottom',
        //     direction: 'row',
        //     justify: false,
        //     translateX: 0,
        //     translateY: 80,
        //     itemsSpacing: 10,
        //     itemWidth: 100,
        //     itemHeight: 18,
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 0.85,
        //     symbolSize: 15,
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //     onClick: handle.legendClick,
        //     wrapText: true,
        //   },
        // ]}
      />
    </StyledChart>
  );
};

export default Barchart;
