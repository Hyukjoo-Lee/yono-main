import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonInput from '../../common/CommonInput';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import theme from '../../theme/theme';
import {
  EMAIL_REGEX_MESSAGE,
  EMPTY_EMAIL_MESSAGE,
  // EMPTY_EMAILCODE_MESSAGE,
  EMPTY_NAME_MESSAGE,
  NAME_REGEX_MESSAGE,
} from '../../common/Message';
import ValidationMessage from '../../common/ValidationMessage';

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
`;

// const HiddenBox = styled.div`
//   display: flex;
//   margin-left: 58%;
//   margin-bottom: 2%;
// `;
// const ErrorMessage = styled.div`
//   color: red;
//   font-size: 13px;
// `;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: flex-end;
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

const EmailValidMessageStyle = styled.p`
  color: red;
  margin: 5px;
  font-size: 15px;
`;

const emailValidMessages = [
  '인증 완료!',
  '인증코드가 일치하지 않습니다!',
  '이메일 인증을 확인하세요!',
];

export const FindID = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailCode: '',
  });

  const [formMessage, setFormMessage] = useState({
    name: '',
    email: '',
    emailCode: '',
  });

  const [isEmailSentDialog, setIsEmailSentDialog] = useState(false);
  const [isEmailCodeVisible, setIsEmailCodeVisble] = useState(false);
  const [emailValidVisible, setEmailValidVisible] = useState(false);
  const [emailValidMessageIndex, setEmailValidMessageIndex] = useState();

  let isEmailValid = false; // 백엔드에서 받아온 이메일인증 확인 결과값, 기본값 false;

  const inputRegexs = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    name: /^[가-힣]{2,10}$/,
  };

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFormMessage((prev) => ({ ...prev, [field]: '' }));
  };

  const validateField = () => {
    let isValid = true;

    if (!formData.name) {
      setFormMessage((prev) => ({
        ...prev,
        name: EMPTY_NAME_MESSAGE,
      }));
      isValid = false;
    } else if (!inputRegexs.name.test(formData.name)) {
      setFormMessage((prev) => ({
        ...prev,
        name: NAME_REGEX_MESSAGE,
      }));
      isValid = false;
    }

    if (!formData.email) {
      setFormMessage((prev) => ({
        ...prev,
        email: EMPTY_EMAIL_MESSAGE,
      }));
      isValid = false;
    } else if (!inputRegexs.email.test(formData.email)) {
      setFormMessage((prev) => ({
        ...prev,
        email: EMAIL_REGEX_MESSAGE,
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSendCode = () => {
    if (!validateField()) return;
    setIsEmailSentDialog(!isEmailSentDialog);
    setIsEmailCodeVisble(!isEmailCodeVisible);

    // setIsDialogIDVisible(true);
  };

  const handleConfirmCode = () => {
    if (!emailValidVisible) {
      setEmailValidVisible(true);
      setEmailValidMessageIndex(2);
    } else if (emailValidVisible && !isEmailValid) {
      setEmailValidMessageIndex(2);
    } else if (emailValidVisible && isEmailValid) {
      setIsEmailSentDialog(true);
    }
  };

  const handleClose = () => {
    navigate('/Login');
  };

  const handleCheckCode = () => {
    setEmailValidVisible(true);
    setEmailValidMessageIndex(isEmailValid ? 0 : 1);
  };

  return (
    <CommonRoot>
      <RootIn>
        <FullContainer>
          <CommonPageInfo title="아이디 찾기" />

          <MiddleContainer>
            <CommonInput
              text="이름"
              placeholder="이름을 입력하세요"
              width="300px"
              onChange={(e) => handleInputChange(e, 'name')}
              {...styleProps}
            />
            {formMessage.name && (
              <ValidationMessage
                text={formMessage.name}
                type={'error'}
                $margin="0 10px"
              />
            )}

            <CommonHr />

            <CommonInput
              text="이메일"
              placeholder="이메일을 입력하세요"
              width="300px"
              onChange={(e) => handleInputChange(e, 'email')}
              {...styleProps}
            />
            {formMessage.email && (
              <ValidationMessage
                text={formMessage.email}
                type={'error'}
                $margin="0 10px"
              />
            )}

            <CommonHr />

            {isEmailCodeVisible && (
              <>
                <CodeContainer>
                  <CodeInput>
                    <CommonInput
                      text="인증코드"
                      placeholder="인증코드를 입력하세요"
                      width="100%"
                      {...styleProps}
                    />
                    <CommonHr />
                  </CodeInput>
                  <CodeButton>
                    <CustomButton
                      text="확인"
                      width="50%"
                      height="30px"
                      fontSize={theme.fontSize.sm}
                      onClick={handleCheckCode}
                    />
                  </CodeButton>
                </CodeContainer>
                {emailValidVisible && (
                  <EmailValidMessageStyle>
                    {emailValidMessages[emailValidMessageIndex]}
                  </EmailValidMessageStyle>
                )}
              </>
            )}
          </MiddleContainer>
          {/* <HiddenBox></HiddenBox> */}

          <ButtonContainer>
            <CustomButton
              text="확인"
              width="50px"
              height="30px"
              fontSize={theme.fontSize.sm}
              onClick={isEmailCodeVisible ? handleConfirmCode : handleSendCode}
            />
            <CustomButton
              text="취소"
              width="50px"
              height="30px"
              fontSize={theme.fontSize.sm}
              onClick={handleClose}
            />
          </ButtonContainer>
        </FullContainer>
      </RootIn>
    </CommonRoot>
  );
};
