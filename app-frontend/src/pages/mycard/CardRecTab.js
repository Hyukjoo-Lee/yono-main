import styled from 'styled-components';
import CardRecBox from './CardRecBox';
import CommonCardListBox from '../../common/CommonCardListBox';
import CommonPageInfo from '../../common/CommonPageInfo';
import { recommendedCardData } from '../../mockData/cardMockData.js';
import { useState } from 'react';

const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 25px;
`;

const ListBox = styled.div`
  width: 100%;
  height: 628px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const CardRecTab = () => {
  const [selectedCard, setSelectedCard] = useState(recommendedCardData[2]);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  return (
    <>
      <CommonPageInfo
        title="나의 카드 추천"
        text={
          <p>
            나의 소비패턴에 맞는 카드를 확인하세요. <br />
            카드 혜택을 확인하고 신청하세요.
          </p>
        }
      />
      <Root>
        <CardRecBox
          cardTitle={selectedCard.cardTitle}
          cardImg={selectedCard.cardImg}
          cardInfo={selectedCard.cardInfo}
          cardMainBenefit={selectedCard.mainBenefit}
          cardApplyLink={selectedCard.cardApplyLink}
        />
        <ListBox>
          <CommonCardListBox
            data={recommendedCardData}
            showDetailed={true}
            onCardSelect={handleCardSelect}
            buttonText="자세히보기"
          />
        </ListBox>
      </Root>
    </>
  );
};

export default CardRecTab;
