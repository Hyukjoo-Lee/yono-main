import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserCards } from '../apis/cardApi';
import KakaoLoginButton from '../pages/auth/components/KakaoLoginButton';

const ButtonStyle = styled.button`
  width: 162px;
  height: 48px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.blue};
  margin-top: 500px;
  border: 0px;
  cursor: pointer;
`;

const TextStyle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.white};
  font-weight: bold;
  margin: 0px;
  line-height: 22px;
`;

export default function CardListTest() {
  const [cardListData, setCardListData] = useState([]);

  useEffect(() => {
    const fetchCardListData = async () => {
      try {
        const cardList = await getUserCards();
        setCardListData(cardList);
      } catch (error) {
        console.error('유저 정보를 불러오는 중 오류 발생:', error);
        setCardListData(null);
      }
    };

    fetchCardListData();
  }, []);
  console.log(cardListData);
  return (
    <div>
      <ButtonStyle>
        <TextStyle>카드 정보 불러오기</TextStyle>
      </ButtonStyle>
      <KakaoLoginButton />
    </div>
  );
}
