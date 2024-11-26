import React, { useState } from 'react';
import FindForm from './Component/FindForm';
import { AlarmPw } from './AlarmPw';

export const FindPassword = () => {
  const find = '비밀번호 찾기';
  const [isDialogPWVisible, setIsDialogPWVisible] = useState(false);
  const [answer, setAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const handleChange = (event) => {
  //   setSelectedQuestion(event.target.value);
  //   // if (onSelect) onSelect(event.target.value);
  // };

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
    console.log(answer);
    if (selectedQuestion && answers[selectedQuestion]) {
      const correctanswer = answers[selectedQuestion]; // 올바른 답을 가져옴

      if (answer === correctanswer) {
        setIsDialogPWVisible(true);
      } else {
        setErrorMessage('답변이 틀렸습니다.');
        setIsDialogPWVisible(false);
      }
    } else {
      console.log(selectedQuestion);
      setErrorMessage('답변을 입력해 주세요.');
      setIsDialogPWVisible(false);
    }
  };

  return (
    <div>
      <FindForm
        find={find}
        isDialogPWVisible={isDialogPWVisible}
        setIsDialogPWVisible={setIsDialogPWVisible}
        handleConfirm={handleConfirm}
        selectOptions={selectOptions}
        answer={answer}
        errorMessage={errorMessage}
        setAnswer={setAnswer}
        selectedValue={selectedQuestion}
        setSelectedValue={setSelectedQuestion}
      />
      {isDialogPWVisible && <AlarmPw $visible={isDialogPWVisible} />}
    </div>
  );
};
