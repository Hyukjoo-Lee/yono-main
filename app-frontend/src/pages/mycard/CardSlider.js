import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardDemoImage from "../../assets/images/card_demo.png";

function CardSlider(props) {
  const { image, altText } = props;
  return (
    <div className="slide" style={{display: "flex", alignContent: "center", justifyContent: "center"}}>
      <img
        src={image}
        alt={altText}
        style={{ width: "280px", height: "180px", borderRadius: "8px" }}
      />
    </div>
  );
}

function CustomSlides() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="slider-container"
      style={{ width: "80%", margin: "0 auto", marginTop: "45px" }}
    >
      <Slider {...settings}>
        <CardSlider image={CardDemoImage} altText="Card 1" /> 
        <CardSlider image={CardDemoImage} altText="Card 2" />
        <CardSlider image={CardDemoImage} altText="Card 3" />
        <CardSlider image={CardDemoImage} altText="Card 4" />
      </Slider>
    </div>
  );
}

export default CustomSlides;
