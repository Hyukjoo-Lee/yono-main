import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/images/MickleMuckleLogo.svg";

const Nav = styled.nav`
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 0 16px;

  &:hover {
    background-color: transparent;
    color: #0056b3;
  }

  &:active {
    background-color: transparent;
  }

  &:last-child {
    padding-right: 0px;
  }
`;

export function MainHeader() {
  const menuList = [
    { label: "미클머클", path: "/intro" },
    { label: "카드챌린지", path: "/card-challege" },
    { label: "소비패턴분석", path: "/card-analysis" },
    { label: "커뮤니티", path: "/community" },
    { label: "마이카드", path: "/mycard" },
  ];

  return (
    <Nav>
      <Logo />
      <MenuBox>
        {menuList.map((item, index) => (
          <StyledLink to={item.path} key={index}>
            {item.label}
          </StyledLink>
        ))}
      </MenuBox>
    </Nav>
  );
}
