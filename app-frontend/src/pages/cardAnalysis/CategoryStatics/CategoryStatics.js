import styled from 'styled-components';
import CommonCardListBox from '../../../common/CommonCardListBox';
import CommonLoading from '../../../common/CommonLoading';
import Piechart from '../monthlyStatistics/chart/Piechart';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { monthData, uploadOneMonthHistory } from '../../../apis/cardHistoryApi';
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
  const userNum = useSelector((state) => state.user.user?.userNum);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await uploadOneMonthHistory(userNum);
        if (typeof response == 'string') {
          console.log(response);
          // 예외 발생시 다이얼로그 처리 필요
        } else if (response != null) {
          setCardData(response.data);
        }

        const data = await monthData(userNum);
        if (typeof data == 'string') {
          console.log(data);
          // 예외 발생시 다이얼로그 처리 필요
        } else if (data != null) {
          setMonthlyData(data.data);
        }

        const cardInfo = await getprimaryCardInfo(userNum);
        if (typeof cardInfo == 'string') {
          console.log(cardInfo);
          // 예외 발생시 다이얼로그 처리 필요
        } else if (cardInfo != null) {
          setCard(cardInfo.data);
        }

        setLoading(false);
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
    return <CommonLoading />;
  }

  const handleClick = (data) => {
    setCategory(data.id);
  };

  const filteredData =
    monthlyData?.filter((item) => {
      return category === item.resMemberStoreType;
    }) || [];

  const formatDate = (date) => {
    if (typeof date === 'string' && date.length === 8) {
      const year = date.slice(0, 4);
      const month = date.slice(4, 6);
      const day = date.slice(6, 8);
      return `${year}-${month}-${day}`;
    } else if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return date;
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
                    cardImgUrl: card.cardImg,
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
    </Root>
  );
};

export default CategoryStatics;
