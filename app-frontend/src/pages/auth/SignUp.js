import React, { useState } from 'react';
import styled from 'styled-components';
import CommonRoot from '../../common/CommonRoot';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonPageInfo from '../../common/CommonPageInfo';
import SuccessSignUp from './SuccessSignUp';
import FailSignUp from './SuccessSignUp';

import axios from 'axios';

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiddleContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MiddleTitle = styled.div`
  font-size: 16px;
  color: #757575;
  margin-left: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  margin-left: 5px;
`;

const ValidMessage = styled.div`
  color: blue;
  font-size: 13px;
  margin-left: 5px;
`;

const ContainerProps = {
  marginBottom: '13px',
};

const InputProps = {
  width: '350px',
  $borderColor: 'transparent',
  background: 'transparent',
  $focusBorderColor: 'transparent',
  $marginLeft: '7px',
};

const InputEmailBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 350px;

  & > *:not(:last-child) {
    margin-right: -95px; /* 오른쪽 마진 */
  }
`;

const ButtonProps = {
  width: '73px',
  height: '37px',
  background: '#F5F5F5',
  text: '확인',
  color: '#757575',
};

export function SignUp() {
  const [isSignUpSuccessVisible, setIsSignUpSuccessVisible] = useState(false);
  const [isSignUpFailVisible, setIsSignUpFailVisible] = useState(false);
  const [isEmailValidated, setIsEmailValidated] = useState(false);

  const inputRegexs = {
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[*@#$%^&+=!]).{8,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    address: 'temp_address',
  });

  const [alertMessage, setAlertMessage] = useState({
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
  });

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!inputRegexs.email.test(formData.email)) {
      errors.email =
        '올바른 이메일 형식으로 입력해주세요. 예: example@domain.com';
    }

    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (!inputRegexs.password.test(formData.password)) {
      errors.password =
        '비밀번호는 소문자, 숫자, 특수문자(@#$%^&+=!)를 포함해 8자 이상으로 입력해주세요.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.name) {
      errors.name = '이름을 입력해주세요.';
    }

    return errors;
  };

  const validateEmail = async () => {
    // 이메일 형식 체크
    if (!formData.email) {
      setAlertMessage({
        ...alertMessage,
        email: '이메일을 입력해주세요.',
      });
      setIsEmailValidated(false);
      return;
    } else if (!inputRegexs.email.test(formData.email)) {
      setAlertMessage({
        ...alertMessage,
        email: '올바른 이메일 형식으로 입력해주세요. 예: example@domain.com.',
      });
      setIsEmailValidated(false);
      return;
    }

    // 이메일 중복 체크
    try {
      const response = await axios.post('/user/check-email-exists', {
        email: formData.email,
      });

      if (response.data.emailAvailable) {
        setAlertMessage({
          ...alertMessage,
          email: '사용 가능한 이메일입니다.',
        });
        setIsEmailValidated(true);
      } else {
        setAlertMessage({
          ...alertMessage,
          email: '이미 등록된 이메일입니다.',
        });
        setIsEmailValidated(false);
      }
    } catch (error) {
      console.error('중복 확인 실패:', error);
      setAlertMessage({
        ...alertMessage,
        email: '서버와의 통신 중 문제가 발생했습니다.',
      });
      setIsEmailValidated(false);
    }
  };

  /**
   * 중복 확인 버튼을 누르면 유효성 검사 후 중복체크
   * 회원 가입 버튼을 누르면 중복 확인이 되었는지 검사 후
   * 회원 가입 요청
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setAlertMessage(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (!isEmailValidated) {
      setAlertMessage({
        ...alertMessage,
        email: '이메일 중복 확인을 해주세요.',
      });
      return;
    }

    // 회원가입 요청
    try {
      const response = await axios.post('/user/signup', formData);
      console.log('회원가입 성공:', response.data);
      setIsSignUpSuccessVisible(true);
    } catch (error) {
      console.error('회원가입 실패:', error);
      setIsSignUpFailVisible(true);
    }
  };

  const renderInputField = (field, placeholder, text, type) => (
    <>
      <CommonInput
        placeholder={placeholder}
        text={text}
        type={type}
        onChange={(e) => handleInputChange(e, field)}
        {...InputProps}
      />
      {alertMessage[field] && (
        <ErrorMessage>{alertMessage[field]}</ErrorMessage>
      )}
      <CommonHr />
      <div style={ContainerProps} />
    </>
  );

  return (
    <CommonRoot>
      <FullContainer>
        <MiddleContainer>
          <CommonPageInfo title="회원가입" text={<p></p>} />
          <MiddleTitle>회원정보입력</MiddleTitle>
          <CommonHr />
          <div style={ContainerProps} />
          <InputEmailBox>
            <CommonInput
              placeholder="아이디(이메일)를 입력하세요."
              text="아이디"
              onChange={(e) => handleInputChange(e, 'email')}
              {...InputProps}
            />
            <CommonButton
              {...ButtonProps}
              text="중복확인"
              width="100px"
              onClick={validateEmail}
            />
          </InputEmailBox>
          {alertMessage.email ? (
            <ErrorMessage>{alertMessage.email}</ErrorMessage>
          ) : (
            <ValidMessage>{alertMessage.email}</ValidMessage>
          )}
          <CommonHr />
          {renderInputField(
            'password',
            '비밀번호를 입력하세요',
            '비밀번호',
            // 'password',
          )}
          {renderInputField(
            'confirmPassword',
            '비밀번호를 입력하세요',
            '비밀번호 확인',
          )}
          {renderInputField('name', '이름을 입력하세요', '이름')}
        </MiddleContainer>

        <div style={{ marginTop: '20px' }}>
          <CommonButton
            {...ButtonProps}
            text="회원가입"
            onClick={handleSubmit}
          />
        </div>

        <SuccessSignUp
          open={isSignUpSuccessVisible}
          setSuccessVisible={setIsSignUpSuccessVisible}
        />
        <FailSignUp
          open={isSignUpFailVisible}
          setSuccessVisible={setIsSignUpFailVisible}
        />
      </FullContainer>
    </CommonRoot>
  );
}
