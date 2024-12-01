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
        height="200px"
        width1="100px"
        children="000님의 아이디는 000입니다"
        fontSize="20px"
        onClick={ConfirmIDDialog}
        onClose={ConfirmIDDialogClose}
      />
    </div>
  );
};
