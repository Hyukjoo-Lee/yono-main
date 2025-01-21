import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Barchart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Barchart';
import Piechart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Piechart';
import {
  updateHistory,
  uploadRecentHistory,
} from '../../../apis/cardHistoryApi';
import { useSelector } from 'react-redux';

const piechart_data = [
  { id: '식비', value: 3 },
  { id: '교통비', value: 1 },
  { id: '쇼핑', value: 2 },
  { id: '문화', value: 8 },
  { id: '전자제품', value: 3 },
];

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const LoadingText = styled.div`
  font-size: 24px;
  color: #999;
`;

const MessageText = styled.p`
  margin-top: 20px; /* 그래프와 문구 사이 간격 */
  font-size: 16px;
  color: #666;
  text-align: center;
`;

const MonthlyStatistics = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(true);
  const userNum = useSelector((state) => state.user.user?.userNum);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await uploadRecentHistory(userNum);
        setCardData(response.data);
        setLoading(false);

        await updateHistory(userNum);
        const updatedData = await uploadRecentHistory(userNum);
        setCardData(updatedData.data);
        setMessage(false);
      } catch (error) {
        console.error('카드 정보를 불러오는 중 오류 발생:', error);
        setCardData(null);
      }
    };

    if (userNum) {
      fetchUser();
    }
  }, [userNum]);

  if (loading) {
    return <LoadingText>로딩 중...</LoadingText>;
  }

  return (
    <Root>
      <ChartsContainer>
        {cardData ? <Barchart data={cardData} /> : <></>}
        <Piechart data={piechart_data} />
      </ChartsContainer>
      {message && (
        <MessageText>
          최근 데이터 갱신 중입니다. 이 작업은 몇 초 정도 소요될 수 있습니다.
        </MessageText>
      )}
    </Root>
  );
};

export default MonthlyStatistics;
