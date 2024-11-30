import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const ButtonStyle = styled(Button)`
  &.MuiButtonBase-root {
    min-width: ${(props) => props.width || '64px'};
    height: ${(props) => props.height || '48px'};
    background-color: ${(props) =>
      props.background ? props.background : props.theme.color.blue};
    border: ${(props) =>
      props.borderColor ? `1px solid ${props.borderColor}` : '0px'};
    border-radius: ${(props) => props.borderRadius || '6px'};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    box-sizing: border-box;
    &:hover {
      background: ${(props) => props.hoverBk || props.theme.color.blue};
      & p {
        color: ${(props) => props.hoverColor || props.theme.color.white};
      }
    }
  }
`;

const TextStyle = styled.p`
  font-size: ${(props) => props.fontSize || props.theme.fontSize.base};
  color: ${(props) => props.color || props.theme.color.white};
  margin: 0px;
  line-height: 22px;
  padding: 0 8px;
  text-transform: none;
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
    type,
  } = props;

  return (
    <ButtonStyle
      width={width}
      height={height}
      background={background}
      borderCe={borderColor}
      radius={borderRadius}
      hover1={hoverBk}
      hover2={hoverColor}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      disableRipple
      type={type}
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
