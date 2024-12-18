import CommonDialog from '../../common/CommonDialog';

const FailSignUp = ({ open, setFailVisible }) => {
  const closeLogin = () => {
    setSuccessVisible(false);
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
export default FailSignUp;
