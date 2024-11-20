import React from 'react';
import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CustomButton from '../../common/CommonButton';
import image from './images/or.png';
import kakaoimage from './images/kakao.png';
import google from './images/google.png';
import IconButton from './Component/IconButton'; // IButton을 정확히 import
import CommonRoot from '../../common/CommonRoot';
import { Link } from 'react-router-dom';

const Rootin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const HighContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-size: 36px;
  color: #4064e6;
  font-weight: bold;
`;
const MiddleContainer = styled.div`
  margin-top: 10px;
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const FindBox = styled.div`
  display: flex;
  flex-direction: flex-end;
  justify-content: space-between;
`;
const StyledLink = styled(Link)`
  color: #464646;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    background-color: transparent;
    color: #4064e6;
  }
  &:active {
    background-color: transparent;
  }
`;

const LineStyle = styled.p`
  margin: 0px 10px;
  font-size: 13px;
  color: #464646;
`;
const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: -30px;
`;
const Label = styled.label`
  font-size: 13px;
  color: #464646;
`;
const LowContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const IconButtonContainer = styled.div`
  margin-top: 10px;
  width: 80px;
  display: flex;
  flex-direction: flex-end;
  justify-content: space-between;
`;

export function Login() {
  const list = [
    { label: '아이디찾기', path: '/find-id' },
    { label: '비밀번호찾기', path: '/find-pwd' },
  ];

  return (
    <CommonRoot>
      <Rootin>
        <HighContainer>
          <CommonPageInfo title="로그인" text={<p></p>} />

          <CommonInput
            text="아이디"
            background="#FFFFFF"
            fontSize="16px"
            color="#464646"
            width="300px"
            height="35px"
          />
          <CommonInput
            text="비밀번호"
            background="#FFFFFF"
            fontSize="16px"
            color="#464646"
            width="300px"
            height="35px"
          />
        </HighContainer>

        <MiddleContainer>
          <StyledCheckbox id="saveId" />
          <Label htmlFor="saveId">아이디저장</Label>

          <FindBox>
            {list.map((item, index) => (
              <StyledLink to={item.path} key={index}>
                {item.label}
                {index !== list.length - 1 && <LineStyle>|</LineStyle>}
              </StyledLink>
            ))}
          </FindBox>
        </MiddleContainer>

        <LowContainer>
          <CustomButton
            text="로그인"
            width="300px"
            height="35px"
            background="#4064E6"
            color="#ffffff"
            fontSize="20"
          />

          <img
            src={image} // import한 이미지 경로 사용
            alt="Or"
            width="63%"
          />

          <IconButtonContainer>
            <IconButton imgesRoute={kakaoimage} />
            <IconButton imgesRoute={google} />
          </IconButtonContainer>
        </LowContainer>
      </Rootin>
    </CommonRoot>
  );
}
