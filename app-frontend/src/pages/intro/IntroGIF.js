import React, { useState } from 'react';

const IntroGIF = ({ src, alt, duration }) => {
  const [gifSrc, setGifSrc] = useState(src);

  const restartGIF = () => {
    setGifSrc(`${src}?t=${new Date().getTime()}`);
  };

  return (
    <img
      src={gifSrc}
      alt={alt}
      onLoad={() => setTimeout(restartGIF, duration)}
    />
  );
};

export default IntroGIF;
