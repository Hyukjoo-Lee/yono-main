import React from "react";
import styled from "styled-components";
import CommonInput from "../../common/CommonInput";
import CustomButton from "../../common/CommonButton";
import image from "./images/or.png";
import kakaoimage from "./images/kakao.png";
import google from "./images/google.png";
import IconButton from "./Component/IconButton"; // IButton을 정확히 import
import CommonDialog from "../../common/CommonDialog";


const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 8px;
`;
const Label = styled.label`
  font-size: 16px;
  color: #464646;
`;
const Title = styled.div`
  font-size: 48px;
  font-family: Noto Sans;
  color: #4064e6;
  font-weight: bold;
`;

const LineStyle = styled.p`
  margin-right: 0px;
  font-size: 16px;
  color: #757575;
`;
export function Login() {
  return (
    <CommonDialog $visible={true}>
        <Title>로그인</Title>

        <div
          style={{
            display: "block",
          }}
        >
          <CommonInput
            text="아이디"
            background="#FFFFFF"
            fontSize="16px"
            color="#464646"
            width="500px"
            height="54px"
            borderRadius="5px"
            borderColor="#d7d7d7"
            focusBorderColor="#4064E6"
          />
          <CommonInput
            text="비밀번호"
            background="#FFFFFF"
            fontSize="16px"
            color="#464646"
            width="500px"
            height="54px"
            borderRadius="5px"
            borderColor="#d7d7d7"
            focusBorderColor="#4064E6"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "44%",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <StyledCheckbox id="saveId" />
            <Label htmlFor="saveId">아이디저장</Label>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <CustomButton
              text="아이디 찾기"
              width="50px"
              height="30px"
              background="white"
              color="#464646"
              fontSize="16px"
              hoverBk="white"
              hoverColor="#4064E6"
            />
            <LineStyle>|</LineStyle>
            <CustomButton
              text="비밀번호 찾기"
              width="140px"
              height="30px"
              background="white"
              color="#464646"
              fontSize="16px"
            />

          </div>
        </div>

        <div style={{ display: "block" }}>
          <CustomButton
            text="로그인"
            width="500px"
            height="54px"
            background="#4064E6"
            color="#ffffff"
            borderColor="#4064E6"
            borderRadius="5px"
            fontSize="20"
          />

          <div style={{ display: "block" }}>
            <img
              src={image} // import한 이미지 경로 사용
              alt="Or"
            />
          </div>

          <div
            style={{
              position: "relative",
              justifyContent: "center",
              display: "flex",
              gap: "65px",
            }}
          >
            <IconButton imgesRoute={kakaoimage} />
            <IconButton imgesRoute={google} />
          </div>
        </div>
    </CommonDialog>
  );
}
