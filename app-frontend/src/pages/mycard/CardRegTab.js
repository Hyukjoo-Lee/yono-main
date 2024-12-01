import styled from 'styled-components';
import CardRegFormBox from './CardRegFormBox';
import CommonCardListBox from '../../common/CommonCardListBox';
import CommonPageInfo from '../../common/CommonPageInfo';
import {
  registeredCardData,
  card_images,
} from '../../mockData/cardMockData.js';
import { useState, useEffect } from 'react';

const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 25px;
`;

const ListBox = styled.div`
  width: 100%;
  height: 729px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const CardRegTab = () => {
  // 등록된 카드 데이터
  const [cardData, setCardData] = useState([]);
  // 카드사 별 이미지 데이터
  const [cardImg, setCardImg] = useState(card_images);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    const fetchCardData = async () => {
      try {
        setCardData(registeredCardData);
        setCardImg(card_images);
        setIsLoaded(true);
      } catch (error) {
        console.error('등록한 카드 데이터 로딩 실패: ', error);
      }
    };
    fetchCardData();
  }, [isLoaded]);

  const handleCardSelect = (card) => {
    // TODO: 카드 선택 로직 추가: 선택되면 카드 챌린지 페이지에 적용되는 카드가 변경됨
    console.log(card);
  };

  return (
    <>
      <CommonPageInfo
        title="나의 카드 등록"
        text={
          <p>
            소비패턴을 확인하고 싶은 카드로 등록하세요. <br />
            등록하고 싶은 카드를 입력 후 카드 리스트에서 확인하세요.
          </p>
        }
      />
      <Root>
        <CardRegFormBox cardImg={cardImg} />
        <ListBox>
          <CommonCardListBox
            data={cardData}
            cardImg={cardImg}
            showDetailed={true}
            onCardSelect={handleCardSelect}
          />
        </ListBox>
      </Root>
    </>
  );
};

export default CardRegTab;
