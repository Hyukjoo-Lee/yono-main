import CommonDialog from '../../common/CommonDialog';
export function AlarmPw() {
  return (
    <div>
      <CommonDialog
        $visible={true}
        width="500px"
        height="200px"
        text2="취소"
        width1="100px"
        children="000님의 임시 비밀번호는 000입니다."
        $Contentwidth="450px"
        $Contentheight="90px"
        fontSize="20px"
      />
    </div>
  );
}
export default AlarmPw;
