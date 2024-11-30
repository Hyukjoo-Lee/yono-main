import CommonDialog from '../../common/CommonDialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AlarmID = ({ Open }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(Open); // 다이얼로그 상태 관리

  const handleClick = () => {
    setIsOpen(true);
    navigate('/');
  };
  return (
    <div>
      <CommonDialog
        Open={isOpen}
        width="500px"
        height="200px"
        children="000님의 아이디는 000입니다"
        ContentWidth="450px"
        ContentHeight="90px"
        fontSize="20px"
        onClick={handleClick}
      />
    </div>
  );
};
