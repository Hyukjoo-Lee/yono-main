import FindForm from './Component/FindForm';
import { AlarmID } from './AlarmID';
import { useState } from 'react';

export const FindID = () => {
  const find = '아이디 찾기';
  const [isDialogIDVisible, setIsDialogIDVisible] = useState(false);
  const [answer, setAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleConfirm = (isDialogIDVisible) => {
    if (selectedQuestion && answers[selectedQuestion]) {
      const correctAnswer = answers[selectedQuestion];

      if (answer === correctAnswer) {
        setIsDialogIDVisible(true);
      } else {
        setErrorMessage('답변이 틀렸습니다.');
        setIsDialogIDVisible(false);
      }
    } else {
      setErrorMessage('답변을 입력해 주세요');
      setIsDialogIDVisible(false);
    }
  };
  return (
    <div>
      <FindForm
        find={find}
        isDialogIDVisible={isDialogIDVisible}
        setIsDialogIDVisible={setIsDialogIDVisible}
        handleConfirm={handleConfirm}
        selectOptions={selectOptions}
        answer={answer}
        errorMessage={errorMessage}
        setAnswer={setAnswer}
        selectedValue={selectedQuestion}
        setSelectedValue={setSelectedQuestion}
      />
      {<AlarmID Open={isDialogIDVisible} />}
    </div>
  );
};
