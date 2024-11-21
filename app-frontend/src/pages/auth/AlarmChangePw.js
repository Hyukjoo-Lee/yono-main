import CommonDialog from "../../common/CommonDialog";
export function AlarmChangePw() {
  return (
    <div>     
        <CommonDialog
       $visible={true}
       width="500px"
       height="200px"
       text2="취소"
       width1="160px"
       content="비밀번호를 재설정 하십시오"
       $Contentwidth="450px"
       $Contentheight="90px"
       fontSize="20px"
       text1="비밀번호 재설정"
       />  
   </div>
  );
}
export default AlarmChangePw;
