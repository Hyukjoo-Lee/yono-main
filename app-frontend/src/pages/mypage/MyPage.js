import CommonRoot from "../../common/CommonRoot";
import CommonPageInfo from "../../common/CommonPageInfo";
import CheckUserInfo from "./CheckUserInfo";

export function MyPage() {
  
  const userInfo = {
    userName: "테스트 이름",
    userId: "테스트 아이디",
    password: "*******",
    email: "테스트 이메일",
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