import styled from "styled-components";
import CommonCardListBox from "../../common/CommonCardListBox";
import CardImage from "../../assets/images/CardImage.png";
import CardRegFormBox from "./CardRegFormBox";

const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 25px;
`;

const ListBox = styled.div`
  width: 50%;
  height: 518px;
  overflow-y: auto;
`;

const CardRegTab = () => {
  const cardList = [
    {
      title: "현대카드(신용)",
      cardImage: CardImage,
      info: [
        { label: "날짜", value: "2024.10.20" },
        { label: "사용처", value: "88맥주집" },
        { label: "카테고리", value: "식당" },
      ],
    },
    {
      title: "신한카드(체크)",
      cardImage: CardImage,
      info: [
        { label: "날짜", value: "2024.10.20" },
        { label: "사용처", value: "삼겹살" },
        { label: "카테고리", value: "식당" },
      ],
    },
    {
      title: "국민카드(신용)",
      cardImage: CardImage,
      info: [
        { label: "날짜", value: "2024.10.20" },
        { label: "사용처", value: "kg중국집" },
        { label: "카테고리", value: "식당" },
      ],
    },
    {
      title: "현대카드(신용)",
      cardImage: CardImage,
      info: [
        { label: "날짜", value: "2024.10.20" },
        { label: "사용처", value: "kg쌀국수" },
        { label: "카테고리", value: "식당" },
      ],
    },
  ];

  return(
    <Root>
      <CardRegFormBox>
      </CardRegFormBox>
      <ListBox>
        {cardList.map((item, index) => (
          <CommonCardListBox
            key={index}
            cardTitle={item.title}
            cardImg={item.cardImage}
            cardInfo={item.info}
          />
        ))}
      </ListBox>
    </Root>
  )
};

export default CardRegTab;
