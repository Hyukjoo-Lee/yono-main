import React from "react";
import CommonSelect from "../../../common/CommonSelect";
import styled from "styled-components";
import CustomButton from "../../../common/CommonButton";
import CommonInput from "../../../common/CommonInput";
import CommonRoot from "../../../common/CommonRoot";

const Rootin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 48px;
  font-family: Noto Sans;
  color: #4064e6;
  font-weight: bold;
`;

const FindForm = ({ find }) => {
  const selectOptions = [
    { value: "애완동물 이름은?", label: "애완동물 이름은?" },
    { value: "당신의 생일은?", label: "당신의 생일은" },
    { value: "당신이 좋아하는 음식은?", label: "당신이 좋아하는 음식은?" },
  ];

  return (
    <CommonRoot>
      <Rootin>
        <Title>{find}</Title>

        <div style={{ display: "block", marginBottom: "30px" }}>
          <CommonSelect
            text="질문선택"
            height="54px"
            width="500px"
            padding="10px"
            color="#464646"
            labelColor="#464646"
            options={selectOptions}
            find="질문을 선택하세요"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <CommonInput
              text="답변"
              color="#464646"
              width="500px"
              height="54px"
              focusBorderWidth="10px"
              focusBorderColor="#4064E6"
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <CustomButton
              text="확인"
              width="100px"
              height="40px"
              background="#4064E6"
              color="#ffffff"
              // borderColor="#4064E6"
              fontSize="20"
            />
            <CustomButton
              text="취소"
              width="100px"
              height="40px"
              background="#ffffff"
              color="#4064E6"
              // borderColor="1px"
              fontSize="20"
            />
          </div>
        </div>
      </Rootin>
    </CommonRoot>
  );
};
export default FindForm;
