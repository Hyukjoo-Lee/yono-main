import React from 'react';

const IconButton = ({ imagesRoute }) => {
  return (
    <img
      src={imagesRoute}
      alt="사진"
      style={{
        background: 'white',
        width: '30px',
      }}
    />
  );
};
export default IconButton;
