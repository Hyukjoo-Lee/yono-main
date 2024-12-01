import React, { useState } from 'react';
import styled from 'styled-components';
import checkIcon from '../../assets/images/checkIcon.svg';

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.$isSelected ? props.theme.color.blue : 'transparent')};
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
  margin-top: 5px;
`;

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <ThumbnailContainer>
      {images.map((image, index) => (
        <ThumbnailWrapper key={index}>
          <Thumbnail
            src={image}
            alt={`Thumbnail ${index + 1}`}
            $isSelected={image === selectedImage}
            onClick={() => handleThumbnailClick(image)}
          />
          {image === selectedImage && <CheckIcon src={checkIcon} alt="Check" />}
        </ThumbnailWrapper>
      ))}
    </ThumbnailContainer>
  );
};

export default ImageGallery;
