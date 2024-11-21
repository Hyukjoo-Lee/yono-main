import React from "react";
import styled from "styled-components";
import Main_img from "./main_img.png";
import MainButton from "./MainButton";

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
  width: 533px;
  height: 400px;
  overflow: hidden;
  font-size: 30px;
  & img {
    width: 100%;
  }
`;

const StyledTextCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
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
        <MainButton />
      </StyledTextCon>
      <StyledMainImg>
        <img src={Main_img} />
      </StyledMainImg>
    </StyledMainIntro>
  );
};

export default MainIntro;
