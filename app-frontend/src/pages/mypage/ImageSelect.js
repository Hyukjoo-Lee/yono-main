import React, { useState } from "react";
import styled from "styled-components";
import checkIcon from "../../assets/images/checkIcon.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 0px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover {
    border-color: #4064e6;
  }
`;

const CheckIcon = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
`;

const LargeImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 1px solid #d7d7d7;
`;

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Container>
      <LargeImage src={selectedImage} alt="Selected" />

      <ThumbnailContainer>
        {images.map((image, index) => (
          <ThumbnailWrapper key={index}>
            <Thumbnail
              src={image}
              alt={`Thumbnail ${index + 1}`}
              isSelected={image === selectedImage}
              onClick={() => handleThumbnailClick(image)}
            />
            {image === selectedImage && <CheckIcon src={checkIcon} alt="Check" />}
          </ThumbnailWrapper>
        ))}
      </ThumbnailContainer>
    </Container>
  );
};

export default ImageGallery;
