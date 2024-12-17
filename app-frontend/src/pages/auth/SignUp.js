import React, { useState } from 'react';
import styled from 'styled-components';
import CommonRoot from '../../common/CommonRoot';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonPageInfo from '../../common/CommonPageInfo';
import SuccessSignUp from './SuccessSignUp';

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

const ButtonProps = {
  width: '73px',
  height: '37px',
  background: '#F5F5F5',
  text: '확인',
  color: '#757575',
};

export function SignUp() {
  const [isDialogPWVisible, setIsDialogPWVisible] = useState(false);

  const inputRegexs = {
    username: /^[a-zA-Z][a-zA-Z0-9]{2,19}$/,
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[*@#$%^&+=!]).{8,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
  });

  const [alertMessage, setAlertMessage] = useState({
    username: '',
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

    if (!formData.username) {
      errors.username = '아이디를 입력해주세요.';
    } else if (!inputRegexs.username.test(formData.username)) {
      errors.username =
        '사용자명은 영문자로 시작하고 영문자와 숫자로 이루어진 3자 이상 20자 이하로 입력해주세요.';
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

    if (!formData.email) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!inputRegexs.email.test(formData.email)) {
      errors.email =
        '올바른 이메일 형식으로 입력해주세요. 예: example@domain.com.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setAlertMessage(errors);

    if (Object.keys(errors).length === 0) {
      // 성공 처리
      setIsDialogPWVisible(true);
    }
  };

  const renderInputField = (field, placeholder, text) => (
    <>
      <CommonInput
        placeholder={placeholder}
        text={text}
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
          <CommonPageInfo title="회원가입" text="" />
          <MiddleTitle>회원정보입력</MiddleTitle>
          <CommonHr />
          {renderInputField('username', '아이디를 입력하세요', '아이디')}
          {renderInputField('password', '비밀번호를 입력하세요', '비밀번호')}
          {renderInputField(
            'confirmPassword',
            '비밀번호를 입력하세요',
            '비밀번호 확인',
          )}
          {renderInputField('name', '이름을 입력하세요', '이름')}
          {renderInputField('email', '이메일을 입력하세요', '이메일')}
        </MiddleContainer>

        <div style={{ marginTop: '20px' }}>
          <CommonButton
            {...ButtonProps}
            text="회원가입"
            onClick={handleSubmit}
          />
        </div>

        <SuccessSignUp
          open={isDialogPWVisible}
          setSuccessVisible={setIsDialogPWVisible}
        />
      </FullContainer>
    </CommonRoot>
  );
}
