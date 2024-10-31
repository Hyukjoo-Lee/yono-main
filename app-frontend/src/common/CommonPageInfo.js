import React from "react";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  & > p:last-child {
    margin: 8px 0px 20px;
    font-size: 16px;
    color: #757575;
    line-height: 24px;
    text-align: center;
  }
`;
const TitleStyle = styled.p`
  margin: 0px;
  font-size: ${(props) => props.theme.fontSize.xl};
  color: #212121;
  text-align: center;
  font-weight: bold;
`;

const CommonPageInfo = ({ title, text }) => {
  return (
    <Root>
      <TitleStyle>{title}</TitleStyle>
      {text}
    </Root>
  );
};
export default CommonPageInfo;
