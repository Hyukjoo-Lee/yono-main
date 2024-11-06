import React from "react";
import styled from "styled-components";
import CommonButton from "./CommonButton";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CoffeeIcon from "@mui/icons-material/Coffee";
import BusIcon from "@mui/icons-material/DirectionsBusFilled";

const HoverButtonContainer = styled.div`
  margin: 0 10px 28px 0;
  opacity: 0;
  transition: opacity 0.5s ease;
  visibility: hidden;
`;

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
  cursor: pointer;

  &:hover ${HoverButtonContainer} {
    visibility: visible;
    opacity: 1;
  }
`;

const CardName = styled.p`
  margin: 0px;
  font-size: 20px;
  color: #212121;
  font-weight: bold;
  margin-bottom: 0 0 8px 0;
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
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.color.lightGray};
  margin: 0;

  & > svg {
    margin-right: 5px;
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const TextStyle = styled(TitleStyle)`
  color: #333333;
`;

const CardImage = styled.img`
  width: 100px;
  height: auto;
`;

const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardNumber = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.color.black};
  margin: 0 0 5px 0;
  min-height: 27px;
`;

const AdditionalInfo = styled.div`
  font-size: 15px;
  color: #000000;
  margin-bottom: 3px;
`;

const CommonCardListBox = ({
  cardTitle,
  cardImg,
  cardInfo,
  data,
  showDetailed,
}) => {
  return (
    <>
      {showDetailed ? (
        <>
          {data &&
            data.map((card, index) => (
              <BoxStyle key={index}>
                <CardImage src={card.cardImg} alt="카드 이미지" />
                <CardInfoContainer>
                  <CardName>{card.cardTitle}</CardName>
                  <CardNumber> {card.cardNumber || ""}</CardNumber>
                  {card.cardInfo.map((benefit, index) => (
                    <InfoRow key={index}>
                      <TitleStyle>
                        {benefit.label === "스타벅스 할인" && <CoffeeIcon />}
                        {benefit.label === "대중교통 할인" && <BusIcon />}
                        {benefit.label === "영화 쿠폰 제공" && <LiveTvIcon />}
                        {benefit.label}
                      </TitleStyle>
                    </InfoRow>
                  ))}
                </CardInfoContainer>
                <CardInfoContainer>
                  <HoverButtonContainer>
                    <CommonButton
                      text="카드 선택"
                      fontSize="16px"
                      width="100px"
                      height="30px"
                    />
                  </HoverButtonContainer>

                  {card.cardInfo.map((benefit, index) => (
                    <AdditionalInfo key={index}>
                      <TitleStyle>
                        {benefit.value} ({benefit.additional})
                      </TitleStyle>
                    </AdditionalInfo>
                  ))}
                </CardInfoContainer>
              </BoxStyle>
            ))}
        </>
      ) : (
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
      )}
    </>
  );
};
export default CommonCardListBox;
