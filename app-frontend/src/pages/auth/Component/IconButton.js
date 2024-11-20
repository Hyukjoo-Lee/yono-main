import React from "react";

const IconButton = ({ imgesRoute }) => {
  return (
    <img
      src={imgesRoute}
      alt="사진"
      style={{
        background: "white",
        width: "30px"
      }}
    />
  );
};
export default IconButton;
