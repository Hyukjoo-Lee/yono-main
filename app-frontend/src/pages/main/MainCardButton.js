import React from "react";
import styled from "styled-components";
import CardButtonImg from "../../assets/images/MainButton.svg";

const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const MainCardButton = () => {
  return(
    <StyledButton>
    <img src={CardButtonImg} alt="버튼" />
  </StyledButton>
  )
}

export default MainCardButton;