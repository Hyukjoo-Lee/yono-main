import React from 'react';
import styled from 'styled-components';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonRoot from '../../common/CommonRoot';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import theme from '../../theme/theme';

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

const FindGroup = styled.div``;

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

const onSubmit = (e) => {
  e.preventDefault();
  console.log('로그인 요청');
};

export function Login() {
  return (
    <CommonRoot>
      <RootIn>
        <FormBox onSubmit={onSubmit}>
          <FormWrapper>
            <CommonPageInfo title="로그인" />
            <InputWrapper>
              <CommonInput
                background={theme.color.white}
                placeholder="아이디를 입력하세요."
                text="아이디"
                width="100%"
              />
            </InputWrapper>
            <InputWrapper>
              <CommonInput
                background={theme.color.white}
                placeholder="비밀번호를 입력하세요."
                text="비밀번호"
                width="100%"
                type="password"
              />
            </InputWrapper>
            <OptionsWrapper>
              <CheckBoxWrapper>
                <StyledCheckbox htmlFor="save" type="checkbox" />
                <Label id="save">아이디 저장</Label>
              </CheckBoxWrapper>
              <FindGroup>
                <LinkText>아이디찾기</LinkText>
                <span>|</span>
                <LinkText>비밀번호찾기</LinkText>
              </FindGroup>
            </OptionsWrapper>
            <CommonButton text="로그인" width="100%" height="40px" />
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
        </FormBox>
      </RootIn>
    </CommonRoot>
  );
}
