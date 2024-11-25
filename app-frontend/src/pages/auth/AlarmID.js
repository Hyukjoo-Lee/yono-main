import CommonDialog from '../../common/CommonDialog';
export const AlarmID = ($visibleID) => {
  return (
    <div>
      <CommonDialog
        $visible={$visibleID}
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
