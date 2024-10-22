import CustomButton from "../common/CustomButton";
import { MainHeader } from "../common/MainHeader";
import { SubHeader } from "../common/SubHeader";

export function MainPage() {
  return (
    <>
      {/* 테스팅 */}
      <SubHeader />
      <MainHeader />
      <CustomButton text="prop testing" fontSize="10px" />
    </>
  );
}
