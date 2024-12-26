import CommonDialog from '../../../common/CommonDialog';
import { useNavigate } from 'react-router-dom';

const SignUpSuccessDialog = ({ open, setSuccessVisible }) => {
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
        children="회원가입이 완료되었습니다."
        fontSize="23px"
        onClose={closeLogin}
        onClick={closeLogin}
      />
    </div>
  );
};
export default SignUpSuccessDialog;
