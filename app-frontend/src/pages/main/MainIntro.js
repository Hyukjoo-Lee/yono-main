import React from 'react';
import styled from 'styled-components';
import Main_img from '../../assets/images/main_img.png';

const StyledMainIntro = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 400px;
  background-color: #eff3fd;
  border-radius: 7px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.2);
  padding: 0px 60px;
`;

const StyledTitle = styled.p`
  font-size: 38px;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

const StyledSubTitle = styled.p`
  font-size: 20px;
  font-weight: 200;
  padding: 15px 0px;
  padding: 0;

  & span {
    color: 'red';
  }
`;

const StyledMainImg = styled.div`
  font-size: 30px;
  & img {
    width: 100%;
    padding-top: 25px;
  }
`;

const StyledTextCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const StyledButton = styled.div`
  width: 162px;
  height: 48px;
  background-color: #2357a2;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const StyledButtonA = styled.a`
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainIntro = () => {
  return (
    <StyledMainIntro>
      <StyledTextCon>
        <StyledTitle>YONO New Launching</StyledTitle>
        <StyledSubTitle>
          <span>YONO 2025, 새로운 시작!</span>
          <br />
          지혜로운 소비로 더 나은 미래를 준비하세요.
          <br />
          챌린지를 통해 뱃지를 획득하고, 절약을 재미있게 즐겨보세요.
        </StyledSubTitle>
        <StyledButton>
          <StyledButtonA href="/intro">더 알아보기</StyledButtonA>
        </StyledButton>
      </StyledTextCon>
      <StyledMainImg>
        <img src={Main_img} alt="메인사진" />
      </StyledMainImg>
    </StyledMainIntro>
  );
};

export default MainIntro;
