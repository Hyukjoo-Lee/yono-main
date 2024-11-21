import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  & > p:last-child {
    margin: 20px 0px 30px;
    font-size: ${(props) => props.theme.fontSize.base};
    color: ${(props) => props.theme.color.lightGray};
    line-height: 24px;
    text-align: center;
  }
`;
const TitleStyle = styled.p`
  margin: 20px 0px 0;
  font-size: ${(props) => props.theme.fontSize.xl};
  color: ${(props) => props.theme.color.black};
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
