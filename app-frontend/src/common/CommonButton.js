import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  width: ${(props) => (props.width ? props.width : "162px")};
  height: ${(props) => (props.height ? props.height : "48px")};
  background-color: ${(props) =>
    props.background ? props.background : props.theme.color.blue};
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "0px"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "50px"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;
  &:hover {
    background: ${(props) =>
      props.hoverBk ? props.hoverBk : props.theme.color.blue};
    & p {
      color: ${(props) =>
        props.hoverColor ? props.hoverColor : props.theme.color.white};
    }
  }
`;

const TextStyle = styled.p`
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : props.theme.fontSize.md};
  color: ${(props) => (props.color ? props.color : props.theme.color.white)};
  margin: 0px;
  line-height: 22px;
  padding: 0 8px;
`;

const CustomButton = (props) => {
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
    startIcon,
    endIcon,
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
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {startIcon && startIcon}
      <TextStyle color={color} fontSize={fontSize}>
        {text}
      </TextStyle>
      {endIcon && endIcon}
    </ButtonStyle>
  );
};
export default CustomButton;
