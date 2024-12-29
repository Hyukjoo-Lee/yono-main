import React, { useState } from 'react';
import styled from 'styled-components';
import CommonRoot from '../../common/CommonRoot';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonPageInfo from '../../common/CommonPageInfo';

import SearchAddressDialog from './modal/SearchAddressDialog';

import { checkUserIdExists, signUpUser } from '../../apis/userApi';
import {
  EMAIL_REGEX_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_DETAILED_ADDRESS_MESSAGE,
  EMPTY_EMAIL_MESSAGE,
  EMPTY_NAME_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_USERID_MESSAGE,
  NAME_REGEX_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
  PASSWORD_REGEX_MESSAGE,
  SERVER_MESSAGE,
  USERID_AVAILABLE_MESSAGE,
  USERID_DUPLICATE_MESSAGE,
  USERID_REGEX_MESSAGE,
  USERID_VERIFY_PROMPT,
} from '../../common/Message';
import ValidationMessage from '../../common/ValidationMessage';
import CommonDialog from '../../common/CommonDialog';
import { useNavigate } from 'react-router-dom';
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

const ContainerProps = {
  marginBottom: '13px',
};

const InputUserIdBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 490px;
`;

const ButtonWrapper = styled.div`
  position: relative;
  margin-left: 15px;
`;

const InputProps = {
  width: '380px',
  $borderColor: 'transparent',
  background: 'transparent',
  $focusBorderColor: 'transparent',
  $marginLeft: '10px',
};

const ButtonProps = {
  width: '75px',
  height: '40px',
};

const FORM_FIELDS = {
  userId: {
    placeholder: '아이디를 입력하세요.',
    text: '아이디',
    type: 'text',
    errorMessage: {
      empty: EMPTY_USERID_MESSAGE,
      invalid: USERID_REGEX_MESSAGE,
      duplicate: USERID_DUPLICATE_MESSAGE,
      available: USERID_AVAILABLE_MESSAGE,
      verifyPrompt: USERID_VERIFY_PROMPT,
    },
  },
  password: {
    placeholder: EMPTY_PASSWORD_MESSAGE,
    text: '비밀번호',
    type: 'password',
    errorMessage: {
      empty: EMPTY_PASSWORD_MESSAGE,
      invalid: PASSWORD_REGEX_MESSAGE,
    },
  },
  confirmPassword: {
    placeholder: '비밀번호를 다시 입력하세요.',
    text: '비밀번호 확인',
    type: 'password',
    errorMessage: {
      mismatch: PASSWORD_MISMATCH_MESSAGE,
    },
  },
  name: {
    placeholder: EMPTY_NAME_MESSAGE,
    text: '이름',
    type: 'text',
    errorMessage: {
      empty: EMPTY_NAME_MESSAGE,
      invalid: NAME_REGEX_MESSAGE,
    },
  },
  email: {
    placeholder: EMPTY_EMAIL_MESSAGE,
    text: '이메일',
    type: 'email',
    errorMessage: {
      empty: EMPTY_EMAIL_MESSAGE,
      invalid: EMAIL_REGEX_MESSAGE,
    },
  },
  address: {
    placeholder: EMPTY_EMAIL_MESSAGE,
    text: '주소',
    type: 'text',
    errorMessage: {
      empty: EMPTY_ADDRESS_MESSAGE,
    },
  },
  detailedAddress: {
    placeholder: EMPTY_DETAILED_ADDRESS_MESSAGE,
    text: '상세주소',
    type: 'text',
    errorMessage: {
      empty: EMPTY_DETAILED_ADDRESS_MESSAGE,
    },
  },
};

export function SignUp() {
  const [isSignUpSuccessVisible, setIsSignUpSuccessVisible] = useState(false);
  const [isSignUpFailVisible, setIsSignUpFailVisible] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isUserIdValidated, setIsUserIdValidated] = useState(false);

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    address: '',
    detailedAddress: '',
    postCode: '',
  });

  const [formMessage, setFormMessage] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    address: '',
    detailedAddress: '',
  });

  const inputRegexs = {
    userId: /^[a-z][a-z0-9]{3,15}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[*@#$%^&+=!]).{8,}$/,
    name: /^[가-힣]{2,10}$/,
  };

  const navigate = useNavigate();
  console.log(formData);
  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFormMessage((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const errors = {};

    Object.keys(FORM_FIELDS).forEach((field) => {
      if (!formData[field]) {
        errors[field] = FORM_FIELDS[field].errorMessage.empty;
      } else if (field === 'name' && !inputRegexs.name.test(formData.name)) {
        errors[field] = FORM_FIELDS.name.errorMessage.invalid;
      } else if (field === 'email' && !inputRegexs.email.test(formData.email)) {
        errors[field] = FORM_FIELDS.email.errorMessage.invalid;
      } else if (field === 'address') {
        errors[field] = FORM_FIELDS.address.errorMessage.empty;
      } else if (field === 'detailedAddress') {
        errors[field] = FORM_FIELDS.detailedAddress.errorMessage.empty;
      } else if (
        field === 'password' &&
        !inputRegexs.password.test(formData.password)
      ) {
        errors[field] = FORM_FIELDS.password.errorMessage.invalid;
      } else if (
        field === 'userId' &&
        !inputRegexs.userId.test(formData.userId)
      ) {
        errors[field] = FORM_FIELDS.userId.errorMessage.invalid;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword =
        FORM_FIELDS.confirmPassword.errorMessage.mismatch;
    }

    return errors;
  };

  // 아이디 중복 체크 클릭시
  const validateUserId = async () => {
    if (!formData.userId) {
      setFormMessage((prev) => ({
        ...prev,
        userId: FORM_FIELDS.userId.errorMessage.empty,
      }));
      setIsUserIdValidated(false);
      return;
    } else if (!inputRegexs.userId.test(formData.userId)) {
      setFormMessage((prev) => ({
        ...prev,
        userId: FORM_FIELDS.userId.errorMessage.invalid,
      }));
      setIsUserIdValidated(false);
      return;
    }

    // 아이디 중복 체크
    try {
      const result = await checkUserIdExists(formData.userId);
      if (result.userIdAvailable) {
        setFormMessage((prev) => ({
          ...prev,
          userId: FORM_FIELDS.userId.errorMessage.available,
        }));
        setIsUserIdValidated(true);
      } else {
        setFormMessage((prev) => ({
          ...prev,
          userId: FORM_FIELDS.userId.errorMessage.duplicate,
        }));
        setIsUserIdValidated(false);
      }
    } catch {
      setFormMessage((prev) => ({
        ...prev,
        userId: SERVER_MESSAGE,
      }));
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
    setFormMessage(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (!isUserIdValidated) {
      setFormMessage((prev) => ({
        ...prev,
        userId: FORM_FIELDS.userId.errorMessage.verifyPrompt,
      }));
      return;
    }

    try {
      await signUpUser(formData);
      setIsSignUpSuccessVisible(true);
    } catch (error) {
      setIsSignUpFailVisible(true);
    }
  };

  const completeLogin = () => {
    setIsSignUpSuccessVisible(false);
    navigate('/');
  };

  const closeDialog = () => {
    setIsSignUpFailVisible(false);
  };

  const renderInputField = (field) => (
    <>
      <CommonInput
        placeholder={FORM_FIELDS[field].placeholder}
        text={FORM_FIELDS[field].text}
        type={FORM_FIELDS[field].type}
        value={formData[field]}
        onChange={(e) => handleInputChange(e, field)}
        {...InputProps}
      />
      {formMessage[field] && (
        <ValidationMessage
          text={formMessage[field]}
          type={'error'}
          $margin="0 10px"
        />
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
            <ButtonWrapper>
              <CommonButton
                {...ButtonProps}
                text="중복확인"
                width="100px"
                onClick={validateUserId}
              />
            </ButtonWrapper>
          </InputUserIdBox>

          <ValidationMessage
            text={formMessage.userId}
            type={isUserIdValidated ? 'success' : 'error'}
            $margin={'0 10px'}
          />
          <CommonHr />
          {renderInputField('password')}
          {renderInputField('confirmPassword')}
          {renderInputField('name')}
          {renderInputField('email')}
          <InputUserIdBox>
            <CommonInput
              placeholder={FORM_FIELDS['address'].placeholder}
              text="주소"
              value={formData.address}
              onChange={(e) => handleInputChange(e, 'address')}
              {...InputProps}
            />
            <ButtonWrapper>
              {/* 아이콘으로 변경 예정 */}
              <CommonButton
                {...ButtonProps}
                text="주소검색"
                width="100px"
                fontSize={theme.fontSize.base}
                onClick={() => setIsAddressModalOpen(true)}
              />
            </ButtonWrapper>
          </InputUserIdBox>
          <ValidationMessage
            text={formMessage.userId}
            type={isUserIdValidated ? 'success' : 'error'}
            $margin={'0 10px'}
          />
          <CommonHr />
          <div style={ContainerProps} />
          {renderInputField('detailedAddress')}
          <div style={{ marginBottom: '15px' }}></div>
        </MiddleContainer>
        <CommonButton {...ButtonProps} text="회원가입" onClick={handleSubmit} />
        <CommonDialog
          open={isSignUpSuccessVisible}
          children={'회원가입에 성공했습니다!'}
          onClose={completeLogin}
          onClick={completeLogin}
        />
        <CommonDialog
          open={isSignUpFailVisible}
          children={
            '계정을 만드는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
          }
          onClose={closeDialog}
          onClick={closeDialog}
        />
        <SearchAddressDialog
          open={isAddressModalOpen}
          setModalVisible={setIsAddressModalOpen}
          onCompletePost={handleAddressSelect}
          setFormData={setFormData}
        />
      </FullContainer>
    </CommonRoot>
  );
}
