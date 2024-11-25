import CommonDialog from '../../common/CommonDialog';
import AlarmChangePw from '../auth/AlarmChangePw';
import { useState } from 'react';
export const AlarmPw = ($visiblePW) => {
  const [isDialogPWVisible, setIsDialogPWVisible] = useState(false);
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);

  const Confirm = () => {
    setIsDialogPWVisible(true);
    setIsConfirmClicked(true);
  };

  return (
    <div>
      <CommonDialog
        $visible={$visiblePW}
        width="500px"
        height="200px"
        children="000님의 임시 비밀번호는 000입니다."
        $Contentwidth="450px"
        $Contentheight="90px"
        fontSize="20px"
        onClick={Confirm}
        disabled={isConfirmClicked}
      />
      {isDialogPWVisible && <AlarmChangePw $visible={isDialogPWVisible} />}
    </div>
  );
};
