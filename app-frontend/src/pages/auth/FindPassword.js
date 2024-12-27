import React, { useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import CommonRoot from '../../common/CommonRoot';
import CommonPageInfo from '../../common/CommonPageInfo';
import { useNavigate } from 'react-router-dom';
import CommonHr from '../../common/CommonHr';

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

const ContainerProps = {
  marginBottom: '3px',
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

export const FindPassword = () => {
  const find = '비밀번호 찾기';
  const navigate = useNavigate();

  const [isDialogPWVisible, setIsDialogPWVisible] = useState(false);
  const [isEmailCodeVisible, setIsEmailCodeVisble] = useState(false);
  const [emailValidVisible, setEmailValidVisible] = useState(false);
  const [emailValidMessageIndex, setEamilValidMessageIndex] = useState();
  // const [answer, setAnswer] = useState('');
  // const [selectedQuestion, setSelectedQuestion] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  let isEmailValid = false; // 백엔드에서 받아온 이메일인증 확인 결과값, 기본값 false;

  const handleSendCode = () => {
    setIsEmailCodeVisble(!isEmailCodeVisible);
    // setIsDialogIDVisible(true);
  };

  const handleConfirmCode = () => {
    if (!emailValidVisible) {
      setEmailValidVisible(true);
      setEamilValidMessageIndex(2);
      // setIsDialogIDVisible(true);
    } else if (emailValidVisible && !isEmailValid) {
      setEamilValidMessageIndex(2);
    } else if (emailValidVisible && isEmailValid) {
      setIsDialogPWVisible(true);
    }
  };

  // const UpdateAnswer = (e) => {
  //   setAnswer(e.target.value);
  // };
  const handleClose = () => {
    navigate('/Login');
  };

  const handleCheckCode = () => {
    setEmailValidVisible(true);
    setEamilValidMessageIndex(isEmailValid ? 0 : 1);
  };

  return (
    <CommonRoot>
      <RootIn>
        <FullContainer>
          <CommonPageInfo title={find} text={<p></p>} />

          <MiddleContainer>
            <CommonInput
              text="이름"
              placeholder="이름을 입력하세요"
              width="300px"
              {...styleProps}
              // onChange={onChange}
            />
            <div style={ContainerProps} />

            <CommonHr />

            <div style={ContainerProps} />

            <CommonInput
              text="아이디"
              placeholder="아이디를 입력하세요"
              width="300px"
              {...styleProps}
              // onChange={onChange}
            />
            <CommonHr />

            <div style={ContainerProps} />

            <CommonInput
              text="이메일"
              placeholder="이메일을 입력하세요"
              width="300px"
              {...styleProps}
              // onChange={onChange}
            />
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
                      background="#ffffff"
                      $borderColor="#4064E6"
                      color="#4064E6"
                      fontSize="20"
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
              background="#4064E6"
              color="#ffffff"
              fontSize="20"
              onClick={isEmailCodeVisible ? handleConfirmCode : handleSendCode}
            />
            <CustomButton
              text="취소"
              width="50px"
              height="30px"
              background="#ffffff"
              $borderColor="#4064E6"
              color="#4064E6"
              fontSize="20"
              onClick={handleClose}
            />
          </ButtonContainer>
        </FullContainer>
      </RootIn>
    </CommonRoot>
  );
};
export default FindPassword;
