import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
`;
const RootIn = styled.div`
  width: 855px;
  padding: 49px 0;
  box-sizing: border-box;
  margin: 0 auto;
`;

const BoxIn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextStyle = styled.div`
  margin: 0px;
  font-size: 16px;
  color: #000;
`;

const CallText = styled(TextStyle)`
  font-size: 20px;
`;

const ListItems = styled.ul`
  margin: 20px 0px 0px;
  list-style: none;
  padding: 0px;
  display: flex;
  justify-content: center;
  & li {
    font-size: 16px;
    color: #000;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

const LineStyle = styled(TextStyle)`
  margin: 0px 8px;
`;

const Footer = () => {
  const list = [
    { label: "회사소개" },
    { label: "이용약관" },
    { label: "연락하기" },
    { label: "피드백연락" },
    { label: "프로젝트설명" },
  ];

  return (
    <FooterStyle>
      <RootIn>
        <BoxIn>
          <CallText>고객센터 070 - 7777 - 7777</CallText>
          <TextStyle>
            주소 서울시 종로구 돈화문로 26 단성사빌딩 4층
            &nbsp;&nbsp;&nbsp;영업시간 9:00 - 18:00
          </TextStyle>
        </BoxIn>
        <ListItems>
          {list.map((item, index) => (
            <li key={index}>
              <TextStyle>{item.label}</TextStyle>
              {index !== list.length - 1 && <LineStyle>|</LineStyle>}
            </li>
          ))}
        </ListItems>
      </RootIn>
    </FooterStyle>
  );
};

export default Footer;
