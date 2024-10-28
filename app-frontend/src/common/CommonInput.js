import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  width: ${(props) => (props.width ? props.width : "211px")};
  height: ${(props) => (props.height ? props.height : "38px")};
  background-color: ${(props) =>
    props.background ? props.background : "#F8F9FE"};
  border: 1px solid ${(props) => props.borderColor || "#D7D7D7"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "5px"};
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    & p {
      color: ${(props) =>
        props.hoverColor ? props.hoverColor : props.theme.color.white};
    }
  }
`;

const TextStyle = styled.p`
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "16px"};
  color: ${(props) => (props.color ? props.color : props.theme.color.white)};
  margin-bottom: 6px;
`;

const CommonInput = (props) => {
  const {
    placeholder,
    text,
    type = "text",
    width,
    height,
    background,
    color = "#4A4A4A",
    borderColor,
    borderRadius,
    fontSize,
    disabled,
    hoverBk,
    hoverColor,
  } = props;

  return (
    <div>
      <TextStyle color={color} fontSize={fontSize}>
        {text}
      </TextStyle>

      <InputStyle
        placeholder={placeholder}
        type={type}
        width={width}
        height={height}
        background={background}
        borderColor={borderColor}
        borderRadius={borderRadius}
        hoverBk={hoverBk}
        hoverColor={hoverColor}
        disabled={disabled}
      />
    </div>
  );
};
export default CommonInput;
