
// import { ReactComponent as HandsClapping } from "../assets/images/HandsClapping.svg";
// import CustomButton from "../common/CommonButton";
import React from "react";
import styled from "styled-components";
import CommonRoot from "../../common/CommonRoot";
import MainBox from "./MainBox";
import MainIntro from "./MainIntro";
// import {SignUp} from "./auth/SignUp";

const StyledWrap = styled.div`
  width: 1200px;
`;

export function MainPage() {
  return (
    <CommonRoot>
      <StyledWrap>
        <MainIntro/>
        <MainBox/>
      </StyledWrap>
    </CommonRoot>
  );
}
