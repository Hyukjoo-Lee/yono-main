import React, { useState } from "react";
import styled from "styled-components";

const SelectStyle = styled.select`
  width: ${(props) => (props.width ? props.width : "211px")};
  height: ${(props) => (props.height ? props.height : "38px")};
  padding: 0 10px;
  background-color: ${(props) =>
    props.background ? props.background : "#F8F9FE"};
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "1px solid #D7D7D7"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "5px"};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};

  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.hoverBk ? props.hoverBk : props.theme.color.lightGrey};
    color: ${(props) => (props.hoverColor ? props.hoverColor : "#757575")};
  }
  &:disabled {
    background-color: #f2f2f2;
    cursor: not-allowed;
  }
`;

const TextStyle = styled.p`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  color: ${(props) => (props.color ? props.color : "#4A4A4A")};
  margin-bottom: 6px;
  margin-top: 0px;
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
    text,
  } = props;

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) onChange(event);
  };

  return (
    <div>
      <TextStyle color={color} fontSize={fontSize}>
        {text}
      </TextStyle>

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
        onChange={handleChange}
        value={selectedValue}
      >
        {/* TODO: default 값으로 (맨 처음 값으로 표기) 설정 */}
        <option disabled>
          카드를 선택하세요 
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            // TODO: input option text 색상 #757575 설정
            style={{
              fontSize: fontSize || "16px",
            }}
          >
            {option.label}
          </option>
        ))}
      </SelectStyle>
    </div>
  );
};

export default CustomSelect;
