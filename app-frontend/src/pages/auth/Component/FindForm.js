import React from 'react';
import CommonSelect from '../../../common/CommonSelect';
import styled from 'styled-components';
import CustomButton from '../../../common/CommonButton';
import CommonInput from '../../../common/CommonInput';
import CommonRoot from '../../../common/CommonRoot';
import CommonPageInfo from '../../../common/CommonPageInfo';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlarmID from '../AlarmID';
import AlarmPw from '../AlarmPw';

const Rootin = styled.div`
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

const HiddenBox = styled.div`
  display: flex;
  margin-left: 58%;
  margin-bottom: 2%;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: flex-end;
  justify-content: space-between;
  width: 45%;
`;
const FindForm = (props) => {
  const { find, onClick, $visibleID, $visiblePW } = props;
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogIDVisible, setIsDialogIDVisible] = useState(false);
  const [isDialogPWVisible, setIsDialogPWVisible] = useState(false);
  const navigate = useNavigate();
  const CancleConfirm = () => {
    navigate('/');
  };
  const selectOptions = [
    { value: '애완동물 이름은?', label: '애완동물 이름은?' },
    { value: '당신의 생일은?', label: '당신의 생일은' },
    { value: '당신이 좋아하는 음식은?', label: '당신이 좋아하는 음식은?' },
  ];
  const answers = {
    '애완동물 이름은?': '멍멍이',
    '당신의 생일은?': '0103',
    '당신이 좋아하는 음식은?': '떡볶이',
  };

  const handleConfirm = () => {
    if (selectedQuestion && answers[selectedQuestion]) {
      const Correctanswer = answers[selectedQuestion]; // 올바른 답을 가져옴

      if (answer === Correctanswer) {
        setIsDialogIDVisible(true);
        setIsDialogPWVisible(true);
      } else {
        setErrorMessage('답변이 틀렸습니다.');
        setIsDialogIDVisible(false);
        setIsDialogPWVisible(false);
      }
    } else {
      setErrorMessage('답변을 입력해 주세요.');
      setIsDialogIDVisible(false);
      setIsDialogPWVisible(false);
    }
  };

  return (
    <CommonRoot>
      <Rootin>
        <FullContainer>
          <CommonPageInfo title={find} text={<p></p>} />

          <MiddleContainer>
            <CommonSelect
              text="질문선택"
              height="35px"
              width="300px"
              padding="10px"
              color="#464646"
              labelColor="#464646"
              find="질문을 선택하세요"
              options={selectOptions}
              onSelect={setSelectedQuestion} //질문선택 시 상태 업데이트
            />

            <CommonInput
              text="답변"
              color="#464646"
              width="300px"
              height="35px"
              focusBorderWidth="10px"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)} //질문답변 시 상태 업데이트
            />
          </MiddleContainer>
          <HiddenBox>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </HiddenBox>

          <ButtonContainer>
            <CustomButton
              text="확인"
              width="50px"
              height="30px"
              background="#4064E6"
              color="#ffffff"
              fontSize="20"
              onClick={() => {
                handleConfirm();
                if (onClick) onClick();
              }}
            />
            <CustomButton
              text="취소"
              width="50px"
              height="30px"
              background="#ffffff"
              color="#4064E6"
              fontSize="20"
              onClick={CancleConfirm}
            />
          </ButtonContainer>
        </FullContainer>
        {isDialogIDVisible && (
          <AlarmID $visible={isDialogIDVisible || $visibleID} />
        )}
        {isDialogPWVisible && (
          <AlarmPw $visible={isDialogPWVisible || $visiblePW} />
        )}
      </Rootin>
    </CommonRoot>
  );
};
export default FindForm;
