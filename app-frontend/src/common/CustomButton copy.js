import React from "react";
import styled from "styled-components";
import { ButtonStyle, TextStyle } from "./CustomButtonStyle";

function CustomButton(props) {
  const {
    text,
    width,
    height,
    background,
    color,
    borderColor,
    borderRadius,
    fontSize,
    disabled,
    onClick,
    hoverBk,
    hoverColor,
  } = props;

  return (
    <ButtonStyle
      width={width}
      height={height}
      background={background}
      borderColor={borderColor}
      borderRadius={borderRadius}
      hoverBk={hoverBk}
      hoverColor={hoverColor}
      onClick={onClick}
      disabled={disabled}
    >
      <TextStyle color={color} fontSize={fontSize}>
        {text}
      </TextStyle>
    </ButtonStyle>
  );
}

export default CustomButton;
