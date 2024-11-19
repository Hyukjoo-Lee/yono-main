import { ReactComponent as HandsClapping } from "../assets/images/HandsClapping.svg";
import CustomButton from "../common/CommonButton";
import CommonRoot from "../common/CommonRoot";
import CommonDialog from "../common/CommonDialog";
import { Login } from "./auth/Login";

export function MainPage() {
  return (
    <CommonRoot>
      {/* 테스팅 */}
      <Login $visible={true}/>
      <CustomButton
        startIcon={<HandsClapping />}
        text="prop testing"
        fontSize="10px"
      />
    </CommonRoot>
  );
}
