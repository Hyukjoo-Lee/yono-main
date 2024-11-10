import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as LeftArrowImage } from "../../assets/images/left_arrow.svg";
import { ReactComponent as RightArrowImage } from "../../assets/images/right_arrow.svg";
import styled from "styled-components";
import CardDemoImage from "../../assets/images/card_demo.png";

function CardSlider({ image, name }) {
  return (
    <SlideContainer>
      <img src={image} alt={name} />
    </SlideContainer>
  );
}

const SlideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 280px;
    height: 180px;
    border-radius: 8px;
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
      "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
    }
  >
    <LeftArrowImage />
  </ArrowWrapper>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <ArrowWrapper
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
  >
    <RightArrowImage />
  </ArrowWrapper>
);

const SliderContainer = styled.div`
  width: 80%;
  margin: 47px auto 0;
`;


function CustomSlides({ cardList }) {
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
      <Slider {...settings}>
        {cardList && cardList.length > 0 ? (
          cardList.map((card, index) => (
            <CardSlider key={index} image={card.image} name={card.name} />
          ))
        ) : (
          <CardSlider image={CardDemoImage} name={"No cards available"} />
        )}
      </Slider>
    </SliderContainer>
  );
}

export default CustomSlides;
