import { ReactComponent as HandsClapping } from "../assets/images/HandsClapping.svg";
import CustomButton from "../common/CommonButton";
import CommonTabs from "../common/CommonTabs";

export function MainPage() {
  const items = [{text: "일별 통계"}, {text: "월별 통계"},{text: "목차별 통계"}]
  return (
    <>
      {/* 테스팅 */}
      <CustomButton
        startIcon={<HandsClapping />}
        text="prop testing"
        fontSize="10px"
      />
      <CommonTabs items={items}/>
    </>
  );
}
