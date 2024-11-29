import CommonDialog from '../../common/CommonDialog';
const SuccessLogin = (props) => {
  const { Open } = props;

  return (
    <div>
      <CommonDialog
        Open={Open}
        width="500px"
        height="200px"
        children="환영합니다."
        ContentWidth="450px"
        ContentHeight="90px"
        fontSize="20px"
      />
    </div>
  );
};
export default SuccessLogin;
