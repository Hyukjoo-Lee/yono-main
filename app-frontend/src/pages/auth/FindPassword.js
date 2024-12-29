import React, { useState } from 'react';
import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import CommonRoot from '../../common/CommonRoot';
import CommonPageInfo from '../../common/CommonPageInfo';
import { useNavigate } from 'react-router-dom';
import CommonHr from '../../common/CommonHr';
import theme from '../../theme/theme';
import ValidationMessage from '../../common/ValidationMessage';
import {
  EMAIL_REGEX_MESSAGE,
  EMPTY_EMAIL_MESSAGE,
  EMPTY_EMAILCODE_MESSAGE,
  EMPTY_NAME_MESSAGE,
  EMPTY_USERID_MESSAGE,
} from '../../common/Message';

const RootIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 45%;
`;

const CodeContainer = styled.div`
  width: 300px;
  display: flex;
`;

const CodeInput = styled.div`
  width: 200px;
`;

const CodeButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100px;
  padding: 15px 5px;
`;

const styleProps = {
  height: '35px',
  background: 'transparent',
  $marginLeft: '7px',
  color: '#464646',
  focusBorderWidth: '10px',
  $borderColor: 'transparent',
  $focusBorderColor: 'transparent',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FindPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    email: '',
    emailCode: '',
  });

  const [formMessage, setFormMessage] = useState({
    name: '',
    userId: '',
    email: '',
    emailCode: '',
  });

  const [isEmailCodeVisible, setIsEmailCodeVisible] = useState(false);

  const validateField = (field, value) => {
    if (!value) {
      if (field === 'name') return EMPTY_NAME_MESSAGE;
      if (field === 'userId') return EMPTY_USERID_MESSAGE;
      if (field === 'email') return EMPTY_EMAIL_MESSAGE;
      if (field === 'emailCode') return EMPTY_EMAILCODE_MESSAGE;
    }
    if (field === 'email' && !emailRegex.test(value)) {
      return EMAIL_REGEX_MESSAGE;
    }
    return '';
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });
    setFormMessage(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFormMessage((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSendCode = () => {
    if (!formData.email || formMessage.email) return;
    setIsEmailCodeVisible(true);
  };

  const handleConfirmCode = () => {
    if (formData.emailCode === '1234') {
      alert('인증 성공!');
      navigate('/reset-password');
    } else {
      setFormMessage((prev) => ({
        ...prev,
        emailCode: '인증 코드가 일치하지 않습니다.',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    handleSendCode();
  };

  return (
    <CommonRoot>
      <RootIn>
        <FullContainer>
          <CommonPageInfo title="비밀번호 찾기" />

          <MiddleContainer>
            <CommonInput
              text="이름"
              placeholder="이름을 입력하세요"
              width="300px"
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
              {...styleProps}
            />
            {formMessage.name && <ValidationMessage text={formMessage.name} />}
            <CommonHr />

            <CommonInput
              text="아이디"
              placeholder="아이디를 입력하세요"
              width="300px"
              value={formData.userId}
              onChange={(e) => handleInputChange(e, 'userId')}
              {...styleProps}
            />
            {formMessage.userId && (
              <ValidationMessage text={formMessage.userId} />
            )}
            <CommonHr />

            <CommonInput
              text="이메일"
              placeholder="이메일을 입력하세요"
              width="300px"
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
              {...styleProps}
            />
            {formMessage.email && (
              <ValidationMessage text={formMessage.email} />
            )}
            <CommonHr />

            {isEmailCodeVisible && (
              <CodeContainer>
                <CodeInput>
                  <CommonInput
                    text="인증코드"
                    placeholder="인증코드를 입력하세요"
                    width="100%"
                    value={formData.emailCode}
                    onChange={(e) => handleInputChange(e, 'emailCode')}
                    {...styleProps}
                  />
                  {formMessage.emailCode && (
                    <ValidationMessage text={formMessage.emailCode} />
                  )}
                </CodeInput>
                <CodeButton>
                  <CommonButton
                    text="확인"
                    width="50%"
                    height="30px"
                    fontSize={theme.fontSize.sm}
                    onClick={handleConfirmCode}
                  />
                </CodeButton>
              </CodeContainer>
            )}
          </MiddleContainer>

          <ButtonContainer>
            <CommonButton
              text="확인"
              width="50px"
              height="30px"
              fontSize={theme.fontSize.sm}
              onClick={handleSubmit}
            />
            <CommonButton
              text="취소"
              width="50px"
              height="30px"
              fontSize={theme.fontSize.sm}
              onClick={() => navigate('/login')}
            />
          </ButtonContainer>
        </FullContainer>
      </RootIn>
    </CommonRoot>
  );
};

export default FindPassword;
