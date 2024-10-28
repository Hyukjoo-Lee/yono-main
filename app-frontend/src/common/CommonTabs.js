import { Box, Tab, Tabs } from "@mui/material";
import styled from "styled-components";
import React from "react";

const StyledTabs = styled(Tabs)`
  & .MuiTab-root {
    font-size: 18px;
  }
`;


const CommonTabs = ({ labels, onTabChange, value }) => {
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", marginBottom: "20px"}}>
      <StyledTabs value={value} onChange={handleChange} centered>
        {labels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </StyledTabs>
    </Box>
  );
};

export default CommonTabs;
