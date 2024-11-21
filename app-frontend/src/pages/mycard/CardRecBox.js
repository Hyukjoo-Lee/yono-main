import styled from 'styled-components';
import { Box } from '@mui/material';
import CommonButton from '../../common/CommonButton';
import theme from '../../theme/theme';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CoffeeIcon from '@mui/icons-material/Coffee';
import BusIcon from '@mui/icons-material/DirectionsBusFilled';

const Root = styled(Box)`
  width: 100%;
  border-radius: 5px;
  overflow-y: auto;
  background-color: ${(props) =>
    props.background || props.theme.color.lightBlue};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RootIn = styled.div`
  width: 300px;
  padding: 20px;
  text-align: center;
  position: relative;
`;

const CardImage = styled.img`
  width: 160px;
  margin: 0 auto;
  display: block;
`;

const CardTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.color.black};
  font-weight: bold;
  margin: 10px 0 0 0;
`;

const CardSubTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.xs};
  color: ${(props) => props.theme.color.black};
  margin: 0 0 5px 0;
`;

const BenefitList = styled.div`
  margin: 0 0 5px 0;
  text-align: left;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-size: ${(props) => props.theme.fontSize.base};

  & > p {
    margin: 0 0 0 0;
  }

  & > svg {
    margin-right: 5px;
    font-size: ${(props) => props.theme.fontSize.md};
  }
`;

const CardRecBox = ({ cardTitle, cardImg, cardInfo }) => {
  return (
    <Root>
      <RootIn>
        <CardImage src={cardImg} alt="카드 이미지" />
        <CardTitle>{cardTitle}</CardTitle>
        <CardSubTitle>카드 혜택</CardSubTitle>
        <BenefitList>
          {cardInfo.map((benefit, index) => (
            <BenefitItem key={index}>
              {benefit.label === '스타벅스 할인' && <CoffeeIcon />}
              {benefit.label === '대중교통 할인' && <BusIcon />}
              {benefit.label === '영화 쿠폰 제공' && <LiveTvIcon />}
              <p>
                {benefit.label} <strong>{benefit.value}</strong> (
                {benefit.additional})
              </p>
            </BenefitItem>
          ))}
        </BenefitList>
        <Box display="flex" justifyContent="center" alignItems="center">
          <CommonButton
            fontSize={theme.fontSize.base}
            width="150px"
            height="40px"
            text="카드사 바로가기"
          />
        </Box>
      </RootIn>
    </Root>
  );
};

export default CardRecBox;
