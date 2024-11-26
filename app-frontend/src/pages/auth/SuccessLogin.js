import CommonDialog from '../../common/CommonDialog';
const SuccessLogin = (props) => {
  const { $visible } = props;

  return (
    <div>
      <CommonDialog
        $visible={$visible}
        width="500px"
        height="200px"
        children="환영합니다."
        Contentwidth="450px"
        $Contentheight="90px"
        fontSize="20px"
      />
    </div>
  );
};
export default SuccessLogin;
