import styled from "styled-components";
import CommonInput from "../../common/CommonInput";
import { Box, Grid2 } from "@mui/material";
import CardSlider from "./CardSlider";

const FormBox = styled.form`
  width: 50%;
  border-radius: 5px;
  height: 518px;
  overflow-y: auto;
  background-color: ${(props) => props.background || "#EFF3FD"};
  padding: 40px;
`;

const CardRegFormBox = () => {
  const handleSubmit = () => {
    console.log("submit!");
  };
  return (
    <FormBox onSubmit={handleSubmit}>
      <Box width={"100%"}>
        <Grid2 container rowSpacing={1} columnSpacing={4}>
          <Grid2 size={24}>
            <CommonInput
              text="카드번호"
              placeholder="카드번호를 입력하세요 (-제외)"
              width="483px"
            />
          </Grid2>
          <Grid2 size={6}>
            <CommonInput text="CVC" placeholder="뒷면 서명란 끝 3자리" />
          </Grid2>
          <Grid2 size={6}>
            <CommonInput
              text="유효기간"
              placeholder="날짜를 입력하세요 (/제외)"
            />
          </Grid2>
          <Grid2 size={6}>
            <CommonInput text="영문이름" placeholder="영문이름를 입력하세요" />
          </Grid2>
          <Grid2 size={6}>
            <CommonInput text="카드선택" placeholder="카드를 선택하세요" />
          </Grid2>
          <Grid2 size={12}>
            <CardSlider />
          </Grid2>
        </Grid2>
      </Box>
    </FormBox>
  );
};

export default CardRegFormBox;
