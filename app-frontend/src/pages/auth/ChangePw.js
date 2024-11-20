import CommonDialog from "../../common/CommonDialog";
import CommonInput from "../../common/CommonInput";
export function ChangePw() {
  return (
    <div style={{ position: "relative" }}>

<CommonDialog
       $visible={true}
       width="500px"
       height="200px"
       text2="취소"
       width1="100px"
       content="비밀번호가 변경되었습니다"
       $Contentwidth="450px"
       $Contentheight="90px"
       fontSize="20px"
       /> 

    </div>
  );
}
export default ChangePw;
