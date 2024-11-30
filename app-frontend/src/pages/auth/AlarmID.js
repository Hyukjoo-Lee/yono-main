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
        $visible={true}
        width="500px"
        height="200px"
        text2="취소"
        width1="100px"
        content="000님의 아이디는 000입니다"
        $Contentwidth="450px"
        $Contentheight="90px"
        fontSize="20px"
      />
    </div>
  );
};
