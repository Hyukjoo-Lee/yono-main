import React, { useState } from "react";
import CustomButton from "../../common/CommonButton";
import CommonInput from "../../common/CommonInput";
import ImageGallery from "./ImageSelect";
import styled from "styled-components";

import image1 from "../../assets/images/Character1.png";
import image2 from "../../assets/images/Character2.png";
import image3 from "../../assets/images/Character3.png";
import image4 from "../../assets/images/Character4.png";

const images = [image1, image2, image3, image4];

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
  width: 350px;
  margin: 0 auto;
`;

const Root2 = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  gap: 5px;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
  gap: 15px;
`;

const InlineWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const HiddenSection = styled.div`
  margin-top: 10px;
  width: 350px;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  flex-direction: column;
  gap: 15px;
`;

const CheckUserInfo = ({
  userId = "아이디",
  password = "비밀번호",
  nickname = "닉네임",
  Target_Expenditure_Amout = "테스트 목표 지출금액",
}) => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#F5F5F5");
  const [showPasswordQuestion, setShowPasswordQuestion] = useState(false);
  const [showPasswordEdited, setShowPasswordEdited] = useState(false);

  const modify = () => {
    setInputDisabled(false);
    setBackgroundColor("#F8F9FE");
  };

  const togglePasswordQuestion = () => {
    setShowPasswordQuestion(!showPasswordQuestion);
  };

  const togglePasswordEdit= () => {
    setShowPasswordEdited(!showPasswordEdited);
  };

  const commonInputProps = {
    disabled: inputDisabled,
    background: backgroundColor,
    width: "350px",
  };

  const commonButtonProps = {
    width: "100px",
    height: "38px",
  };

  return (
    <Root>
      <CommonInput
        placeholder={userId}
        text="아이디"
        disabled="true"
        background="#F5F5F5"
        width="350px"
      />

      <InlineWrapper>
        <CommonInput
          placeholder={password}
          text="비밀번호"
          {...commonInputProps}
        />
        <CustomButton
          text="비밀번호 변경"
          onClick={togglePasswordQuestion}
          width="140px"
          height="38px"
        />
      </InlineWrapper>

      <HiddenSection visible={showPasswordQuestion}>
        <CommonInput
          placeholder="비밀번호 질문"
          disabled="true" 
          text="질문"
          width="350px"
        />

        <InlineWrapper>
          <CommonInput
            placeholder="비밀번호 답변"
            text="답변"
            width="350px"
          />
          <CustomButton
            text="확인"
            onClick={togglePasswordEdit}
            width="140px"
            height="38px"
          />
        </InlineWrapper>
        <CommonInput
          placeholder="수정할 비밀번호"
          text="수정할 비밀번호를 입력하세요"
          width="350px"
        />
      </HiddenSection>

      <CommonInput
        placeholder={nickname}
        text="닉네임"
        {...commonInputProps}
      />

      <CommonInput
        placeholder={Target_Expenditure_Amout}
        text="이번 달 목표 지출금액"
        {...commonInputProps}
      />

      <Root2>
        캐릭터 선택
        <ImageGallery images={images} />
      </Root2>
      
      <Button>
        <CustomButton
          text="저장"
          onClick={modify}
          {...commonButtonProps}
        />

        <CustomButton 
          text="회원 탈퇴"
          // onClick={}
          {...commonButtonProps}
        />
      </Button>
    </Root>
  );
};

export default CheckUserInfo;
