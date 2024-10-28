import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 10px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #464646;
  text-decoration: none;
  font-size: 12px;
  font-weight: regular;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    background-color: transparent;
    color: #0056b3;
  }

  &:active {
    background-color: transparent;
  }
`;
const LineStyle = styled.p`
  margin: 0px 8px;
  font-size: 12px;
  color: #464646;
`;

export function SubHeader() {
  const list = [
    { label: "로그인", path: "/login" },
    { label: "회원가입", path: "/signup" },
    { label: "마이페이지", path: "/mypage" },
    { label: "아이디찾기", path: "/find-id" },
    { label: "비밀번호찾기", path: "/find-pwd" },
  ];

  return (
    <Nav>
      {list.map((item, index) => (
        <StyledLink to={item.path} key={index}>
          {item.label}
          {index !== list.length - 1 && <LineStyle>|</LineStyle>}
        </StyledLink>
      ))}
    </Nav>
  );
}
