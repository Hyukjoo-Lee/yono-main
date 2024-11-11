import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

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
        <div style={{ width: '900px', height: '500px', margin: '0 auto' }}>
            <ResponsiveBar
                data={data}
                keys={['외식', '의류', '온라인쇼핑']}
                indexBy="bottle"
                margin={{ top: 50, right: 130, bottom: 50, left: 80 }}
                padding={0.3}
                groupMode='grouped'
                colors={{ scheme: 'blues' }}
                // colors = {['olive', 'brown', 'orange']} -> 커스텀하여 사용할 때
                // colors = {{ scheme: 'nivo' }} -> nivo 에서 제공해주는 색상 조합 사용할 때
                colorBy="id" 
                // 색상을 keys 요소들에 각각 적용
                // colorBy="indexValue" -> indexBy 로 묵인 인덱스별로 각각 적용
                theme={{
                    // label style (bar 에 표현되는 글씨)
                    labels: {
                        text: {
                            fontSize: 14,
                            fill: '#000000',
                        },
                    },
                    // legend style (default 로 우측 하단에 있는 색상별 key 표시)
                    legends: {
                        text: {
                            fontSize: 12,
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
                    tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '월',
                    legendPosition: 'middle',
                    legendOffset: 40, // 글씨와 chart간 간격
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '금액',
                    legendPosition: 'middle',
                    legendOffset: -60,
                }}
                // label 안보이게 할 기준 width
                labelSkipWidth={36}
                // label 안보이게 할 기준 height
                labelSkipHeight={12}
                onClick={handle.barClick}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                        onClick: handle.legendClick,
                    },
                ]}
            />
        </div>
    );
};

export default Barchart;
