import CommonDialog from '../../common/CommonDialog';
import { useNavigate } from 'react-router-dom';

export const AlarmID = ({ open, $setIsDialogIDVisible }) => {
  const navigate = useNavigate();

  const ConfirmIDDialog = () => {
    $setIsDialogIDVisible(true);
    navigate('/');
  };
  const ConfirmIDDialogClose = () => {
    $setIsDialogIDVisible(false);
    navigate('/');
  };

  return (
    <div>
      <CommonDialog
        open={open}
        width="500px"
        height="200px"
        children="000님의 아이디는 000입니다"
        ContentWidth="450px"
        ContentHeight="90px"
        fontSize="20px"
        onClick={ConfirmIDDialog}
        onClose={ConfirmIDDialogClose}
      />
    </div>
  );
};
