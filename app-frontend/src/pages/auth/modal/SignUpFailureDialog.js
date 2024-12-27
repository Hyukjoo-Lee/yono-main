import CommonDialog from '../../../common/CommonDialog';

const SignUpFailureDialog = ({ open, setFailVisible }) => {
  const closeLogin = () => {
    setFailVisible(false);
  };

  return (
    <div>
      <CommonDialog
        open={open}
        width="400px"
        children="회원가입에 실패했습니다."
        fontSize="23px"
        onClose={closeLogin}
        onClick={closeLogin}
      />
    </div>
  );
};
export default SignUpFailureDialog;
