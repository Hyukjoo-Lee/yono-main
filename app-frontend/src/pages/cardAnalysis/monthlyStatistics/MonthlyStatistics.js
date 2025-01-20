import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Barchart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Barchart';
import Piechart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Piechart';
import { uploadRecentHistory } from '../../../apis/cardHistoryApi';
import { useSelector } from 'react-redux';
// import { getToken, getConId, getCardHistory } from '../../../apis/cardApi'
const piechart_data = [
  { id: '식비', value: 3 },
  { id: '교통비', value: 1 },
  { id: '쇼핑', value: 2 },
  { id: '문화', value: 8 },
  { id: '전자제품', value: 3 },
];

const Root = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LoadingText = styled.div`
  font-size: 24px;
  color: #999;
`;

const MonthlyStatistics = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userNum = useSelector((state) => state.user.user?.userNum);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await uploadRecentHistory(userNum);
        setCardData(response);
        console.log(response);
      } catch (error) {
        console.error('카드 정보를 불러오는 중 오류 발생:', error);
        setCardData(null);
      } finally {
        setLoading(false);
      }
    };

    if (userNum) {
      console.log(userNum);
      fetchUser();
    }
  }, [userNum]);

  if (loading) {
    return <LoadingText>로딩 중...</LoadingText>;
  }

  return (
    <Root>
      {cardData ? <Barchart data={cardData} /> : <></>}
      <Piechart data={piechart_data} />
    </Root>
  );
};

export default MonthlyStatistics;
