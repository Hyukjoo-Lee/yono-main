import CommonDialog from '../../common/CommonDialog';
const AlarmID = (props) => {
  const { $visible } = props;

  return (
    <div>
      <CommonDialog
        $visible={$visible}
        width="500px"
        height="200px"
        children="000님의 아이디는 000입니다"
        $Contentwidth="450px"
        $Contentheight="90px"
        fontSize="20px"
        navigateTo="/"
        navigateMain="/"
      />
    </div>
  );
};
export default AlarmID;
