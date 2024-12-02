import FindForm from './Component/FindForm';
import { AlarmID } from './AlarmID';
import { useState } from 'react';

export const FindID = () => {
  const find = '아이디 찾기';
  const [isDialogIDVisible, setIsDialogIDVisible] = useState(false);
  const [answer, setAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const answers = {
    '애완동물 이름은?': '멍멍이',
    '당신의 생일은?': '0103',
    '당신이 좋아하는 음식은?': '떡볶이',
  };
  const UpdateAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const handleConfirm = () => {
    if (selectedQuestion && answers[selectedQuestion]) {
      const correctAnswer = answers[selectedQuestion];

      if (answer === correctAnswer) {
        setIsDialogIDVisible(true);
      } else if (answer === null || answer === '') {
        setErrorMessage('답변을 입력해 주세요');
        setIsDialogIDVisible(false);
      } else if (answer !== correctAnswer) {
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
        answer={answer}
        errorMessage={errorMessage}
        selectedValue={selectedQuestion}
        setSelectedValue={setSelectedQuestion}
        onChange={UpdateAnswer}
        onClick={handleConfirm}
      />
      {
        <AlarmID
          open={isDialogIDVisible}
          $setIsDialogIDVisible={setIsDialogIDVisible}
        />
      }
    </div>
  );
};
