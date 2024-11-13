import React, { useState } from "react";
import styled from "styled-components";

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

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover {
    border-color: #4064E6;
  }
`;

const LargeImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 1px solid #d7d7d7;
`;

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // 첫 번째 이미지를 기본 선택

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Container>
      <LargeImage src={selectedImage} alt="Selected" />

      <ThumbnailContainer>
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </ThumbnailContainer>
    </Container>
  );
};

export default ImageGallery;
