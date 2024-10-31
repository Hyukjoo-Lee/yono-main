import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import styled from "styled-components";

const TabsStyle = styled(Tabs)`
& .MuiTabs-indicator {
  height: 1px;
  background-color: #4064e6;
}
`;

const TabStyle = styled(Tab)`
  &.MuiButtonBase-root {
    color:#000000;
    font-size:18px;
    padding:0px 25px 10px 25px;
    min-width:117px;
    font-weight:black;

    &.Mui-selected {
      color:#4064e6
    }
  }
`;

const CommonTabs = ({items}) =>{
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabsStyle value={value} onChange={handleChange}>
        {items.map((item, index) => (
          <TabStyle key={index} label={item.text} disableRipple/>
        ))}
    </TabsStyle>
  );
}
export default CommonTabs;