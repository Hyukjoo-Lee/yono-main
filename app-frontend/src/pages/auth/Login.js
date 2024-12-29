import React, { useState } from 'react';
import styled from 'styled-components';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import theme from '../../theme/theme';
import {
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_USERID_MESSAGE,
} from '../../common/Message';
import { useNavigate } from 'react-router-dom';
import CommonDialog from '../../common/CommonDialog';

const RootIn = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;

const FormBox = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const OptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckBoxWrapper = styled.div``;

const StyledCheckbox = styled.input`
  margin: 5px 5px 0 0;
`;

const Label = styled.label`
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: ${theme.color.red};
  font-size: 13px;
`;

const LinkText = styled.a`
  font-size: 14px;
  color: #464646;
  text-decoration: none;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 10px;

  &:hover {
    color: ${theme.color.blue};
  }
`;

const Divider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #ccc;
  }

  span {
    margin: 0 10px;
    color: #aaa;
  }
`;

const SocialLoginWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SocialButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  cursor: pointer;
`;

export function Login() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const [alertMessage, setAlertMessage] = useState({
    userId: '',
    password: '',
  });

  const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

  const navigate = useNavigate();

  const handleFindLink = (link) => {
    if (link === 'id') {
      navigate('/find-id');
    } else {
      navigate('/find-pwd');
    }
  };

  const completeLogin = () => {
    setIsLoginSuccessVisible(false);
    navigate('/');
  };

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setAlertMessage((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.userId) {
      errors.userId = EMPTY_USERID_MESSAGE;
    }

    if (!formData.password) {
      errors.password = EMPTY_PASSWORD_MESSAGE;
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setAlertMessage(errors);

    if (Object.keys(errors).length > 0) {
      console.log('there is an error');
      return;
    }

    try {
      // 로그인 api 요청
      setIsLoginSuccessVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommonRoot>
      <RootIn>
        <FormBox onSubmit={handleLogin}>
          <FormWrapper>
            <CommonPageInfo title="로그인" />
            <InputWrapper>
              <CommonInput
                background={theme.color.white}
                placeholder="아이디를 입력하세요."
                text="아이디"
                width="100%"
                onChange={(e) => handleInputChange(e, 'userId')}
              />
              {alertMessage.userId && (
                <ErrorMessage>{alertMessage.userId}</ErrorMessage>
              )}
            </InputWrapper>
            <InputWrapper>
              <CommonInput
                background={theme.color.white}
                placeholder="비밀번호를 입력하세요."
                text="비밀번호"
                width="100%"
                type="password"
                onChange={(e) => handleInputChange(e, 'password')}
              />
              {alertMessage.password && (
                <ErrorMessage>{alertMessage.password}</ErrorMessage>
              )}
            </InputWrapper>
            <OptionsWrapper>
              <CheckBoxWrapper>
                <StyledCheckbox htmlFor="save" type="checkbox" />
                <Label id="save">아이디 저장</Label>
              </CheckBoxWrapper>
              <div>
                <LinkText href="#" onClick={() => handleFindLink('id')}>
                  아이디찾기
                </LinkText>
                <span>|</span>
                <LinkText href="#" onClick={() => handleFindLink('password')}>
                  비밀번호찾기
                </LinkText>
              </div>
            </OptionsWrapper>
            <CommonButton
              type="submit"
              text="로그인"
              width="100%"
              height="40px"
            />
            <Divider>
              <span>OR</span>
            </Divider>
            <SocialLoginWrapper>
              <SocialButton>
                {/* <img src={kakaoLogo} alt="카카오 로그인" /> */}
              </SocialButton>
              <SocialButton>
                {/* <img src={googleLogo} alt="구글 로그인" /> */}
              </SocialButton>
            </SocialLoginWrapper>
          </FormWrapper>
          <CommonDialog
            open={isLoginSuccessVisible}
            children={'로그인에 성공했습니다!'}
            onClose={completeLogin}
            onClick={completeLogin}
          />
        </FormBox>
      </RootIn>
    </CommonRoot>
  );
}
