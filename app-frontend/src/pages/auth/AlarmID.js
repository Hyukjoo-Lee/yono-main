import CommonDialog from '../../common/CommonDialog';

export const AlarmID = ({ Open }) => {
  return (
    <div>
      <CommonDialog
        $visible={true}
        width="500px"
        height="200px"
        text2="취소"
        width1="100px"
        content="000님의 아이디는 000입니다"
        $Contentwidth="450px"
        $Contentheight="90px"
        fontSize="20px"
      />
    </div>
  );
};
