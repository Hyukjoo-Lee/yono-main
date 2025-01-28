import React from 'react';
import styled from 'styled-components';
import CommonButton from './CommonButton';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CoffeeIcon from '@mui/icons-material/Coffee';
import BusIcon from '@mui/icons-material/DirectionsBusFilled';

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

const BoxInStyle = styled.div`
  width: calc(100% - 80px - 24px);
`;

const CardName = styled.p`
  margin: 0px;
  font-size: 20px;
  color: #212121;
  font-weight: bold;
`;

const DailyCardName = styled(CardName)`
  margin-bottom: 8px;
`;

const InfoRow = styled.div`
  min-width: 256px;
  width: 100%;
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

const SmallCardImage = styled(CardImage)`
  width: 80px;
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
  cardInfo,
  data,
  showDetailed,
  onCardSelect,
  buttonText = '카드 선택',
  cardItem,
}) => {
  const fields = cardItem
    ? [
        { title: '날짜', value: cardItem.resUsedDate || 'N/A' },
        { title: '사용처', value: cardItem.resMemberStoreName || 'N/A' },
        { title: '카테고리', value: cardItem.resMemberStoreType || 'N/A' },
        {
          title: '사용금액',
          value: cardItem.resUsedAmount
            ? new Intl.NumberFormat('ko-KR').format(cardItem.resUsedAmount)
            : 'N/A',
        },
      ]
    : [];

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
                  <CardNumber> {card.cardNumber || ''}</CardNumber>
                  {card.cardInfo.map((benefit, index) => (
                    <InfoRow key={index}>
                      <TitleStyle>
                        {benefit.label === '스타벅스 할인' && <CoffeeIcon />}
                        {benefit.label === '대중교통 할인' && <BusIcon />}
                        {benefit.label === '영화 쿠폰 제공' && <LiveTvIcon />}
                        {benefit.label}
                      </TitleStyle>
                    </InfoRow>
                  ))}
                </CardInfoContainer>
                <CardInfoContainer>
                  <HoverButtonContainer>
                    <CommonButton
                      text={buttonText}
                      fontSize="16px"
                      width="100px"
                      height="30px"
                      onClick={() => onCardSelect(card)}
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
      ) : cardItem ? (
        <BoxStyle>
          <SmallCardImage
            src={`http://localhost:8065${cardItem.cardImgUrl || ''}`}
            alt="카드이미지"
          />
          <BoxInStyle>
            <DailyCardName>
              {cardItem.cardTitle || '카드 이름 없음'}
            </DailyCardName>
            {fields.map((item, index) => (
              <InfoRow key={index}>
                <TitleStyle>{item.title}</TitleStyle>
                <TextStyle>{item.value}</TextStyle>
              </InfoRow>
            ))}
          </BoxInStyle>
        </BoxStyle>
      ) : null}
    </>
  );
};
export default CommonCardListBox;
