import CommonRoot from "../../common/CommonRoot";
import CommonPageInfo from "../../common/CommonPageInfo";
import CheckUserInfo from "./CheckUserInfo";

export function MyPage() {
  
  const userInfo = {
    userId: "테스트 아이디",
    password: "테스트 비밀번호",
    nickname: "테스트 닉네임",
    Target_Expenditure_Amout: "500,000 원",
  };

  return (
    <CommonRoot>
      <CommonPageInfo
        title="마이 페이지"
        text={<p></p>}
      />
      <CheckUserInfo {...userInfo} />
    </CommonRoot>
  );
}