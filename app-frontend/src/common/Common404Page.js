import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ErrorImage } from '../assets/images/ErrorImage.svg';
import errorBack from '../assets/images/404.png';
import { Link } from 'react-router-dom';

const Root = styled.div`
  width: 100%;
  height: calc(100vh - 85px);
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  padding-bottom: ${(props) => props.theme.contentsPaddingBottom};
  background: ${(props) => props.theme.color.lightBlue};
`;

const RootIn = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${errorBack});
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  & > svg {
    width: 350px;
    height: auto;
  }
`;

const NumberText = styled.p`
  margin: 0;
  font-size: 3.75rem;
  font-weight: bold;
`;

const TextStyle = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: 600;
`;

const SmallStyle = styled.p`
  margin: 6px 0 60px;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.color.lightGray};
  & a {
    color: ${(props) => props.theme.color.blue};
    font-weight: bold;
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <Root>
      <RootIn>
        <ErrorImage />
        <NumberText>404</NumberText>
        <TextStyle>Ooops! page not found</TextStyle>
        <SmallStyle>
          there's nothing to see here <Link to="/">go back</Link>
        </SmallStyle>
      </RootIn>
    </Root>
  );
};

export default Footer;
