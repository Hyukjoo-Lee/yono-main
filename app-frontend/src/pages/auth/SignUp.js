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
`;

const HiddenBox = styled.div`
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  flex-direction: flex-end;
  justify-content: space-between;
  align-items: flex-end;
  width: 103%;
  margin-bottom: 10px;
`;
const ErrorMessage = styled.div`
  margin-top: 5px;
  color: red;

  font-size: 13px;
`;
const ContainerProps = {
  marginBottom: '5px',
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

export function SignUp() {
  const selectOptions = [
    { value: '애완동물 이름은?', label: '애완동물 이름은?' },
    { value: '당신의 생일은?', label: '당신의 생일은?' },
    { value: '당신이 좋아하는 음식은?', label: '당신이 좋아하는 음식은?' },
  ];
  const [isInputVisible, setIsInputVisible] = useState(false); // 상태 추가
  const [errorMessage, setErrorMessage] = useState('');
  const [correct, setCorrect] = useState('');

  const correctAnswer = {
    123: '123',
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setIsInputVisible(value.length > 0); // 입력이 있으면 `true`, 없으면 `false`
  };

  const handleConfirm = () => {
    setIsInputVisible(true);
    if (correct && correctAnswer[correct]) {
      const correctAnswerValue = correctAnswer[correct];

      if (correctAnswerValue === correct) {
        setErrorMessage('사용 가능한 아이디 입니다.');
      } else {
        setErrorMessage('아이디가 다릅니다.');
      }
    } else {
      setErrorMessage('아이디가 다릅니다.');
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
            background="#F5F5F5"
            width="310px"
            onChange={handleInputChange}
          />
          <div style={ContainerProps} />
          <CommonHr />
          <HiddenBox $isVisible={isInputVisible}>
            <CommonInput
              placeholder="아이디 중복 확인"
              text="아이디 중복확인"
              background="#F5F5F5"
              width="310px"
              value={correct}
              onChange={(e) => setCorrect(e.target.value)}
            />
            <CommonButton
              width="73px"
              height="37px"
              background="#F5F5F5"
              text="중복확인"
              color="#757575"
              onClick={handleConfirm}
            />
          </HiddenBox>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <CommonHr />
          <div style={ContainerProps} />
          <CommonInput
            placeholder="비밀번호를 입력하세요"
            text="비밀번호"
            background="#F5F5F5"
            width="310px"
          />
          <div style={ContainerProps} />
          <CommonHr />
          <div style={ContainerProps} />
          <CommonInput
            placeholder="비밀번호 확인해주세요"
            text="비밀번호 확인"
            background="#F5F5F5"
            width="310px"
          />
          <div style={ContainerProps} />
          <CommonHr />
          <div style={ContainerProps} />
          <CommonInput
            placeholder="닉네임을 입력하세요"
            text="닉네임"
            background="#F5F5F5"
            width="310px"
          />
          <div style={ContainerProps} />
          <CommonHr />
          <div style={ContainerProps} />{' '}
          <CommonSelect
            text="질문선택"
            height="35px"
            width="300px"
            padding="10px"
            color="#464646"
            labelColor="#464646"
            options={selectOptions}
            find="질문을 선택하세요"
          />
          <div style={ContainerProps} />
          <CommonHr />
          <div style={ContainerProps} />{' '}
          <CommonInput
            placeholder="답변을 입력하세요"
            text="답변"
            background="#F5F5F5"
            width="310px"
          />
          <div style={ContainerProps} />
          <CommonHr />
          <div style={ContainerProps} />{' '}
          <ImgContainer>캐릭터 선택</ImgContainer>
          <ImageGallery images={images} />
        </MiddleContainer>
      </FullContainer>
    </CommonRoot>
  );
}
