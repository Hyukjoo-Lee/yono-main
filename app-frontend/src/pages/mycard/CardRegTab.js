import styled from "styled-components";
import CardImage from "../../assets/images/CardImage.png";
import CardRegFormBox from "./CardRegFormBox";
import CommonCardListBox from "../../common/CommonCardListBox";
import CommonPageInfo from "../../common/CommonPageInfo";

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

const CardRegTab = () => {
  const cardData = [
    {
      cardTitle: "현대카드(신용)",
      cardImg: CardImage,
      cardNumber: "0000 0000 0000 0000",
      cardInfo: [
        { label: "스타벅스 할인", value: "50%", additional: "월 1회" },
        { label: "대중교통 할인", value: "20%", additional: "청구할인" },
        { label: "영화 쿠폰 제공", value: "무료", additional: "연 12회" },
      ],
    },
    {
      cardTitle: "신한카드(신용)",
      cardImg: CardImage,
      cardNumber: "0000 0000 0000 0000",
      cardInfo: [
        { label: "스타벅스 할인", value: "20%", additional: "월 2회" },
        { label: "대중교통 할인", value: "10%", additional: "청구할인" },
        { label: "영화 쿠폰 제공", value: "무료", additional: "연 12회" },
      ],
    },
    {
      cardTitle: "농협카드(신용)",
      cardImg: CardImage,
      cardNumber: "0000 0000 0000 0000",
      cardInfo: [
        { label: "스타벅스 할인", value: "50%", additional: "월 1회" },
        { label: "대중교통 할인", value: "20%", additional: "청구할인" },
        { label: "영화 쿠폰 제공", value: "무료", additional: "연 12회" },
      ],
    },
    {
      cardTitle: "현대카드(체크)",
      cardImg: CardImage,
      cardNumber: "0000 0000 0000 0000",
      cardInfo: [
        { label: "스타벅스 할인", value: "50%", additional: "월 1회" },
        { label: "대중교통 할인", value: "20%", additional: "청구할인" },
        { label: "영화 쿠폰 제공", value: "무료", additional: "연 12회" },
      ],
    },
    {
      cardTitle: "하나카드(신용)",
      cardImg: CardImage,
      cardNumber: "0000 0000 0000 0000",
      cardInfo: [
        { label: "스타벅스 할인", value: "50%", additional: "월 1회" },
        { label: "대중교통 할인", value: "20%", additional: "청구할인" },
        { label: "영화 쿠폰 제공", value: "무료", additional: "연 8회" },
      ],
    },
    {
      cardTitle: "현대카드(신용)",
      cardImg: CardImage,
      cardNumber: "0000 0000 0000 0000",
      cardInfo: [
        { label: "스타벅스 할인", value: "50%", additional: "월 1회" },
        { label: "대중교통 할인", value: "20%", additional: "청구할인" },
        { label: "영화 쿠폰 제공", value: "무료", additional: "연 12회" },
      ],
    },
  ];

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
        <CardRegFormBox />
        <ListBox>
          <CommonCardListBox data={cardData} showDetailed={true} />
        </ListBox>
      </Root>
    </>
  );
};

export default CardRegTab;
