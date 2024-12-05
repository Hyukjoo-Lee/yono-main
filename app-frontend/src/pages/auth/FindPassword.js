import React, { useState } from 'react';
import AlarmPw from './AlarmPw';
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
const styleProps = {
  height: '35px',
  width: '300px',
  background: 'transparent',
  $marginLeft: '7px',
};
const ContainerProps = {
  marginBottom: '3px',
};

export const FindPassword = () => {
  const find = '비밀번호 찾기';
  const navigate = useNavigate();

  const [isDialogPWVisible, setIsDialogPWVisible] = useState(false);
  // const [answer, setAnswer] = useState('');
  // const [selectedQuestion, setSelectedQuestion] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const handleConfirm = () => {
    setIsDialogPWVisible(true);
  };
  // const UpdateAnswer = (e) => {
  //   setAnswer(e.target.value);
  // };
  const handleClose = () => {
    navigate('/Login');
  };
  return (
    <CommonRoot>
      <RootIn>
        <FullContainer>
          <CommonPageInfo title={find} text={<p></p>} />

          <MiddleContainer>
            <CommonInput
              text="이름"
              color="#464646"
              placeholder="이름을 입력하세요"
              focusBorderWidth="10px"
              $borderColor="transparent"
              $focusBorderColor="transparent"
              {...styleProps}
              // onChange={onChange}
            />
            <div style={ContainerProps} />

            <CommonHr />
            <div style={ContainerProps} />

            <CommonInput
              text="이메일"
              color="#464646"
              placeholder="이메일을 입력하세요"
              focusBorderWidth="10px"
              $borderColor="transparent"
              $focusBorderColor="transparent"
              {...styleProps}
              // onChange={onChange}
            />
            <CommonHr />
            <div style={ContainerProps} />

            <CommonInput
              text="아이디"
              color="#464646"
              placeholder="아이디를 입력하세요"
              focusBorderWidth="10px"
              $borderColor="transparent"
              $focusBorderColor="transparent"
              {...styleProps}
              // onChange={onChange}
            />
            <CommonHr />
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
              onClick={handleConfirm}
            />
            <CustomButton
              text="취소"
              width="50px"
              height="30px"
              background="#ffffff"
              $borderColor="#4064E6"
              color="#4064E6"
              hoverBk="#ffffff"
              fontSize="20"
              onClick={handleClose}
            />
          </ButtonContainer>
        </FullContainer>
        <AlarmPw
          open={isDialogPWVisible}
          $setIsDialogPWVisible={setIsDialogPWVisible}
        />
      </RootIn>
    </CommonRoot>
  );
};
export default FindPassword;
