import React from 'react';
import styled from 'styled-components';

const StyledInfoWrap = styled.div`
  margin-bottom: 37px;
`;
const StyledTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 0px 0px 0px 16px;
`;
const StyledTitleSub = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #757575;
  line-height: 150%;
  margin: 0px 0px 0px 66px;
`;
const StyledIconBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: #eff3fd;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledBox = styled.div`
  display: flex;
`;

const StyledIcon = styled.img``;

const IntroInfo = ({ title, subtitle, img, onClick }) => {
  return (
    <StyledInfoWrap className="info_wrap">
      <StyledBox className="box">
        <StyledIconBox className="icon_box" onClick={onClick}>
          <StyledIcon src={img} alt="아이콘" />
        </StyledIconBox>
        <StyledTitle className="title">{title}</StyledTitle>
      </StyledBox>
      <StyledTitleSub className="title_sub">{subtitle}</StyledTitleSub>
    </StyledInfoWrap>
  );
};

export default IntroInfo;
