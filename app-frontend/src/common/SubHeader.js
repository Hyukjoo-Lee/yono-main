import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #f8f9fa;
  padding: 10px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 5px;

  &:hover {
    background-color: #e9ecef;
    color: #0056b3;
  }

  &:active {
    background-color: #dee2e6;
  }
`;

export function SubHeader() {
  return (
    <Nav>
      <StyledLink to="/login">로그인</StyledLink>
      <StyledLink to="/signup">회원가입</StyledLink>
      <StyledLink to="/mypage">마이페이지</StyledLink>
      <StyledLink to="/find-id">아이디찾기</StyledLink>
      <StyledLink to="/find-pwd">비밀번호찾기</StyledLink>
    </Nav>
  );
}
