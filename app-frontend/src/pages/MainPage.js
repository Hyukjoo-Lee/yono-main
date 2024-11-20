import { ReactComponent as HandsClapping } from "../assets/images/HandsClapping.svg";
import CustomButton from "../common/CommonButton";
import CommonRoot from "../common/CommonRoot";
import {SignUp} from "./auth/SignUp";

export function MainPage() {
  return (
    <CommonRoot>
      {/* 테스팅 */}
      <CustomButton
        startIcon={<HandsClapping />}
        text="prop testing"
        fontSize="10px"
      />
            <SignUp/>

    </CommonRoot>

  );
}
