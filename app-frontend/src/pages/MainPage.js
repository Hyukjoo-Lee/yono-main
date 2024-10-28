import CustomButton from "../common/CommonButton";
import { ReactComponent as HandsClapping } from "../assets/images/HandsClapping.svg";
import { Dialog } from "@mui/material";

export function MainPage() {
  return (
    <>
      {/* 테스팅 */}
      <CustomButton
        startIcon={<HandsClapping />}
        text="prop testing"
        fontSize="10px"
      />
      <Dialog />
    </>
  );
}
