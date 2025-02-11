import styled from 'styled-components';
import CardRecBox from './CardRecBox';
import CommonCardListBox from '../../common/CommonCardListBox';
import CommonPageInfo from '../../common/CommonPageInfo';
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
  height: 628px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const BoxStyle = styled.div`
  width: 100%;
  border-radius: 7px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  overflow: hidden;
`;

const EmptyBox = styled(BoxStyle)`
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    margin: 0px;
    font-size: ${(props) => props.theme.fontSize.eighteen};
    color: ${(props) => props.theme.color.gray};
  }
`;

const CardRecTab = ({ recommendedCards }) => {
  // 선택된 카드 상태 (초기값: 첫 번째 카드)
  const [selectedCard, setSelectedCard] = useState(
    recommendedCards.length > 0 ? recommendedCards[0] : null,
  );
  const [cardImg, setCardImg] = useState(null);

  // 카드 선택 핸들러
  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  // 선택된 카드의 첫 번째 이미지를 설정
  useEffect(() => {
    if (selectedCard?.cardImg) {
      setCardImg(selectedCard.cardImg);
    }
  }, [selectedCard]);

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
      {!recommendedCards || recommendedCards.length === 0 ? (
        <EmptyBox>
          <p>
            추천할 카드가 없습니다. 사용 내역이 부족하거나 조건에 맞는 카드가
            없습니다.
          </p>
        </EmptyBox>
      ) : (
        <Root>
          <CardRecBox
            cardTitle={selectedCard.cardTitle}
            cardImg={cardImg}
            cardInfo={selectedCard.cardInfo}
            cardMainBenefit={selectedCard.mainBenefit}
            cardApplyLink={selectedCard.cardApplyLink}
          />
          <ListBox>
            <CommonCardListBox
              data={recommendedCards}
              showDetailed={true}
              onCardSelect={handleCardSelect}
              buttonText="자세히보기"
            />
          </ListBox>
        </Root>
      )}
    </>
  );
};

export default CardRecTab;
