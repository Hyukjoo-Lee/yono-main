import React from "react";
import styled from "styled-components";

const SelectStyle = styled.select`
  width: ${(props) => (props.width ? props.width : "200px")};
  height: ${(props) => (props.height ? props.height : "40px")};
  background-color: ${(props) =>
    props.background ? props.background : props.theme.color.white};
  color: ${(props) => (props.color ? props.color : props.theme.color.black)};
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "1px solid #ccc"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "4px"};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : props.theme.fontSize.md};
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.hoverBk ? props.hoverBk : props.theme.color.lightGrey};
    color: ${(props) =>
      props.hoverColor ? props.hoverColor : props.theme.color.black};
  }
  &:disabled {
    background-color: #f2f2f2;
    cursor: not-allowed;
  }
`;

const CustomSelect = (props) => {
  const {
    options,
    width,
    height,
    background,
    color,
    borderColor,
    borderRadius,
    fontSize,
    disabled,
    onChange,
    hoverBk,
    hoverColor,
  } = props;

  return (
    <SelectStyle
      width={width}
      height={height}
      background={background}
      color={color}
      borderColor={borderColor}
      borderRadius={borderRadius}
      hoverBk={hoverBk}
      hoverColor={hoverColor}
      fontSize={fontSize}
      disabled={disabled}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={index}
                value={option.value}
                style={{
                    fontSize: fontSize || "16px",
                    color: color || "#000"
                }}>
          {option.label}
        </option>
      ))}
    </SelectStyle>
  );
}

export default CustomSelect;
