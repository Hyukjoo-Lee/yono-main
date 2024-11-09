import React from "react";
import styled from "styled-components";



const IconButton=({imgesRoute})=>{
    return(
    <img
    src={imgesRoute}
    alt="이미지 버튼"
    style={{
        background:'white'
    }}
    />
);
};
export default IconButton;