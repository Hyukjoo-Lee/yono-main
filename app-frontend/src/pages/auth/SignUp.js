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

const HiddenIDBox = styled.div`
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const InputIDBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 350px;
`;
const HiddenPWBox = styled.div`
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
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
  const selectOptions = [
    { value: '애완동물 이름은?', label: '애완동물 이름은?' },
    { value: '당신의 생일은?', label: '당신의 생일은?' },
    { value: '당신이 좋아하는 음식은?', label: '당신이 좋아하는 음식은?' },
  ];
  const [isIDVisible, setIsIDVisible] = useState(false); // 상태 추가
  const [errorIDMessage, setErrorIDMessage] = useState('');
  const [correctIDMessage, setCorrectIDMessage] = useState('');
  const [correctIDAnswer, setCorrectIDAnswer] = useState('');
  const [answerID, setAnswerID] = useState('');
  const [isPWVisible, setIsPWVisible] = useState(false); // 상태 추가
  const [errorPWMessage, setErrorPWMessage] = useState('');
  const [correctPWMessage, setCorrectPWMessage] = useState('');
  const [correctPWAnswer, setCorrectPWAnswer] = useState('');
  const [answerPW, setAnswerPW] = useState('');

  const handleIDChange = (e) => {
    const value = e.target.value;
    setAnswerID(value);
    setIsIDVisible(value.length > 0); // 입력이 있으면 `true`, 없으면 `false`
  };

  const handleIDConfirm = () => {
    if (answerID === correctIDAnswer) {
      setErrorIDMessage('');
      setCorrectIDMessage('사용가능한 아이디 입니다');
    } else if (correctIDAnswer.length === 0) {
      setErrorIDMessage('아이디를 입력해 주세요');
      setCorrectIDMessage('');
    } else {
      setErrorIDMessage('아이디가 일치하지 않습니다');
      setCorrectIDMessage('');
    }
  };

  const handlePWChange = (e) => {
    const value = e.target.value;
    setAnswerPW(value);
    setIsPWVisible(value.length > 0); // 입력이 있으면 `true`, 없으면 `false`
  };

  const handlePWConfirm = () => {
    if (answerPW === correctPWAnswer) {
      setErrorPWMessage('');
      setCorrectPWMessage('사용가능한 비밀번호 입니다');
    } else if (correctPWAnswer.length === 0) {
      setErrorPWMessage('비밀번호를 입력해 주세요');
      setCorrectPWMessage('');
    } else {
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
          <CommonInput
            placeholder="아이디를 입력하세요"
            text="아이디"
            onChange={handleIDChange}
            value={answerID}
            {...InputProps}
          />
          <CommonHr />
          <HiddenIDBox $isVisible={isIDVisible}>
            <InputIDBox>
              <CommonInput
                placeholder="아이디를 확인해주세요"
                text="아이디 중복확인"
                value={correctIDAnswer}
                onChange={(e) => setCorrectIDAnswer(e.target.value)}
                {...InputProps}
              />
              <CommonButton {...ButtonProps} onClick={handleIDConfirm} />
            </InputIDBox>
            {errorIDMessage && <ErrorMessage>{errorIDMessage}</ErrorMessage>}
            {correctIDMessage && (
              <CorrectMessage>{correctIDMessage}</CorrectMessage>
            )}
          </HiddenIDBox>
          <div style={ContainerProps} />
          <CommonInput
            placeholder="비밀번호를 입력하세요"
            text="비밀번호"
            onChange={handlePWChange}
            {...InputProps}
          />
          <CommonHr />
          <HiddenPWBox $isVisible={isPWVisible}>
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
            {errorPWMessage && <ErrorMessage>{errorPWMessage}</ErrorMessage>}
            {correctPWMessage && (
              <CorrectMessage>{correctPWMessage}</CorrectMessage>
            )}
          </HiddenPWBox>
          <div style={ContainerProps} />
          <CommonInput
            placeholder="닉네임을 적어주세요"
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
            find="질문을 선택하세요"
            $fieldBorderColor="transparent"
            background="transparent"
            $marginLeft="7px"
          />
          <CommonHr />
          <div style={ContainerProps} />{' '}
          <CommonInput
            placeholder="답변을 적어주세요"
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
