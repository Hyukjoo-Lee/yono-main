import React, { useState } from 'react';
import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CustomButton from '../../common/CommonButton';
import or from '../../assets/images/or.png';
import kakao from '../../assets/images/kakao.png';
import google from '../../assets/images/google.png';
import IconButton from './Component/IconButton';
import CommonRoot from '../../common/CommonRoot';
import { Link } from 'react-router-dom';
import CommonPageInfo from '../../common/CommonPageInfo';
import SuccessLogin from './SuccessLogin';
import CommonHr from '../../common/CommonHr';
import {
  PASSWORD_VERIFIED_ERROR,
  USERID_VERIFIED_ERROR,
} from './Component/Message';

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

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`;

export function Login(props) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successVisible, setSuccessVisible] = useState(false);

  const dummyUser = {
    username: 'user',
    password: 'password',
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const validateForm = () => {
    const { username, password } = formData;
    const newErrors = {};

    if (!username) newErrors.username = '아이디를 입력하세요.';
    if (!password) newErrors.password = '비밀번호를 입력하세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    if (formData.username !== dummyUser.username) {
      setErrors({ username: USERID_VERIFIED_ERROR });
      return;
    }

    if (formData.password !== dummyUser.password) {
      setErrors({ password: PASSWORD_VERIFIED_ERROR });
      return;
    }

    setSuccessVisible(true);
  };

  const list = [
    { label: '아이디찾기', path: '/find-id' },
    { label: '비밀번호찾기', path: '/find-pwd' },
  ];

  const inputProps = {
    background: '#FFFFFF',
    color: '#464646',
    $borderColor: 'transparent',
    $focusBorderColor: 'transparent',
    width: '300px',
    height: '35px',
    $marginLeft: '7px',
  };

  return (
    <CommonRoot>
      <RootIn>
        <HighContainer>
          <CommonPageInfo title="로그인" text={<p></p>} />

          <CommonInput
            text="아이디"
            placeholder="아이디를 입력하세요"
            value={formData.username}
            onChange={handleChange('username')}
            {...inputProps}
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          <CommonHr />

          <CommonInput
            text="비밀번호"
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            {...inputProps}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <CommonHr />
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
            onClick={handleLogin}
          />

          <img src={or} alt="Or" width="63%" />
          <IconButtonContainer>
            <IconButton imagesRoute={kakao} />
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
