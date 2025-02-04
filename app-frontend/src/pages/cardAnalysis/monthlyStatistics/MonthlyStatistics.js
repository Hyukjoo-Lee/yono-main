import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { uploadThreeMonthHistory } from '../../../apis/cardHistoryApi';
import Barchart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Barchart';
import Piechart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Piechart';
import CommonLoading from '../../../common/CommonLoading';

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

const MonthlyStatistics = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userNum = useSelector((state) => state.user.user?.userNum);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await uploadThreeMonthHistory(userNum);
      if (typeof response == 'string') {
        console.log(response);
        // 예외 발생시 다이얼로그 처리 필요
      } else if (response != null) {
        setCardData(response.data);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userNum]);

  if (loading) {
    return <CommonLoading />;
  }

  return (
    <Root>
      <ChartsContainer>
        {cardData ? (
          <>
            <Barchart data={cardData} />
            <Piechart data={cardData} />
          </>
        ) : (
          <p>집계된 데이터가 없습니다.</p>
        )}
      </ChartsContainer>
    </Root>
  );
};

export default MonthlyStatistics;
