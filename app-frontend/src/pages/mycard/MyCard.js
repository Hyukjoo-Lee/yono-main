import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import CommonTabs from '../../common/CommonTabs';
import CommonRoot from '../../common/CommonRoot';
import CommonDialog from '../../common/CommonDialog';
import CommonLoading from '../../common/CommonLoading';

import CardRegTab from './CardRegTab';
import CardRecTab from './CardRecTab';
import {
  getAllCardsInfoByUserNum,
  getRecommendedCards,
} from '../../apis/cardApi';

const RootIn = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;

export function MyCard() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userFromStore = useSelector((state) => state.user.user);

  const [selectedTab, setSelectedTab] = useState(0);
  const [user, setUser] = useState('');
  const [userCards, setUserCards] = useState([]);
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const items = [{ text: '카드 등록' }, { text: '카드 추천' }];
  const panels = [
    <CardRegTab user={user} userCards={userCards} />,
    <CardRecTab user={user} recommendedCards={recommendedCards} />,
  ];
  useEffect(() => {
    if (!isLoggedIn) {
      setIsShowDialog(true);
    } else {
      setUser(userFromStore);
    }
  }, [isLoggedIn, userFromStore]);

  // 사용자 보유 카드 정보 조회
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const cardResponse = await getAllCardsInfoByUserNum(
          userFromStore.userNum,
        );
        if (cardResponse.data.status === 200) {
          const formattedCards = cardResponse.data.data.map((card) => ({
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
                : [{ title: '혜택 없음', value: '-', type: '기타' }],
          }));
          setUserCards(formattedCards);
        } else if (cardResponse.data.status === 204) {
          setUserCards([]);
        }

        // 추천 카드 정보 불러오기
        const recommendedResponse = await getRecommendedCards(
          userFromStore.userNum,
        );

        if (recommendedResponse.data.status === 200) {
          // 중복된 카드 제거 (cardTitle을 기준으로 Set 사용)
          const uniqueCards = Array.from(
            new Map(
              recommendedResponse.data.data.map((card) => [
                card.cardTitle,
                card,
              ]),
            ).values(),
          );

          // 중복된 혜택 제거 (benefitTitle을 기준으로 Map 사용)
          const formattedRecommendedCards = uniqueCards.map((card) => {
            const uniqueBenefits = Array.from(
              new Map(
                card.benefits.map((benefit) => [benefit.benefitTitle, benefit]),
              ).values(),
            );

            return {
              cardTitle: card.cardTitle,
              cardImg: card.cardImgUrl ? card.cardImgUrl.split(',')[0] : '',
              mainBenefit:
                uniqueBenefits.length > 0
                  ? `${uniqueBenefits[0].benefitTitle} (${uniqueBenefits[0].benefitValue})`
                  : '혜택 없음',
              cardInfo: uniqueBenefits.map((benefit) => ({
                title: benefit.benefitTitle,
                value: benefit.benefitValue,
                type: benefit.benefitType,
              })),
              cardApplyLink: card.cardApplyUrl,
            };
          });

          setRecommendedCards((prevCards) => {
            if (
              JSON.stringify(prevCards) !==
              JSON.stringify(formattedRecommendedCards)
            ) {
              return formattedRecommendedCards;
            }
            return prevCards;
          });
        } else {
          setRecommendedCards([]);
        }
      } catch (error) {
        console.error('데이터 로딩 실패: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn, userFromStore]);

  return (
    <CommonRoot>
      <RootIn>
        {isLoading ? (
          <CommonLoading />
        ) : (
          <>
            <CommonTabs
              items={items}
              value={selectedTab}
              selectedTab={setSelectedTab}
            />

            {React.cloneElement(panels[selectedTab], { user, userCards })}
          </>
        )}
      </RootIn>

      {isShowDialog && (
        <CommonDialog
          open={isShowDialog}
          onClick={() => navigate('/login')}
          onClose={() => navigate('/login')}
          submitText="로그인"
        >
          <p style={{ textAlign: 'center' }}>
            로그인 정보가 없습니다. 로그인을 진행해주세요!
          </p>
        </CommonDialog>
      )}
    </CommonRoot>
  );
}
