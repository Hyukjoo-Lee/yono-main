import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
  width: ${(props) => (props.width ? props.width : '244px')};
  height: ${(props) => (props.height ? props.height : '38px')};
  background-color: ${(props) =>
    props.$background ? props.$background : '#F8F9FE'};
  border: 1px solid ${(props) => props.$borderColor || '#D7D7D7'};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '5px'};
  cursor: pointer;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: ${(props) => props.fontSize || '16px'};

  &::placeholder {
    font-size: ${(props) => props.placeholderFontSize || '16px'};
    color: #b0b0b0;
  }
  &:focus {
    border: 1px solid ${(props) => props.$focusBorderColor || '#1976D2'};
    outline: none;
  }
  &:hover {
    & p {
      color: ${(props) =>
        props.hoverColor ? props.hoverColor : props.theme.color.white};
    }
  }
  &:focus {
    border: 1px solid ${(props) => props.$focusBorderColor || '#1976D2'};
    outline: none;
  }
`;

const TextStyle = styled.p`
  font-size: ${(props) => props.TextFontSize || '16px'};
  color: ${(props) => (props.color ? props.color : props.theme.color.white)};
  margin-bottom: 6px;
  margin-top: 0px;
  margin-left: ${(props) => (props.$marginLeft ? props.$marginLeft : '0px')};
`;

const CommonInput = (props) => {
  const {
    placeholder,
    placeholderFontSize,
    text,
    type = 'text',
    width,
    height,
    background,
    color = '#4A4A4A',
    $borderColor,
    $focusBorderColor,
    borderRadius,
    fontSize,
    TextFontSize,
    disabled,
    hoverBk,
    hoverColor,
    value,
    onChange,
    $marginLeft,
    readOnly,
  } = props;

  return (
    <div>
      <TextStyle
        color={color}
        TextFontSize={TextFontSize}
        $marginLeft={$marginLeft}
      >
        {text}
      </TextStyle>

      <InputStyle
        placeholder={placeholder}
        placeholderFontSize={placeholderFontSize}
        type={type}
        width={width}
        height={height}
        $background={background}
        $borderColor={$borderColor}
        $focusBorderColor={$focusBorderColor}
        borderRadius={borderRadius}
        fontSize={fontSize}
        hoverBk={hoverBk}
        hoverColor={hoverColor}
        disabled={disabled}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};
export default CommonInput;
