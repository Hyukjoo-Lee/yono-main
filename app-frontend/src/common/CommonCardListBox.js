import React from 'react';
import styled from 'styled-components';
import CommonButton from './CommonButton';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CoffeeIcon from '@mui/icons-material/Coffee';
import BusIcon from '@mui/icons-material/DirectionsBusFilled';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import FlightIcon from '@mui/icons-material/Flight';
import StoreIcon from '@mui/icons-material/Store';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import HomeIcon from '@mui/icons-material/Home';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VerifiedIcon from '@mui/icons-material/Verified';

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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
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
  width: 80px;
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

const VerifiedTextContainer = styled.div`
  margin: 0 10px 28px 0;
  width: '100px';
`;

export const getBenefitIcon = (type) => {
  switch (type) {
    case '주유':
      return <LocalGasStationIcon />;
    case '쇼핑':
      return <ShoppingCartIcon />;
    case '금융':
      return <AttachMoneyIcon />;
    case '교육':
      return <SchoolIcon />;
    case '통신':
      return <PhoneIphoneIcon />;
    case '여가':
      return <CoffeeIcon />;
    case '영화':
      return <LiveTvIcon />;
    case '항공':
      return <FlightIcon />;
    case '전 가맹점':
      return <StoreIcon />;
    case '교통':
      return <BusIcon />;
    case '보험':
      return <HealthAndSafetyIcon />;
    case '의료':
      return <LocalPharmacyIcon />;
    case '생활':
      return <HomeIcon />;
    default:
      return <HelpOutlineIcon />;
  }
};

const CommonCardListBox = ({
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
                <CardImage
                  src={`http://localhost:8065${card.cardImg || ''}`}
                  alt="카드 이미지"
                />

                <CardInfoContainer>
                  <CardName>{card.cardTitle}</CardName>
                  <CardNumber> {card.cardNumber || ''}</CardNumber>
                  {card.cardInfo.slice(0, 3).map((benefit, index) => (
                    <InfoRow key={index}>
                      <TitleStyle>
                        {getBenefitIcon(benefit.type)} {benefit.title}
                      </TitleStyle>
                    </InfoRow>
                  ))}
                </CardInfoContainer>
                <CardInfoContainer>
                  {card.primaryCard === '대표카드' ? (
                    <VerifiedTextContainer>
                      <VerifiedIcon
                        style={{ color: '#4CAF50', fontSize: '28px' }}
                      />
                    </VerifiedTextContainer>
                  ) : (
                    <HoverButtonContainer>
                      <CommonButton
                        text={buttonText}
                        fontSize="16px"
                        width="100px"
                        height="30px"
                        onClick={() => onCardSelect(card)}
                      />
                    </HoverButtonContainer>
                  )}

                  {card.cardInfo.slice(0, 3).map((benefit, index) => (
                    <AdditionalInfo key={index}>
                      <TitleStyle>{benefit.value}</TitleStyle>
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
