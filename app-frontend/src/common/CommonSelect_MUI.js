import React, { useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  width: ${(props) => props.width || "211px"};
  height: ${(props) => props.height || "38px"};
  background-color: ${(props) => props.background || "#FFFFFF"};
  color: ${(props) => props.color || "#757575"} !important;
  border-radius: ${(props) => props.borderRadius || "5px"} !important;
  font-size: ${(props) => props.fontSize || "16px"} !important;

  &.MuiOutlinedInput-root {
    & fieldset {
      border-color: ${(props) => props.fieldBorderColor || "#D7D7D7"};
    }

    &:hover fieldset {
      border-color: ${(props) => props.fieldHoverBorderColor || "#D7D7D7"};
    }

    &.Mui-focused fieldset {
      border-color: ${(props) => props.fieldFocusedBorderColor || "#D7D7D7"};
      }
  }

  &:hover {
    background-color: ${(props) => props.hoverBackground || "#f0f0f0"};
  }
`;

const CommonSelect = ({
  label = "",
  height,
  options = [],
  width,
  background,
  color,
  borderRadius,
  hoverBackground,
  fontSize,
  fieldBorderColor,
  fieldHoverBorderColor,
  fieldFocusedBorderColor,
  optionHoverBackground = '#e0e0e0',
  selectedOptionBackground = "#d1d1d1",
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
        marginTop: 2 
      }}
    >
      <FormControl variant="outlined">
        <InputLabel>{label}</InputLabel>
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
                    '&:hover': { 
                    backgroundColor: optionHoverBackground
                  },
                  '&.Mui-selected': {
                  backgroundColor: selectedOptionBackground,
                  },
                  '&.Mui-selected:hover': {
                  backgroundColor: selectedOptionBackground,
                  }
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


/*
사용 예시)

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const handleSelect = (selectedValue) => {
  alert(`Selected value: ${selectedValue}`);
};



return 사용 예시)
<CommonSelect
  // options, onSelect 는 필수
  options={options}
  onSelect={handleSelect}

  // 외에 다른 props 는 설정하지 않을시 default
/>
*/