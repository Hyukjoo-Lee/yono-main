import CommonRoot from '../../common/CommonRoot';
import styled from 'styled-components';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import CommonSelect from '../../common/CommonSelect';
import CommonHr from '../../common/CommonHr';
import ImageGallery from '../mypage/ImageSelect';
import image1 from '../../assets/images/Character1.png';
import image2 from '../../assets/images/Character2.png';
import image3 from '../../assets/images/Character3.png';
import image4 from '../../assets/images/Character4.png';
import CommonPageInfo from '../../common/CommonPageInfo';
import { useState } from 'react';
const images = [image1, image2, image3, image4];

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiddleContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const MiddleTitle = styled.div`
  font-size: 16px;
  color: #757575;
  margin-left: 5px;
`;

const InputIDBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 350px;
`;

const InputPWBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 350px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  margin-left: 5px;
`;
const CorrectMessage = styled.div`
  color: blue;
  font-size: 13px;
  margin-left: 5px;
`;
const ContainerProps = {
  marginBottom: '13px',
};

const ImgContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const InputProps = {
  width: '350px',
  $borderColor: 'transparent',
  background: 'transparent',
  $focusBorderColor: 'transparent',
  $marginLeft: '7px',
};
const ButtonProps = {
  width: '73px',
  height: '37px',
  background: '#F5F5F5',
  text: '확인',
  color: '#757575',
};
export function SignUp() {
  const [errorIDMessage, setErrorIDMessage] = useState('');
  const [correctIDMessage, setCorrectIDMessage] = useState('');
  const [answerID, setAnswerID] = useState('');
  const [errorPWMessage, setErrorPWMessage] = useState('');
  const [correctPWMessage, setCorrectPWMessage] = useState('');
  const [correctPWAnswer, setCorrectPWAnswer] = useState('');
  const [answerPW, setAnswerPW] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const selectOptions = [
    { value: '애완동물 이름은?', label: '애완동물 이름은?' },
    { value: '당신의 생일은?', label: '당신의 생일은?' },
    { value: '당신이 좋아하는 음식은?', label: '당신이 좋아하는 음식은?' },
  ];
  const handleIDChange = (e) => {
    const value = e.target.value;
    setAnswerID(value);
    if (value.length === 0) {
      setErrorIDMessage('');
      setCorrectIDMessage('');
    }
  };
  const dummyId = 'lhk883@naver.com';
  const handleIDConfirm = () => {
    if (answerID.length === 0) {
      // 먼저 빈 문자열을 체크
      setErrorIDMessage('아이디를 입력해 주세요');
      setCorrectIDMessage('');
    } else if (answerID === dummyId) {
      // 아이디가 일치하는지 확인
      setErrorIDMessage('');
      setCorrectIDMessage('사용가능한 아이디 입니다');
    } else {
      // 아이디가 일치하지 않으면
      setErrorIDMessage('사용중인 아이디 입니다');
      setCorrectIDMessage('');
    }
  };

  const handlePWChange = (e) => {
    const value = e.target.value;
    setAnswerPW(value);
    if (value.length === 0) {
      setErrorPWMessage('');
      setCorrectPWMessage('');
    }
  };

  const handlePWConfirm = () => {
    if (answerPW === '' || correctPWAnswer === '') {
      // 둘 중 하나라도 비어 있으면
      setErrorPWMessage('비밀번호를 입력해 주세요');
      setCorrectPWMessage('');
    } else if (answerPW === correctPWAnswer) {
      // 비밀번호가 일치하는 경우
      setErrorPWMessage('');
      setCorrectPWMessage('사용가능한 비밀번호 입니다');
    } else {
      // 비밀번호가 일치하지 않는 경우
      setErrorPWMessage('비밀번호가 일치하지 않습니다');
      setCorrectPWMessage('');
    }
  };

  return (
    <CommonRoot>
      <FullContainer>
        <MiddleContainer>
          <CommonPageInfo title="회원가입" text={<p></p>} />
          <MiddleTitle>회원정보입력</MiddleTitle>
          <CommonHr />
          <div style={ContainerProps} />
          <InputIDBox>
            <CommonInput
              placeholder="아이디를 입력하세요"
              text="아이디(이메일)"
              onChange={handleIDChange}
              {...InputProps}
            />
            <CommonButton
              {...ButtonProps}
              text="중복확인"
              width="100px"
              onClick={handleIDConfirm}
            />
          </InputIDBox>
          <CommonHr />
          {errorIDMessage && <ErrorMessage>{errorIDMessage}</ErrorMessage>}
          {correctIDMessage && (
            <CorrectMessage>{correctIDMessage}</CorrectMessage>
          )}
          <div style={ContainerProps} />
          <CommonInput
            placeholder="비밀번호를 입력하세요"
            text="비밀번호"
            onChange={handlePWChange}
            {...InputProps}
          />
          <CommonHr />
          <InputPWBox>
            <div style={ContainerProps} />
            <CommonInput
              placeholder="비밀번호 확인해주세요"
              text="비밀번호 확인"
              onChange={(e) => setCorrectPWAnswer(e.target.value)}
              {...InputProps}
            />
            <CommonButton {...ButtonProps} onClick={handlePWConfirm} />
          </InputPWBox>
          <CommonHr />
          {errorPWMessage && <ErrorMessage>{errorPWMessage}</ErrorMessage>}
          {correctPWMessage && (
            <CorrectMessage>{correctPWMessage}</CorrectMessage>
          )}
          <div style={ContainerProps} />
          <CommonInput
            placeholder="닉네임을 입력하세요"
            text="닉네임"
            {...InputProps}
          />
          <CommonHr />
          <div style={ContainerProps} />
          <CommonSelect
            text="질문선택"
            height="35px"
            width="350px"
            padding="10px"
            color="#464646"
            labelColor="#464646"
            options={selectOptions}
            selectedValue={selectedQuestion}
            setSelectedValue={(value) => setSelectedQuestion(value)}
            find="질문을 선택하세요"
            $fieldBorderColor="transparent"
            background="transparent"
            $marginLeft="7px"
          />
          <CommonHr />
          <div style={ContainerProps} />{' '}
          <CommonInput
            placeholder="답변을 입력하세요"
            text="답변"
            {...InputProps}
          />
          <CommonHr />
          <div style={ContainerProps} />{' '}
          <ImgContainer>캐릭터 선택</ImgContainer>
          <ImageGallery images={images} />
        </MiddleContainer>
      </FullContainer>
    </CommonRoot>
  );
}
