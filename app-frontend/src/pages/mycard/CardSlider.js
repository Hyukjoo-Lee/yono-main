import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as ArrowImage } from '../../assets/images/arrow-slider.svg';
import styled from 'styled-components';
import CardDemoImage from '../../assets/images/card_demo.png';

const CardSlider = ({ cardImages }) => {
  return (
    <SlideContainer>
      <img src={cardImages} alt="card" />
    </SlideContainer>
  );
};

const SlideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 185px;
    height: 285px;
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

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <ArrowWrapper
    {...props}
    className={
      'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')
    }
  >
    <ArrowImage />
  </ArrowWrapper>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <ArrowWrapper
    {...props}
    className={
      'slick-next slick-arrow' +
      (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
    }
  >
    <ArrowImage />
  </ArrowWrapper>
);

const SliderContainer = styled.div`
  width: 80%;
  margin: 47px auto 0;
`;

const CustomSlides = ({ cardImages, detail, DetailComponent }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [cardImages]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
  };

  return (
    <SliderContainer>
      <Slider ref={sliderRef} {...settings}>
        {cardImages ? (
          cardImages.map((card, index) => (
            <div key={index} style={{ display: 'flex' }}>
              <CardSlider cardImages={card} />
              {detail && <DetailComponent />}
            </div>
          ))
        ) : (
          <CardSlider cardImages={CardDemoImage} />
        )}
      </Slider>
    </SliderContainer>
  );
};

export default CustomSlides;
