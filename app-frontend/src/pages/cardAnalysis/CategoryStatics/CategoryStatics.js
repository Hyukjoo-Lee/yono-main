import styled from 'styled-components';
import CommonCardListBox from '../../../common/CommonCardListBox';
import Piechart from '../monthlyStatistics/chart/Piechart';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  monthData,
  // updateHistory,
  uploadOneMonthHistory,
} from '../../../apis/cardHistoryApi';
import { getprimaryCardInfo } from '../../../apis/cardApi';

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

const EmptyBox = styled.div`
  width: 403px;
  height: 488px;
  border-radius: 7px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & p {
    margin: 0px;
    font-size: ${(props) => props.theme.fontSize.eighteen};
    color: ${(props) => props.theme.color.gray};
  }
  & .MuiCircularProgress-root {
    margin-bottom: 10px;
  }
`;

const CategoryStatics = () => {
  const [cardData, setCardData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [category, setCategory] = useState(null);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(true);
  const userNum = useSelector((state) => state.user.user?.userNum);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await uploadOneMonthHistory(userNum);
        setCardData(response.data);

        const data = await monthData(userNum);
        setMonthlyData(data.data);

        const cardInfo = await getprimaryCardInfo(userNum);
        setCard(cardInfo.data);

        setLoading(false);

        // await updateHistory(userNum);
        // const updatedData = await uploadRecentHistory(userNum);
        // setCardData(updatedData.data);
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

  const handleClick = (data) => {
    setCategory(data.id);
  };

  const filteredData = monthlyData.filter((item) => {
    return category === item.resMemberStoreType;
  });

  const formatDate = (date) => {
    if (typeof date === 'string' && date.length === 8) {
      // '20240105' 형식을 '2024-01-05'로 변환
      const year = date.slice(0, 4);
      const month = date.slice(4, 6);
      const day = date.slice(6, 8);
      return `${year}-${month}-${day}`;
    } else if (date instanceof Date) {
      // Date 객체를 '2024-01-05' 형식으로 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return date; // 원래 값 반환 (예외 처리)
  };

  return (
    <Root>
      {cardData ? (
        <ChartsContainer>
          <Piechart data={cardData} onClick={handleClick} />
          {filteredData.length > 0 ? (
            <ListBox>
              {filteredData.map((item, index) => (
                <CommonCardListBox
                  key={item.resApprovalNo}
                  cardItem={{
                    ...item,
                    resUsedDate: formatDate(item.resUsedDate), // 변환된 날짜 전달
                    cardTitle: card.cardTitle,
                    cardImgUrl: card.cardImgUrl,
                  }}
                  showDetailed={false}
                />
              ))}
            </ListBox>
          ) : (
            <EmptyBox>
              <p>카테고리를 클릭해주세요.</p>
            </EmptyBox>
          )}
        </ChartsContainer>
      ) : (
        <p>집계된 데이터가 없습니다.</p>
      )}
      {message && (
        <MessageText>
          최근 데이터 갱신 중입니다. 이 작업은 몇 초 정도 소요될 수 있습니다.
        </MessageText>
      )}
    </Root>
  );
};

export default CategoryStatics;
