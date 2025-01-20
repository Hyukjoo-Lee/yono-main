import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { findPwd, updateTempPwd } from '../../apis/userApi';
import { sendTempPwd } from '../../apis/mailApi';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';
import CommonInput from '../../common/CommonInput';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import {
  EMAIL_REGEX_MESSAGE,
  EMPTY_EMAIL_MESSAGE,
  EMPTY_NAME_MESSAGE,
  EMPTY_USERID_MESSAGE,
} from '../../common/Message';
import ValidationMessage from '../../common/ValidationMessage';
import theme from '../../theme/theme';
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
  justify-content: space-between;
  width: 45%;
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
  '등록되지 않은 아이디이거나\n이름 혹은 이메일이 잘못 입력되었습니다.',
  '잠시만 기다려주세요.',
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FindPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    email: '',
  });

  const [formMessage, setFormMessage] = useState({
    name: '',
    userId: '',
    email: '',
  });

  const [isShowMessage, setIsShowMessage] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [emailValidMessageIndex, setEmailValidMessageIndex] = useState();

  const validateField = (field, value) => {
    if (!value) {
      if (field === 'name') return EMPTY_NAME_MESSAGE;
      if (field === 'userId') return EMPTY_USERID_MESSAGE;
      if (field === 'email') return EMPTY_EMAIL_MESSAGE;
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

  const handleSendTempPwd = async () => {
    const response = await findPwd(
      formData.name,
      formData.email,
      formData.userId,
    );

    if (!response || !response.data) {
      setIsShowMessage(true);
      setEmailValidMessageIndex(0);
    } else {
      setIsShowMessage(true);
      setEmailValidMessageIndex(1);

      const tempPwd = await updateTempPwd(formData.email);
      await sendTempPwd(formData.email, tempPwd);

      setIsShowDialog(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    handleSendTempPwd();
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
          </MiddleContainer>

          {isShowMessage && (
            <EmailValidMessageStyle>
              {emailValidMessages[emailValidMessageIndex]}
            </EmailValidMessageStyle>
          )}

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
        {isShowDialog && (
          <CommonDialog
            open={isShowDialog}
            onClose={() => setIsShowDialog(false)}
            onClick={() => navigate('/login')}
            submitText="로그인하기"
            cancelBtn={true}
            cancelText="확인"
            children={
              <p style={{ textAlign: 'center' }}>
                임시 비밀번호가{' '}
                <span style={{ color: theme.color.blue, fontWeight: 'bold' }}>
                  {formData.email}
                </span>
                로 발송되었습니다.
              </p>
            }
          />
        )}
      </RootIn>
    </CommonRoot>
  );
};

export default FindPassword;
