import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import styled from 'styled-components';

const StyledSelect = styled(Select).withConfig({
  shouldForwardProp: (prop) => prop !== 'isDefault',
})`
  &.MuiOutlinedInput-root {
    width: ${(props) => props.width || '218px'};
    height: ${(props) => props.height || '38px'};
    background-color: ${(props) => props.background || '#F8F9FE'};
    color: ${(props) => (props.isDefault ? '#b0b0b0' : '#000000')};
    border-radius: ${(props) => props.borderRadius || '5px'};
    font-size: ${(props) => props.fontSize || '16px'};

    & fieldset {
      border-color: ${(props) => props.fieldBorderColor || '#D7D7D7'};
      border-width: ${(props) => props.focusBorderWidth || '1px'};
      padding: 0px;
    }

    &:hover fieldset {
      border-color: ${(props) => props.fieldHoverBorderColor || '#D7D7D7'};
      border-width: ${(props) => props.focusBorderWidth || '1px'};
    }
  }

  &.MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-width: ${(props) => props.focusBorderWidth || '1px'};
    border-color: #1976d2;
  }

  & .MuiSelect-select {
    padding: 0 10px;
  }
`;

const TextStyle = styled.p`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  color: ${(props) => (props.color ? props.color : props.theme.color.white)};
  margin-bottom: 6px;
  margin-top: 0px;
  display: ${(props) => (props.display ? props.display : '')};
`;

const CommonSelect = ({
  text = '카드를 선택하세요',
  height,
  options = [],
  width,
  padding,
  background,
  color,
  labelColor,
  borderRadius,
  hoverBackground,
  fontSize,
  fieldBorderColor,
  focusBorderWidth,
  fieldHoverBorderColor,
  fieldFocusedBorderColor,
  display,
  onSelect,
  find = '카드를 선택하세요',
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onSelect) onSelect(event.target.value);
  };

  const isDefault = selectedValue === '';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormControl variant="outlined">
        <TextStyle color={labelColor} fontSize={fontSize} display={display}>
          {text}
        </TextStyle>

        <StyledSelect
          value={isDefault ? 'default' : selectedValue}
          onChange={handleChange}
          width={width}
          height={height}
          padding={padding}
          background={background}
          fontSize={fontSize}
          fieldBorderColor={fieldBorderColor}
          focusBorderWidth={focusBorderWidth}
          fieldHoverBorderColor={fieldHoverBorderColor}
          fieldFocusedBorderColor={fieldFocusedBorderColor}
          color={color}
          borderRadius={borderRadius}
          hoverBackground={hoverBackground}
          isDefault={isDefault}
          onSelect={onSelect}
        >
          {isDefault && (
            <MenuItem value="default" disabled>
              {find}
            </MenuItem>
          )}
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.value}
              sx={{ fontSize: fontSize }}
            >
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

export default CommonSelect;
