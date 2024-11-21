import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import styled from 'styled-components';

const TabsStyle = styled(Tabs)`
  & .MuiTabs-indicator {
    height: 1px;

    background-color: #4064e6;
  }
  & .MuiTabs-flexContainer {
    justify-content: center;
  }
`;

const TabStyle = styled(Tab)`
  &.MuiButtonBase-root {
    color: ${(props) => props.theme.color.black};
    font-size: 18px;
    padding: 0px 25px 10px 25px;
    min-width: 117px;
    font-weight: black;

    &.Mui-selected {
      color: #4064e6;
    }
  }
`;

const CommonTabs = ({ items, value, selectedTab }) => {
  const handleChange = (event, newValue) => {
    selectedTab(newValue);
  };

  return (
    <TabsStyle value={value} onChange={handleChange}>
      {items.map((item, index) => (
        <TabStyle key={index} label={item.text} disableRipple />
      ))}
    </TabsStyle>
  );
};
export default CommonTabs;
