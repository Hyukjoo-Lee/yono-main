import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #f8f9fa;
  margin-top: 10px;
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

  &:hover {
    background-color: #e9ecef;
    color: #0056b3;
  }

  &:active {
    background-color: #dee2e6;
  }
`;

export function MainHeader() {
  return (
    <Nav>
      <StyledLink to="/intro">미클머클</StyledLink>
      <StyledLink to="/card-challege">카드챌린지</StyledLink>
      <StyledLink to="/card-analysis">소비패턴분석</StyledLink>
      <StyledLink to="/community">커뮤니티</StyledLink>
      <StyledLink to="/mycard">마이카드</StyledLink>
    </Nav>
  );
}
