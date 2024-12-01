import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
  width: 100%;
  background: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 30px 20px;
  border-top: 1px solid ${(props) => props.theme.color.brightGray};
`;

const TextStyle = styled.div`
  margin: 0px;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.color.darkGray};
`;

const Footer = () => {
  return (
    <FooterStyle>
      <TextStyle>© 2024 Mickle Muckle. All rights reserved.</TextStyle>
    </FooterStyle>
  );
};

export default Footer;


