import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomSlides from '../mycard/CardSlider';
import { getAllCardsInfoByUserNum } from '../../apis/cardApi';
import CommonLoading from '../../common/CommonLoading';

const StyledWrap = styled.div`
  margin-top: 50px;
  width: 100%;
  height: auto;
  & span {
    font-size: 20px;
  }
`;

const StyledCardContainer = styled.div`
  margin: -18px 0 30px 0;
`;

const StyledCardP = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  border-radius: 7px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const MainCardBox = ({ isLoggedIn, user }) => {
  const [userCards, setUserCards] = useState([]);
  const [cardImages, setCardImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserCardsWithBenefits = async () => {
      setIsLoading(true);
      try {
        const response = await getAllCardsInfoByUserNum(user?.userNum);

        if (response.status === 200) {
          const formattedCards = response.data.data.map((card) => ({
            cardId: card.userCardId,
            cardNumber: card.userCardNum,
            cardTitle: card.cardTitle,
            cardImg: card.cardImg,
            primaryCard: card.primaryCard,
            cardInfo:
              card.cardBenefits && card.cardBenefits.length > 0
                ? card.cardBenefits.map((benefit) => ({
                    title: benefit.benefitTitle || '혜택 없음',
                    value: benefit.benefitValue || '0',
                    type: benefit.benefitType || '기타',
                  }))
                : [{ title: '혜택 없음', value: '', type: '기타' }],
          }));

          setUserCards(formattedCards);
          setCardImages(formattedCards.map((card) => card.cardImg));
        } else if (response.status === 204) {
          setUserCards([]);
        }
      } catch (error) {
        console.error('사용자 카드 목록 로딩 실패: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserCardsWithBenefits();
    }
  }, [isLoggedIn, user?.userNum]);

  return (
    <StyledWrap>
      <StyledCardP>나의 등록 카드</StyledCardP>
      <StyledCardContainer>
        {isLoading ? (
          <CommonLoading />
        ) : !userCards || userCards.length === 0 ? (
          <EmptyBox>
            <p>등록된 카드가 없습니다! (카드 등록 후 보여집니다.)</p>
          </EmptyBox>
        ) : (
          <CustomSlides
            cardImages={cardImages || []}
            cardData={userCards}
            showDetailed={true}
          />
        )}
      </StyledCardContainer>
    </StyledWrap>
  );
};

export default MainCardBox;
