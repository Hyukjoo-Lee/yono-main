import CardDemoImage from '../assets/images/SamsungCard.png';
import CardImage from '../assets/images/CardImage.png';

export const CARD_TYPES = {
  CREDIT: '신용',
  DEBIT: '체크',
};

export const CARD_COMPANIES = {
  SAMSUNG: '삼성',
  SHINHAN: '신한',
  NONGHYUP: '농협',
  HYUNDAI: '현대',
  HANA: '하나',
};

export const cardMockData = [
  {
    id: 1,
    cardTitle: `${CARD_COMPANIES.SAMSUNG}카드(${CARD_TYPES.CREDIT})`,
    cardImg: CardDemoImage,
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: 2,
    cardTitle: `${CARD_COMPANIES.HANA}카드(${CARD_TYPES.CREDIT})`,
    cardImg: CardImage,
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: 3,
    cardTitle: `${CARD_COMPANIES.NONGHYUP}카드(${CARD_TYPES.CREDIT})`,
    cardImg: CardImage,
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
  {
    id: 4,
    cardTitle: `${CARD_COMPANIES.HYUNDAI}카드(${CARD_TYPES.DEBIT})`,
    cardImg: CardImage,
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 8회' },
    ],
  },
  {
    id: 5,
    cardTitle: `${CARD_COMPANIES.HYUNDAI}카드(${CARD_TYPES.CREDIT})`,
    cardImg: CardImage,
    cardInfo: [
      { label: '스타벅스 할인', value: '50%', additional: '월 1회' },
      { label: '대중교통 할인', value: '20%', additional: '청구할인' },
      { label: '영화 쿠폰 제공', value: '무료', additional: '연 12회' },
    ],
  },
];

export const getCardByCompany = (company) =>
  cardMockData.find((card) => card.cardTitle.includes(company));

export const getCardsByType = (type) =>
  cardMockData.filter((card) => card.cardTitle.includes(type));
