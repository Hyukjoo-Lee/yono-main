import React, { useState } from 'react';
import FindForm from './Component/FindForm';
import AlarmPw from './AlarmPw';

export const FindPassword = () => {
  const find = '비밀번호 찾기';
  const [isDialogPWVisible, setIsDialogPWVisible] = useState(false);
  const [answer, setAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const answers = {
    '애완동물 이름은?': '멍멍이',
    '당신의 생일은?': '0103',
    '당신이 좋아하는 음식은?': '떡볶이',
  };

  const handleConfirm = () => {
    if (selectedQuestion && answers[selectedQuestion]) {
      const correctAnswer = answers[selectedQuestion]; // 올바른 답을 가져옴

      if (answer === correctAnswer) {
        setIsDialogPWVisible(true);
      } else if (answer === null || answer === '') {
        setErrorMessage('답변을 입력해 주세요.');
        setIsDialogPWVisible(false);
      } else if (answer !== correctAnswer) {
        setErrorMessage('답변이 틀렸습니다.');
        setIsDialogPWVisible(false);
      }
    } else {
      setErrorMessage('답변을 입력해 주세요.');
      setIsDialogPWVisible(false);
    }
  };
  const UpdateAnswer = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <>
      <FindForm
        find={find}
        answer={answer}
        errorMessage={errorMessage}
        selectedValue={selectedQuestion}
        setSelectedValue={setSelectedQuestion}
        onChange={UpdateAnswer}
        onClick={handleConfirm}
      />
      <AlarmPw
        open={isDialogPWVisible}
        $setIsDialogPWVisible={setIsDialogPWVisible}
      />
    </>
  );
};
