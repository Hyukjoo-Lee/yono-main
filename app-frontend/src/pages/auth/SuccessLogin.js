import CommonDialog from "../../common/CommonDialog";
export function SuccessLogin() {
  return (
    <div>
      <CommonDialog
       $visible={true}
       width="500px"
       height="200px"
       text2="취소"
       width1="100px"
       content="로그인 성공하였습니다."
       Contentwidth="450px"
       $Contentheight="90px"
       $fontSize="20px"
       />  
      
    </div>
  );
}
export default SuccessLogin;
