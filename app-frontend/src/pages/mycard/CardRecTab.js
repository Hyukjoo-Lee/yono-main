import styled from 'styled-components';
import CardImage from '../../assets/images/CardImage.png';
import CardRecBox from './CardRecBox';
import CommonCardListBox from '../../common/CommonCardListBox';
import CommonPageInfo from '../../common/CommonPageInfo';
import CardDemoImage from '../../assets/images/SamsungCard.png';

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
  const cardData = [
    {
      cardTitle: '삼성카드(신용)',
      cardImg: CardDemoImage,
      cardInfo: [
        { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
        { label: '대중교통 할인', value: '20%', additional: '청구할인' },
        { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
      ],
    },
    {
      cardTitle: '신한카드(신용)',
      cardImg: CardImage,
      cardInfo: [
        { label: '스타벅스 할인', value: '20%', additional: '월 2회' },
        { label: '대중교통 할인', value: '10%', additional: '청구할인' },
        { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
      ],
    },
    {
      cardTitle: '농협카드(신용)',
      cardImg: CardImage,
      cardInfo: [
        { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
        { label: '대중교통 할인', value: '20%', additional: '청구할인' },
        { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
      ],
    },
    {
      cardTitle: '현대카드(체크)',
      cardImg: CardImage,
      cardInfo: [
        { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
        { label: '대중교통 할인', value: '20%', additional: '청구할인' },
        { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
      ],
    },
    {
      cardTitle: '하나카드(신용)',
      cardImg: CardImage,
      cardInfo: [
        { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
        { label: '대중교통 할인', value: '20%', additional: '청구할인' },
        { label: '영화 쿠폰 제공', value: '무료', additional: '연 8회' },
      ],
    },
    {
      cardTitle: '현대카드(신용)',
      cardImg: CardImage,
      cardInfo: [
        { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
        { label: '대중교통 할인', value: '20%', additional: '청구할인' },
        { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
      ],
    },
  ];

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
        {/* 첫 번째 카드에 대해서만 예시로 전달: 나중에 리스트에서 선택된 카드로 설정필요 */}
        <CardRecBox
          cardTitle={cardData[0].cardTitle}
          cardImg={cardData[0].cardImg}
          cardInfo={cardData[0].cardInfo}
        />
        <ListBox>
          <CommonCardListBox data={cardData} showDetailed={true} />
        </ListBox>
      </Root>
    </>
  );
};

export default CardRecTab;
