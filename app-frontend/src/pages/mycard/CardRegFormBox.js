import styled from "styled-components";
import CommonInput from "../../common/CommonInput";
import CommonSelect from "../../common/CommonSelect";
import { Box, Grid2 } from "@mui/material";
import CardSlider from "./CardSlider";

const FormBox = styled.form`
  width: 100%;
  border-radius: 5px;
  height: 567px;
  overflow-y: auto;
  background-color: ${(props) => props.background || "#EFF3FD"};
`;

const CardRegFormBox = () => {
  const handleSubmit = () => {
    console.log("submit!");
  };
  return (
    <FormBox onSubmit={handleSubmit}>
      <Box style={{padding: "50px"}}>
        <Grid2 container rowSpacing={1} columnSpacing={4}>
          <Grid2 size={24}>
            <CommonInput
              margin="0px"
              text="카드번호"
              placeholder="카드번호를 입력하세요 (-제외)"
              width="418px"
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
            <CommonInput text="영문이름" placeholder="영문이름을 입력하세요" />
          </Grid2>
          <Grid2 size={6}>
            <CommonSelect
             options={[
                { value: "option_1", label: "삼성카드" },
                { value: "option_2", label: "농협카드" },
                { value: "option_3", label: "신한카드" },
              ]}
              text="카드선택"
              margin="0px 0px 0px 0px"
              labelColor={"#4a4a4a"}
               />
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
