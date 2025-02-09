import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as ArrowImage } from '../../assets/images/arrow-slider.svg';
import styled from 'styled-components';
import CardDemoImage from '../../assets/images/cards/default-card.png';
import { getBenefitIcon } from '../../common/CommonCardListBox';
import StarIcon from '@mui/icons-material/Star';
import theme from '../../theme/theme';

const SliderContainer = styled.div`
  width: 80%;
  margin: 47px auto 0;
`;

const SlideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 185px;
    height: 285px;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 120px;
  align-items: flex-start;
  height: 100%;
`;

const SingleCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
`;

const CardTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin: 0px 0px 15px 0px;
`;

const CardBenefit = styled.div`
  font-weight: 200;
  line-height: 25px;
  margin-bottom: 5px;
`;

const CardMainBenefit = styled.div`
  font-weight: 500;
  margin: 0px 0px 15px 0px;
`;

const MainBenefitType = styled.span`
  font-size: ${theme.fontSize.lg} !important;
  margin-right: 5px;

  & > svg {
    color: #ffd900;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

const MainBenefitTitle = styled.span`
  font-size: ${theme.fontSize.lg} !important;
  margin-right: 20px;
`;

const MainBenefitValue = styled.span`
  font-size: ${theme.fontSize.lg} !important;
`;

const BenefitType = styled.span`
  font-size: ${theme.fontSize.md} !important;
  margin: 0 5px 5px 0;

  svg {
    font-size: ${theme.fontSize.md} !important;
  }
`;

const BenefitTitle = styled.span`
  font-size: ${theme.fontSize.md} !important;
  margin: 0 20px 5px 0;

  svg {
    font-size: ${theme.fontSize.md} !important;
  }
`;

const BenefitValue = styled.span`
  font-size: ${theme.fontSize.md} !important;
  svg {
    font-size: ${theme.fontSize.md} !important;
  }
`;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  cursor: pointer;
  z-index: 1;

  &.slick-prev svg {
    transform: rotate(180deg);
  }

  path {
    stroke: ${(props) => props.theme.color.gray};
    transition: stroke 0.3s ease;
  }

  &::before {
    content: none;
  }

  &:hover path {
    stroke: ${(props) => props.theme.color.lightGray};
  }
`;

const SingleImageContainer = styled.div`
  width: 185px;
  height: 285px;
  margin: 47px auto 0;
`;

const SingleUserCardImageContainer = styled.div`
  width: 185px;
  height: 285px;
  margin: 47px 120px 0;
`;

const SlickArrow = ({ currentSlide, slideCount, direction, ...props }) => {
  const isLeft = direction === 'left';
  return (
    <ArrowWrapper
      {...props}
      className={
        `slick-${isLeft ? 'prev' : 'next'}` +
        (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
      }
    >
      <ArrowImage />
    </ArrowWrapper>
  );
};

const CardSlider = ({ cardImages = [], cardTitle, cardInfo = [] }) => {
  const cardMainBenefit = cardInfo.length > 0 ? cardInfo[0] : null;
  const remainingBenefits = cardInfo.slice(1);

  return (
    <SlideContainer>
      <img
        src={`${process.env.REACT_APP_API_URL}${cardImages}` || CardDemoImage}
        alt="card"
      />
      {cardTitle && cardInfo.length > 0 && (
        <CardInfo>
          <CardTitle>{cardTitle}</CardTitle>
          {cardMainBenefit && (
            <CardMainBenefit>
              <MainBenefitType>
                {getBenefitIcon(cardMainBenefit.type)}
              </MainBenefitType>
              <MainBenefitTitle>{cardMainBenefit.title}</MainBenefitTitle>
              <MainBenefitValue>{cardMainBenefit.value}</MainBenefitValue>
            </CardMainBenefit>
          )}
          {remainingBenefits.map((info, index) => (
            <CardBenefit key={index}>
              <BenefitType>{getBenefitIcon(info.type)}</BenefitType>
              <BenefitTitle>{info.title}</BenefitTitle>
              <BenefitValue>{info.value}</BenefitValue>
            </CardBenefit>
          ))}
        </CardInfo>
      )}
    </SlideContainer>
  );
};

/**
 * 카드 이미지를 슬라이드로 표시, 카드의 주요 혜택과 추가 혜택 정보를 렌더링
 *
 * @param {string[]} props.cardImages - 카드 이미지의 URL 배열
 * @param {boolean} props.showDetailed - 상세 정보를 표시할지 여부
 * @param {Array} cardData - 카드, 혜택 정보
 *
 * @returns 카드 슬라이드
 */
const CustomSlides = ({
  cardImages = [],
  showDetailed,
  cardData = [],
  onImageSelect,
}) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (onImageSelect && cardImages.length > 0) {
      onImageSelect(cardImages[0]);
    }
  }, [cardImages, onImageSelect]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [cardImages]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SlickArrow direction="right" />,
    prevArrow: <SlickArrow direction="left" />,
    afterChange: (currentSlide) => {
      if (onImageSelect) {
        onImageSelect(cardImages[currentSlide]);
      }
    },
  };

  // 보유 카드가 하나 일 때, 메인 페이지 내 단일 카드 정보 표시
  if (cardImages.length === 1 && cardData.length === 1 && showDetailed) {
    const card = cardData[0];
    const cardMainBenefit = card.cardInfo.length > 0 ? card.cardInfo[0] : null;
    const remainingBenefits = card.cardInfo.slice(1);

    return (
      <SlideContainer>
        <SingleUserCardImageContainer>
          <img
            src={
              `${process.env.REACT_APP_API_URL}${cardImages[0]}` ||
              CardDemoImage
            }
            alt="카드 이미지"
          />
        </SingleUserCardImageContainer>

        <SingleCardInfo>
          <CardTitle>{card.cardTitle}</CardTitle>

          {cardMainBenefit && (
            <CardMainBenefit>
              <MainBenefitType>
                <StarIcon />
              </MainBenefitType>
              <MainBenefitTitle>{cardMainBenefit.title}</MainBenefitTitle>
              <MainBenefitValue>{cardMainBenefit.value}</MainBenefitValue>
            </CardMainBenefit>
          )}

          {remainingBenefits.map((info, index) => (
            <CardBenefit key={index}>
              <BenefitType>{getBenefitIcon(info.type)}</BenefitType>
              <BenefitTitle>{info.title}</BenefitTitle>
              <BenefitValue>{info.value}</BenefitValue>
            </CardBenefit>
          ))}
        </SingleCardInfo>
      </SlideContainer>
    );
  }

  // 카드 등록 폼 내 카드 기본 이미지, 선택된 카드 회사가 없거나 카드의 이미지가 존재 하지 않을 때
  if (cardImages.length === 0 && cardData.length === 0) {
    return (
      <SlideContainer>
        <SingleImageContainer>
          <img src={CardDemoImage} alt="default card" />
        </SingleImageContainer>
      </SlideContainer>
    );
  }

  // 카드 등록 폼 내 카드 기본 이미지, 카드 이미지가 하나 일 때
  if (cardImages.length === 1) {
    return (
      <SlideContainer>
        <SingleImageContainer>
          <img
            src={`${process.env.REACT_APP_API_URL}${cardImages[0]}`}
            alt="single card"
          />
        </SingleImageContainer>
      </SlideContainer>
    );
  }

  return (
    <SliderContainer>
      <Slider ref={sliderRef} {...settings}>
        {showDetailed && cardData.length > 0
          ? cardData.map((card, index) => (
              <div key={index}>
                <CardSlider
                  showDetailed={showDetailed}
                  cardTitle={card.cardTitle}
                  cardMainBenefit={card.mainBenefit}
                  cardInfo={card.cardInfo || []}
                  cardImages={
                    Array.isArray(card.cardImg) ? card.cardImg : [card.cardImg]
                  }
                />
              </div>
            ))
          : cardImages.map((card, index) => (
              <div key={index}>
                <CardSlider cardImages={[card]} />
              </div>
            ))}
      </Slider>
    </SliderContainer>
  );
};

export default CustomSlides;
