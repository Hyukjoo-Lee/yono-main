import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
import styled from 'styled-components';

const StyledChart = styled.div`
  width: 500px;
  height: 600px;
  margin: 0 auto;
`;

const Barchart = ({ data }) => {
  const handle = {
    barClick: (data) => {
      console.log(data);
    },
    legendClick: (data) => {
      console.log(data);
    },
  };

  return (
    <StyledChart>
      <ResponsiveBar
        data={data}
        keys={['사용금액']}
        indexBy="bottle"
        margin={{ top: 40, right: 120, bottom: 80, left: 80 }}
        padding={0.2}
        groupMode="grouped"
        colors={['#4292C6']}
        colorBy="id"
        borderRadius={0}
        theme={{
          labels: {
            text: {
              fontSize: '0.8rem',
              fill: '#000000',
            },
          },
          legends: {
            text: {
              fontSize: '1rem',
              fill: '#000000',
            },
          },
          axis: {
            legend: {
              text: {
                fontSize: 20,
                fill: '#000000',
              },
            },
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
        }}
        labelSkipWidth={36}
        labelSkipHeight={12}
        onClick={handle.barClick}
        legends={[]}
      />
    </StyledChart>
  );
};

export default Barchart;
