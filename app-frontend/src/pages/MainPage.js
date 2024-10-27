import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";

export function MainPage() {
  return (
    <>
      {/* 테스팅 */}
      <CustomButton width="100px" borderRadius="8px" background="red" text="prop testing" fontSize="10px" />
      <CustomButton width="50px" borderRadius="8px" background="red" text="prop testing" fontSize="10px" />
      <CustomInput width ="150px" borderRadius="10px" type="text" fontSize="20px" background-color="red"/>
      <CustomInput width ="180px" borderRadius="10px" type="password" fontSize="20px" />
      </>
  );
}
