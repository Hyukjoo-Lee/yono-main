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

  useEffect(() => {
    const fetchUserCardsWithBenefits = async () => {
      setIsLoading(true);
      try {
        const response = await getAllCardsInfoByUserNum(userFromStore.userNum);

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
                : [{ title: '혜택 없음', value: '-', type: '기타' }],
          }));

          setUserCards(formattedCards);
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
  }, [isLoggedIn, userFromStore]);

  useEffect(() => {
    const fetchRecommendedCards = async () => {
      setIsLoading(true);
      try {
        const response = await getRecommendedCards(userFromStore.userNum);
        if (response.status === 200) {
          setRecommendedCards(response);
          console.log('recommendedCards:' + JSON.stringify(recommendedCards));
        } else if (response.status === 204) {
          console.log(
            '추천할 카드가 없습니다. 사용 내역이 부족하거나 해당 카드가 없습니다.',
          );
          setRecommendedCards([]);
        }
      } catch (error) {
        console.error('추천 카드 로딩 실패: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchRecommendedCards();
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
