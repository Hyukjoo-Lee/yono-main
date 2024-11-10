import React from "react";
import styled from "styled-components";
import CommonButton from "../../common/CommonButton";
import image from "../../assets/images/or.png";
import kakaoimage from "../../assets/images/kakao.png";
import google from "../../assets/images/google.png";
import IconButton from "./authComponents/IconButton"; // IButton을 정확히 import
import CommonInput from "../../common/CommonInput";

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 8px;
`;
const Label = styled.label`
  font-size: 16px;
  color: #464646;
`;

export function Login() {
  const Title = styled.div`
    position: absolute;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: #4064e6;
    font-weight: bold;
    margin-top: 286px;
    margin-left: 673px;
  `;

  return (
    <div>
      <Title>로그인</Title>

      <div
        style={{
          position: "absolute",
          justifyContent: "center",
          marginTop: "363px",
          marginLeft: "487px",
        }}
      >
        <CommonInput
          text="아이디"
          padding="10px"
          backgroundColor="#FFFFFF"
          fontSize="16px"
          color="#464646"
          fontWeight="bold"
          width="500px"
          height="54px"
          borderRadius="5px"
          fieldBorderColor="red"
          focusBorderWidth="10px"
          fieldHoverBorderColor="#4064E6"
          hoverBackground="#ffffff"
        />

        <CommonInput
          text="비밀번호"
          padding="10px"
          backgroundColor="#FFFFFF"
          fontSize="16px"
          color="#464646"
          fontWeight="bold"
          width="500px"
          height="54px"
          borderRadius="5px"
          fieldBorderColor="red"
          focusBorderWidth="10px"
          fieldHoverBorderColor="#4064E6"
          hoverBackground="#ffffff"
          marginTop="31px"
        />
      </div>
      <div>
        <div
          style={{
            position: "absolute",
            justifyContent: "center",
            marginTop: "548px",
            marginLeft: "487px",
          }}
        >
          <StyledCheckbox id="saveId" />
          <Label htmlFor="saveId">아이디저장</Label>
        </div>

        <div
          style={{
            position: "absolute",
            justifyContent: "center",
            marginTop: "548px",
            marginLeft: "773px",
            display: "flex",
            gap: "0px",
          }}
        >
          <CommonButton
            text="아이디 찾기"
            width="115px"
            height="30px"
            background="white"
            color="#464646"
            fontSize="16px"
            hoverBk="white"
            hoverColor="#4064E6"
          />
          <div style={{ position: "absolute", marginLeft: "0px" }}>|</div>
          <CommonButton
            text="비밀번호 찾기"
            width="128px"
            height="30px"
            background="white"
            color="#464646"
            fontSize="16px"
            hoverColor="#4064E6"
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          justifyContent: "center",
          marginTop: "584px",
          marginLeft: "486px",
          display: "flex",
          gap: "0px",
        }}
      >
        <CommonButton
          text="로그인"
          width="500px"
          height="54px"
          background="#4064E6"
          color="#ffffff"
          borderColor="#4064E6"
          borderRadius="5px"
          fontSize="20"
          // disabled,
          // onClick,
          hoverBk="white"
          hoverColor="black"
        />
        

        <div
          style={{ position: "absolute", marginLeft: "0px", marginTop: "70px" }}
        >
          <img
            src={image} // import한 이미지 경로 사용
            alt="My Image"
            style={{ marginTop: "-200px", marginLeft: "100px" }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            justifyContent: "center",
            marginTop: "150px",
            marginLeft: "0px",
            display: "flex",
            gap: "65px",
          }}
        >
          <IconButton imgesRoute={kakaoimage} />
          <IconButton imgesRoute={google} />
        </div>
      </div>
    </div>
  );
}
