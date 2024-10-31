import React, { useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  width: ${(props) => props.width || "211px"};
  height: ${(props) => props.height || "38px"};
  background-color: ${(props) => props.background || "#F8F9FE"};
  color: ${(props) => props.color || "#b0b0b0"} !important;
  border-radius: ${(props) => props.borderRadius || "5px"} !important;
  font-size: ${(props) => props.fontSize || "16px"} !important;

  &.MuiOutlinedInput-root {
    & fieldset {
      border-color: ${(props) => props.fieldBorderColor || "#D7D7D7"};
    }

    &:hover fieldset {
      border-color: ${(props) => props.fieldHoverBorderColor || "#D7D7D7"};
    }
  }
`;

const TextStyle = styled.p`
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "16px"};
  color: ${(props) => (props.color ? props.color : props.theme.color.white)};
  margin-bottom: 6px;
  margin-top: 0px;
`;


const CommonSelect = ({
  text,
  height,
  options = [],
  width,
  background,
  color,
  labelColor,
  borderRadius,
  hoverBackground,
  fontSize,
  fieldBorderColor,
  fieldHoverBorderColor,
  fieldFocusedBorderColor,
  onSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onSelect) onSelect(event.target.value);
  };

  return (
    <Box 
      sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl variant="outlined">
      <TextStyle color={labelColor} fontSize={fontSize}>
        {text}
      </TextStyle>

        <StyledSelect
          value={selectedValue === "" ? "default" : selectedValue}
          onChange={handleChange}
          width={width}
          height={height}
          background={background}
          fontSize={fontSize}
          fieldBorderColor={fieldBorderColor}
          fieldHoverBorderColor={fieldHoverBorderColor}
          fieldFocusedBorderColor={fieldFocusedBorderColor}
          color={color}
          borderRadius={borderRadius}
          hoverBackground={hoverBackground}
        >
          {selectedValue === "" && (
            <MenuItem value="default" disabled>
              카드를 선택하세요
            </MenuItem>
          )}
          {options.map((option, index) => (
            <MenuItem 
              key={index} 
              value={option.value} 
              sx={{ fontSize: fontSize,
              }}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

export default CommonSelect;