import { ReactComponent as HandsClapping } from "../assets/images/HandsClapping.svg";
import CustomButton from "../common/CommonButton";
import AlarmPw1 from "../pages/auth/AlarmPw1";
import CommonRoot from "../common/CommonRoot";
export function MainPage() {
  return (
    <CommonRoot>
      {/* 테스팅 */}
      <CustomButton
        startIcon={<HandsClapping />}
        text="prop testing"
        fontSize="10px"
      />
      <AlarmPw1/>
    </CommonRoot>
  );
}
