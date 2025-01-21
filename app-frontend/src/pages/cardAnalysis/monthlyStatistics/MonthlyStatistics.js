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
  margin-top: 20px;
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
        {cardData ? (
          <Barchart data={cardData} />
        ) : (
          <p>데이터가 존재하지 않습니다.</p>
        )}
        {cardData ? (
          <Piechart data={cardData} />
        ) : (
          <p>데이터가 존재하지 않습니다.</p>
        )}
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
