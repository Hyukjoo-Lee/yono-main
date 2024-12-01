import CommonDialog from '../../common/CommonDialog';
import { useNavigate } from 'react-router-dom';
const SuccessLogin = ({ open, setSuccessVisible }) => {
  const navigate = useNavigate();
  const closeLogin = () => {
    setSuccessVisible(false);
    navigate('/');
  };
  return (
    <div>
      <CommonDialog
        open={open}
        width="400px"
        height="120px"
        children="환영합니다."
        ContentWidth="450px"
        ContentHeight="90px"
        fontSize="26px"
        onClose={closeLogin}
        onClick={closeLogin}
      />
    </div>
  );
};
export default SuccessLogin;
