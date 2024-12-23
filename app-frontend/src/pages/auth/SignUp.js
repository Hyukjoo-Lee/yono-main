import React, { useState } from 'react';
import styled from 'styled-components';
import CommonRoot from '../../common/CommonRoot';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonPageInfo from '../../common/CommonPageInfo';
import SuccessSignUp from './SuccessSignUp';
import FailSignUp from './SuccessSignUp';

import SearchAddressModal from './Component/SearchAddressModal';

import { checkUserIdExists, signUpUser } from '../../apis/userApi';
import {
  EMAIL_REGEX_ERROR,
  EMPTY_ADDRESS_ERROR,
  EMPTY_EMAIL_ERROR,
  EMPTY_NAME_ERROR,
  EMPTY_PASSWORD_ERROR,
  EMPTY_USERID_ERROR,
  PASSWORD_MISMATCH_ERROR,
  PASSWORD_REGEX_ERROR,
  SERVER_ERROR,
  USERID_AVAILABLE_MESSAGE,
  USERID_DUPLICATE_ERROR,
  USERID_REGEX_ERROR,
  USERID_VERIFY_PROMPT,
} from './Component/Message';
import theme from '../../theme/theme';

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ErrorMessage = styled.div`
  color: ${theme.color.red};
  font-size: 13px;
`;

const ValidMessage = styled.div`
  color: ${theme.color.blue};
  font-size: 13px;
  margin-left: 10px;
`;

const ContainerProps = {
  marginBottom: '13px',
};

const InputProps = {
  width: '350px',
  $borderColor: 'transparent',
  background: 'transparent',
  $focusBorderColor: 'transparent',
  $marginLeft: '10px',
};

const InputUserIdBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 350px;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const MessageBox = styled.div`
  margin-left: 10px;
`;

const ButtonProps = {
  width: '73px',
  height: '37px',
};

export function SignUp() {
  const [isSignUpSuccessVisible, setIsSignUpSuccessVisible] = useState(false);
  const [isSignUpFailVisible, setIsSignUpFailVisible] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isUserIdValidated, setIsUserIdValidated] = useState(false);

  const inputRegexs = {
    userId: /^[a-z][a-z0-9]{3,15}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[*@#$%^&+=!]).{8,}$/,
  };

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    address: '',
  });

  const [alertMessage, setAlertMessage] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setAlertMessage((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.userId) {
      errors.userId = EMPTY_USERID_ERROR;
    } else if (!inputRegexs.userId.test(formData.userId)) {
      errors.userId = USERID_REGEX_ERROR;
    }

    if (!formData.address) {
      errors.address = EMPTY_ADDRESS_ERROR;
    }

    if (!formData.email) {
      errors.email = EMPTY_EMAIL_ERROR;
    } else if (!inputRegexs.email.test(formData.email)) {
      errors.email = EMAIL_REGEX_ERROR;
    }

    if (!formData.password) {
      errors.password = EMPTY_PASSWORD_ERROR;
    } else if (!inputRegexs.password.test(formData.password)) {
      errors.password = PASSWORD_REGEX_ERROR;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = PASSWORD_MISMATCH_ERROR;
    }

    if (!formData.name) {
      errors.name = EMPTY_NAME_ERROR;
    }

    return errors;
  };

  // 아이디 중복 체크 클릭시
  const validateUserId = async () => {
    if (!formData.userId) {
      setAlertMessage({
        ...alertMessage,
        userId: EMPTY_USERID_ERROR,
      });
      setIsUserIdValidated(false);
      return;
    } else if (!inputRegexs.userId.test(formData.userId)) {
      setAlertMessage({
        ...alertMessage,
        userId: USERID_REGEX_ERROR,
      });
      setIsUserIdValidated(false);
      return;
    }

    // 아이디 중복 체크
    try {
      const result = await checkUserIdExists(formData.userId);
      if (result.userIdAvailable) {
        setAlertMessage({
          ...alertMessage,
          userId: USERID_AVAILABLE_MESSAGE,
        });
        setIsUserIdValidated(true);
      } else {
        setAlertMessage({
          ...alertMessage,
          userId: USERID_DUPLICATE_ERROR,
        });
        setIsUserIdValidated(false);
      }
    } catch (error) {
      setAlertMessage({
        ...alertMessage,
        userId: SERVER_ERROR,
      });
      setIsUserIdValidated(false);
    }
  };

  const handleAddressSelect = (address) => {
    setFormData((prev) => ({ ...prev, address }));
    setIsAddressModalOpen(false);
  };

  /**
   * 중복 확인 버튼을 누르면 유효성 검사 후 아이디 중복체크
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

    if (!isUserIdValidated) {
      setAlertMessage({
        ...alertMessage,
        userId: USERID_VERIFY_PROMPT,
      });
      return;
    }

    try {
      await signUpUser(formData);
      setIsSignUpSuccessVisible(true);
    } catch (error) {
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
        <MessageBox>
          <ErrorMessage>{alertMessage[field]}</ErrorMessage>
        </MessageBox>
      )}
      <CommonHr />
      <div style={ContainerProps} />
    </>
  );

  return (
    <CommonRoot>
      <FullContainer>
        <MiddleContainer>
          <CommonPageInfo title="회원가입" />
          <InputUserIdBox>
            <CommonInput
              placeholder="아이디를 입력하세요."
              text="아이디"
              onChange={(e) => handleInputChange(e, 'userId')}
              {...InputProps}
            />
            <div style={{ marginLeft: '5px' }}>
              <CommonButton
                {...ButtonProps}
                text="중복확인"
                width="100px"
                onClick={validateUserId}
              />
            </div>
          </InputUserIdBox>
          <MessageBox>
            {!isUserIdValidated ? (
              <ErrorMessage>{alertMessage.userId}</ErrorMessage>
            ) : (
              <ValidMessage>{alertMessage.userId}</ValidMessage>
            )}
          </MessageBox>
          <CommonHr />
          <InputUserIdBox>
            <CommonInput
              placeholder="주소를 입력하세요."
              text="주소"
              value={formData.address}
              onChange={(e) => handleInputChange(e, 'address')}
              {...InputProps}
            />
            <div style={{ marginLeft: '5px' }}>
              <CommonButton
                {...ButtonProps}
                text="주소찾기"
                width="100px"
                onClick={() => setIsAddressModalOpen(true)}
              />
            </div>
          </InputUserIdBox>
          <MessageBox>
            {alertMessage.address ? (
              <ErrorMessage>{alertMessage.address}</ErrorMessage>
            ) : (
              <ValidMessage>{alertMessage.address}</ValidMessage>
            )}
          </MessageBox>
          <CommonHr />

          {renderInputField(
            'password',
            '비밀번호를 입력하세요',
            '비밀번호',
            'password',
          )}
          {renderInputField(
            'confirmPassword',
            '비밀번호를 입력하세요',
            '비밀번호 확인',
            'password',
          )}
          {renderInputField('name', '이름을 입력하세요', '이름')}
          {renderInputField('email', '이메일을 입력하세요', '이메일')}
        </MiddleContainer>

        <div style={{ marginTop: '5px' }}>
          <CommonButton
            {...ButtonProps}
            text="회원가입"
            width="100px"
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
        <SearchAddressModal
          open={isAddressModalOpen}
          setModalVisible={setIsAddressModalOpen}
          onCompletePost={handleAddressSelect}
        />
      </FullContainer>
    </CommonRoot>
  );
}
