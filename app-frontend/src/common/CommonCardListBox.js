import React from "react";
import styled from "styled-components";

const BoxStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 7px;
  border: 1px solid #d0d0d0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 33px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const CardName = styled.p`
  margin: 0px;
  font-size: 20px;
  color: #212121;
  font-weight: bold;
  margin-bottom: 8px;
`;

const InfoRow = styled.div`
  width: 256px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const TitleStyle = styled.p`
  font-size: 15px;
  color: #757575;
  margin: 0;
`;

const TextStyle = styled(TitleStyle)`
  color: #333333;
`;

const CommonCardListBox = ({ cardTitle, cardImg, cardInfo }) => {
  return (
    <BoxStyle>
      <img src={cardImg} alt="카드이미지" />
      <div>
        <CardName>{cardTitle}</CardName>
        {cardInfo.map((item, index) => (
          <InfoRow key={index}>
            <TitleStyle>{item.label}</TitleStyle>
            <TextStyle>{item.value}</TextStyle>
          </InfoRow>
        ))}
      </div>
    </BoxStyle>
  );
};
export default CommonCardListBox;
