import React from 'react';
import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CustomButton from '../../common/CommonButton';
import or from '../../assets/images/or.png';
import kakaO from '../../assets/images/kakao.png';
import google from '../../assets/images/google.png';
import IconButton from './Component/IconButton'; // IButton을 정확히 import
import CommonRoot from '../../common/CommonRoot';
import { Link } from 'react-router-dom';
import CommonPageInfo from '../../common/CommonPageInfo';
import { useState } from 'react';
import {
  EMAIL_VERIFIED_ERROR,
  PASSWORD_VERIFIED_ERROR,
} from '../auth/Component/ErrorMessage';
import SuccessLogin from './SuccessLogin';

const RootIn = styled.div`
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
const HiddenBox = styled.div`
  display: flex;
  margin-left: 28%;
  margin-bottom: 2%;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`;
// 더미 데이터 (아이디와 비밀번호)

export function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [IDerrorMessage, setIDerrorMessage] = useState('');
  const [PWerrorMessage, setPWerrorMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);

  const dummyUser = {
    username: 'user', // 아이디
    password: 'password', // 비밀번호
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (username === dummyUser.username && password === dummyUser.password) {
      setIDerrorMessage('');
      setSuccessVisible(true);
    } else if (username === dummyUser.username) {
      setPWerrorMessage(PASSWORD_VERIFIED_ERROR);
      setSuccessVisible(false);
    } else if (password === dummyUser.password) {
      setIDerrorMessage(EMAIL_VERIFIED_ERROR);
      setSuccessVisible(false);
    } else {
      setIDerrorMessage('아이디,비밀번호를 입력하세요');
    }
  };

  const list = [
    { label: '아이디찾기', path: '/find-id' },
    { label: '비밀번호찾기', path: '/find-pwd' },
  ];
  const inputProps = {
    background: '#FFFFFF',
    color: '#464646',
    width: '300px',
    height: '35px',
  };

  return (
    <CommonRoot>
      <RootIn>
        <HighContainer>
          <CommonPageInfo title="로그인" text={<p></p>} />

          <CommonInput
            text="아이디"
            value={username}
            onChange={handleUsernameChange}
            {...inputProps}
          />
          <CommonInput
            text="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            {...inputProps}
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
          <HiddenBox>
            {IDerrorMessage && <ErrorMessage>{IDerrorMessage}</ErrorMessage>}

            {PWerrorMessage && !IDerrorMessage && (
              <ErrorMessage>{PWerrorMessage}</ErrorMessage>
            )}
          </HiddenBox>

          <CustomButton
            text="로그인"
            width="300px"
            height="35px"
            background="#4064E6"
            color="#ffffff"
            fontSize="20"
            onClick={handleLogin}
          />

          <img
            src={or} // import한 이미지 경로 사용
            alt="Or"
            width="63%"
          />
          <IconButtonContainer>
            <IconButton imagesRoute={kakaO} />
            <IconButton imagesRoute={google} />
          </IconButtonContainer>
        </LowContainer>
        <SuccessLogin
          open={successVisible}
          setSuccessVisible={setSuccessVisible}
        />
      </RootIn>
    </CommonRoot>
  );
}
