import React from "react";
import { useState } from "react";
import CustomButton from "../../common/CommonButton";
import CommonInput from "../../common/CommonInput";

const CheckUserInfo = ({
    userId = "아이디",
    password = "비밀번호",
    nickname = "닉네임",
    character = "캐릭터"
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
        <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap : '15px' }}>
            <CommonInput
                placeholder = {userId}
                text = "아이디"
                {...commonInputProps}
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
                placeholder = {character}
                text = "캐릭터"
                {...commonInputProps}
            />

            
        </div>
        

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '30px', gap : '15px'}}>
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

        </div>

        </>
    );
};

export default CheckUserInfo;