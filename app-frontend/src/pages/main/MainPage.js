// import { ReactComponent as HandsClapping } from "../assets/images/HandsClapping.svg";
// import CustomButton from "../common/CommonButton";
import React, { useState } from 'react';
import styled from 'styled-components';
import CommonRoot from '../../common/CommonRoot';
import MainBox from './MainBox';
import MainCardBox from './MainCardBox';
import MainIntro from './MainIntro';
// import {SignUp} from "./auth/SignUp";

const StyledWrap = styled.div`
  width: 1200px;
`;

export function MainPage() {
  const [isLoggedIn] = useState(false);

  return (
    <CommonRoot>
      <StyledWrap>
        <MainIntro />
        <MainBox />
        <MainCardBox isLoggedIn={isLoggedIn} />
      </StyledWrap>
    </CommonRoot>
  );
}
