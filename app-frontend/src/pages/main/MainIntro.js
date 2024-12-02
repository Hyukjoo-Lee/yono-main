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
  font-size: 22px;
  font-weight: 200;
  padding: 15px 0px;
  margin: 0;
  padding: 0;
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
        <StyledTitle>Mickle Muckle Launching</StyledTitle>
        <StyledSubTitle>
          미클머클이 2024년 새롭게 출시 되었습니다!
          <br />
          미클머클과 함께 절약 해서 부자 되세요
          <br />
          챌린지로 뱃지 받고 절약을 재밌게 하세요(멘트바꿀예정)
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
