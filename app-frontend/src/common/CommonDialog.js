import React from "react";
import styled from "styled-components";
import CustomButton from "./CommonButton";

const DialogOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.$visible ? "block" : "none")}; 
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const DialogWrapper = styled.div`
  display: ${(props) => (props.$visible ? "flex" : "none")}; 
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 40%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000; /* 다이어로그가 배경 위에 표시되도록 */
`;

const DialogInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: ${(props) => (props.width ? props.width : "500px")};
  height: ${(props) => (props.height ? props.height : "500px")};
  max-width: 500px;
  max-height: 500px;

  margin: 0 auto;
  padding: 40px 20px;

`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: blue;
  }
`;
function Dialog({ className, $visible, content="내용을 입력하세요" }) {
  return (
    <div>
      <DialogOverlay  $visible={$visible} />
      <DialogWrapper className={className} tabIndex="-1" $visible={$visible} >
        <DialogInner tabIndex="0">
        <CloseButton>×</CloseButton>

          <div>{content }</div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              gap: "10px",
            }}
          >
            <CustomButton text="확인" width="100px" height="40px" />
            <CustomButton text="취소" width="100px" height="40px" />
          </div>
        </DialogInner>
      </DialogWrapper>
    </div>
  );
}
export default Dialog;
