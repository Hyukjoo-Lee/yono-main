import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonInput from '../../common/CommonInput';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import theme from '../../theme/theme';
import { findId } from '../../apis/userApi';
import { sendMail } from '../../apis/mailApi';
import {
  EMAIL_REGEX_MESSAGE,
  EMPTY_EMAIL_MESSAGE,
  EMPTY_NAME_MESSAGE,
  NAME_REGEX_MESSAGE,
} from '../../common/Message';
import ValidationMessage from '../../common/ValidationMessage';
import CommonDialog from '../../common/CommonDialog';

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
  white-space: pre-line;
`;

const emailValidMessages = [
  '인증 완료!',
  '인증코드가 일치하지 않습니다.',
  '이메일 인증을 확인하세요.',
  '등록되지 않은 아이디이거나\n이름 혹은 이메일이 잘못 입력되었습니다.',
];

const FindID = () => {
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

  const [isEmailCodeVisible, setIsEmailCodeVisble] = useState(false);
  const [emailValidVisible, setEmailValidVisible] = useState(false);
  const [emailValidMessageIndex, setEmailValidMessageIndex] = useState();
  const [isShowDialog, setIsShowDialog] = useState(false);

  const [id, setId] = useState('');
  const [code, setCode] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

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

  const handleSendCode = async () => {
    if (!validateField()) return;

    const response = await findId(formData.name, formData.email);

    if (response === null || response.data === null) {
      setEmailValidVisible(true);
      setEmailValidMessageIndex(3);
      return;
    }

    setEmailValidVisible(false);
    setId(response.data.userId);
    setIsEmailCodeVisble(!isEmailCodeVisible);

    const sendedCode = await sendMail(formData.email);
    setCode(sendedCode);
  };

  const handleConfirmCode = () => {
    if (!emailValidVisible) {
      setEmailValidVisible(true);
      setEmailValidMessageIndex(2);
    } else if (emailValidVisible && !isEmailValid) {
      setEmailValidVisible(true);
      setEmailValidMessageIndex(1);
    } else if (emailValidVisible && isEmailValid) {
      setEmailValidVisible(false);
      setIsShowDialog(true);
    }
  };

  const handleClose = () => {
    navigate('/Login');
  };

  const handleCheckCode = () => {
    setEmailValidVisible(true);
    if (code === formData.emailCode) {
      setIsEmailValid(true);
      setEmailValidMessageIndex(0);
    } else {
      setIsEmailValid(false);
      setEmailValidMessageIndex(1);
    }
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
              <CodeContainer>
                <CodeInput>
                  <CommonInput
                    text="인증코드"
                    placeholder="인증코드를 입력하세요"
                    width="100%"
                    onChange={(e) => handleInputChange(e, 'emailCode')}
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
            )}

            {emailValidVisible && (
              <EmailValidMessageStyle>
                {emailValidMessages[emailValidMessageIndex]}
              </EmailValidMessageStyle>
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

      {isShowDialog && (
        <CommonDialog
          open={isShowDialog}
          children={
            <p style={{ textAlign: 'center' }}>
              회원님의 아이디는{' '}
              <span style={{ color: theme.color.blue, fontWeight: 'bold' }}>
                {id}
              </span>{' '}
              입니다.
            </p>
          }
          onClose={() => {
            setIsShowDialog(false);
          }}
          onClick={() => {
            setIsShowDialog(false);
          }}
        />
      )}
    </CommonRoot>
  );
};

export default FindID;
