import React from "react";
import { useState } from "react";
import CustomButton from "../../common/CommonButton";
import CommonInput from "../../common/CommonInput";
import ImageGallery from "./ImageSelect";
import styled from "styled-components";

import image1 from "../../assets/images/Character1.png";
import image2 from "../../assets/images/Character2.png";
import image3 from "../../assets/images/Character3.png";
import image4 from "../../assets/images/Character4.png";

const images = [
    image1,
    image2,
    image3,
    image4,
];

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
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

const CheckUserInfo = ({
    userId = "아이디",
    password = "비밀번호",
    nickname = "닉네임",
    Target_Expenditure_Amout = "테스트 목표 지출금액",
}) => {

    const [inputDisabled, setInputDisabled] = useState(true);
    const [backgroundColor, setbackgroundColor] = useState('#F5F5F5');

    const modify = () => {
        setInputDisabled(false);
        setbackgroundColor('#F8F9FE');
    };

    const commonInputProps = {
        disabled: inputDisabled,
        background: backgroundColor,
        width: '350px',
    };

    const commonButtonProps = {
        width : '100px',
        height : '38px',
    };

    // 1. 비밀번호 수정시에 질문에 대한 답변 추가해야됨
    // 2. 캐릭터 선택 input 아님
    // 3. 

    return (
        <>
        <Root>
            <CommonInput
                placeholder = {userId}
                text = "아이디"
                disabled = "true"
                background = "#F5F5F5"
                width = '350px'
            />

            <CommonInput
                placeholder = {password}
                text = "비밀번호"
                {...commonInputProps}
            />

            <CommonInput
                placeholder = {nickname}
                text = "닉네임"
                {...commonInputProps}
            />

            <CommonInput
                placeholder = {Target_Expenditure_Amout}
                text = "이번 달 목표 지출금액"
                {...commonInputProps}
            />

            <Root2>
                캐릭터 선택
                <ImageGallery images = {images}/>
            </Root2>
        </Root>
        
        

        <Button>
            <CustomButton
                text = '수정'
                onClick = {modify}
                {...commonButtonProps}
            />
            
            <CustomButton 
                text = '회원 탈퇴'
                // onClick = {}
                {...commonButtonProps}
            />

        </Button>

        </>
    );
};

export default CheckUserInfo;