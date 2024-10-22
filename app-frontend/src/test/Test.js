import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "../theme/Theme";

const ButtonStyle = styled.button`
  width: 162px;
  height: 48px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.blue};
  margin-top: 20px;
  border: 0px;
`;

const TextStyle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.white};
  font-weight: bold;
  margin: 0px;
  line-height: 22px;
`;

export default function Test() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ButtonStyle>
          <TextStyle>더 알아보기</TextStyle>
        </ButtonStyle>
      </ThemeProvider>
    </>
  );
}
