import styled from 'styled-components';
import { Box } from '@mui/material';
import CommonButton from '../../common/CommonButton';
import theme from '../../theme/theme';
import StarIcon from '@mui/icons-material/Star';
import { getBenefitIcon } from '../../common/CommonCardListBox';

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
  width: 100%;
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
  font-size: ${(props) => props.theme.fontSize.sm};

  & > p {
    margin: 0 0 0 0;
  }

  & > svg {
    margin-right: 5px;
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const CardMainBenefit = styled.p`
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0px 0px 8px 0px;

  & > p {
    margin: 0 0 0 0;
  }

  & > svg {
    margin-right: 5px;
    color: #ffd900;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

const CardRecBox = ({
  cardTitle,
  cardImg,
  cardInfo,
  cardMainBenefit,
  cardApplyLink,
}) => {
  return (
    <Root>
      <RootIn>
        <CardImage src={`http://localhost:8065${cardImg}`} alt="카드 이미지" />
        <CardTitle>{cardTitle}</CardTitle>
        <CardSubTitle>카드 혜택</CardSubTitle>
        <CardMainBenefit>
          <StarIcon />
          {cardMainBenefit}
        </CardMainBenefit>
        <BenefitList>
          {/* 메인 혜택 포함하며 최대 8개 혜택 보여짐 */}
          {cardInfo.slice(1, 7).map((benefit, index) => (
            <BenefitItem key={index}>
              {getBenefitIcon(benefit.type)} {benefit.title} ({benefit.value})
            </BenefitItem>
          ))}
        </BenefitList>

        <ButtonWrapper>
          <CommonButton
            fontSize={theme.fontSize.base}
            width="150px"
            height="40px"
            text="카드사 바로가기"
            onClick={() => window.open(cardApplyLink, '_blank')}
          />
        </ButtonWrapper>
      </RootIn>
    </Root>
  );
};

export default CardRecBox;
