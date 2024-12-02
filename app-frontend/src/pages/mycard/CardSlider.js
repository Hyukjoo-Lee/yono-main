import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as ArrowImage } from '../../assets/images/arrow-slider.svg';
import styled from 'styled-components';
import CardDemoImage from '../../assets/images/cards/default-card.png';

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

const CardTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin: 0px 0px 15px 0px;
`;

const CardMainBenefit = styled.p`
  font-size: 22px;
  font-weight: 500;
  margin: 0px 0px 15px 0px;
`;

const CardBenefit = styled.p`
  font-size: 18px;
  font-weight: 200;
  line-height: 25px;
  margin: 0;
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

const DefaultImageContainer = styled.div`
  width: 185px;
  height: 285px;
  margin: 47px auto 0;
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

const CardSlider = ({
  cardImages,
  showDetailed,
  cardTitle,
  cardMainBenefit,
  cardInfo,
}) => {
  return (
    <SlideContainer>
      <img src={cardImages || CardDemoImage} alt="card" />
      {showDetailed && cardTitle && cardInfo && (
        <CardInfo>
          <CardTitle>{cardTitle}</CardTitle>
          <CardMainBenefit>{cardMainBenefit}</CardMainBenefit>
          {cardInfo.map((info, index) => (
            <CardBenefit key={index}>
              {info.label} {info.value} ({info.additional})
            </CardBenefit>
          ))}
        </CardInfo>
      )}
    </SlideContainer>
  );
};

const CustomSlides = ({ cardImages, showDetailed, cardData }) => {
  const sliderRef = useRef(null);

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
  };

  if (!cardImages && !cardData) {
    return (
      <SlideContainer>
        <DefaultImageContainer>
          <img src={CardDemoImage} alt="default card" />
        </DefaultImageContainer>
      </SlideContainer>
    );
  }

  return (
    <SliderContainer>
      <Slider ref={sliderRef} {...settings}>
        {showDetailed && cardData
          ? cardData.map((card, index) => (
              <div key={index}>
                <CardSlider
                  showDetailed={showDetailed}
                  cardTitle={card.cardTitle}
                  cardMainBenefit={card.mainBenefit}
                  cardInfo={card.cardInfo}
                  cardImages={card.cardImg}
                />
              </div>
            ))
          : cardImages?.map((card, index) => (
              <div key={index}>
                <CardSlider cardImages={card} />
              </div>
            ))}
      </Slider>
    </SliderContainer>
  );
};

export default CustomSlides;
