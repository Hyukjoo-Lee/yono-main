import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  width: 162px;
  height: 48px;
  background-color: #2357a2;
  border-radius: 50px;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px 0px 0px;
`;

const StyledBntTitle = styled.a`
  text-decoration: none;
  color: white;
  padding: 0;
`;

const MainButton = () => {
  return (
    <StyledButton>
      <StyledBntTitle href="#" class="button">
        더 알아보기
      </StyledBntTitle>
    </StyledButton>
  );
};

export default MainButton;
