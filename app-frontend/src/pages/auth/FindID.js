import FindForm from './Component/FindForm';
import { AlarmID } from './AlarmID';
import { useState } from 'react';

export const FindID = () => {
  const find = '아이디 찾기';
  const [isDialogIDVisible, setIsDialogIDVisible] = useState(false);

  return (
    <div>
      <FindForm
        find={find}
        isDialogIDVisible={isDialogIDVisible}
        setIsDialogIDVisible={setIsDialogIDVisible}
      />
      {isDialogIDVisible && <AlarmID $visible={isDialogIDVisible} />}
    </div>
  );
};
