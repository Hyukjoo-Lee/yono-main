import React, { useState } from 'react';
import CustomButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import ImageGallery from './ImageSelect';
import styled from 'styled-components';

import image1 from '../../assets/images/Character1.png';
import image2 from '../../assets/images/Character2.png';
import image3 from '../../assets/images/Character3.png';
import image4 from '../../assets/images/Character4.png';

const images = [image1, image2, image3, image4];

const StyledHr = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 15px 0;
`;

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

const Section = styled.div`
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
  width: 100%;
`;

const TitleStyle = styled.p`
  font-size: 16px;
  margin-bottom: 6px;
  margin-top: 0px;
`;

const TextStyle = styled.p`
  font-size: 18px;
  margin-bottom: 0px;
  margin-top: 0px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0;
  text-align: center;
  width: 100%;
`;

const CheckUserInfo = ({
  userName,
  userId,
  originPassword,
  email,
  nickname,
  Target_Expenditure_Amout,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [userInfo, setUserInfo] = useState({
    userName: userName || ``,
    nickname: nickname || ``,
    userId: userId || '',
    email: email || '',
    Target_Expenditure_Amout: Target_Expenditure_Amout || '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setPasswordError('');
  };

  const cancelEdit = () => {
    userInfo.userName = userName;
    userInfo.nickname = nickname;
    userInfo.userId = userId;
    userInfo.email = email;
    userInfo.Target_Expenditure_Amout = Target_Expenditure_Amout;
    userInfo.password = '';
    userInfo.newPassword = '';
    userInfo.confirmPassword = '';
    setIsEditing(!isEditing);
  };

  const isFormValid = () => {
    for (const key in userInfo) {
      if (userInfo[key].trim() === '') {
        return 1;
      }
    }

    if (userInfo.newPassword !== userInfo.confirmPassword) {
      return 2;
    }
  };

  const save = () => {
    if (isFormValid() === 1) {
      setPasswordError('모든 정보를 입력해주세요!');
      return;
    } else if (originPassword !== userInfo.password) {
      setPasswordError('기존 비밀번호가 일치하지 않습니다!');
      return;
    } else if (isFormValid() === 2) {
      setPasswordError('비밀번호 확인이 일치하지 않습니다!');
      return;
    }
    // 수정사항 저장 로직 추가 필요
    setIsEditing(!isEditing);
  };
  const deleteId = () => {};

  const disabledIntputProps = {
    disabled: true,
    background: '#F5F5F5',
    width: '350px',
  };

  const abledInputProps = {
    width: '350px',
  };

  const handleChange = (key, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === 'newPassword' || key === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const commonButtonProps = {
    width: '100px',
    height: '38px',
  };

  return (
    <Root>
      {isEditing ? (
        <Section>
          <>
            <TitleStyle>이름</TitleStyle>
            <TextStyle>{userName}</TextStyle>
          </>
          <StyledHr />
          <>
            <TitleStyle>닉네임</TitleStyle>
            <TextStyle>{nickname}</TextStyle>
          </>
          <StyledHr />
          <>
            <TitleStyle>아이디</TitleStyle>
            <TextStyle>{userId}</TextStyle>
          </>
          <StyledHr />
          <>
            <TitleStyle>이메일</TitleStyle>
            <TextStyle>{email}</TextStyle>
          </>
          <StyledHr />
          <>
            <TitleStyle>이번 달 목표 지출금액</TitleStyle>
            <TextStyle>{Target_Expenditure_Amout}</TextStyle>
          </>
        </Section>
      ) : (
        <>
          <CommonInput
            value={userInfo.userName}
            placeholder="이름을 입력하세요"
            text="이름"
            {...disabledIntputProps}
          />
          <CommonInput
            value={userInfo.nickname}
            placeholder="닉네임을 입력하세요"
            text="닉네임"
            onChange={(e) => handleChange('nickname', e.target.value)}
            {...abledInputProps}
          />

          <StyledHr />

          <CommonInput
            value={userInfo.userId}
            placeholder="아이디를 입력하세요"
            text="아이디"
            {...disabledIntputProps}
          />

          <CommonInput
            text="기존 비밀번호 입력"
            placeholder="기존 비밀번호 입력하세요"
            value={userInfo.password}
            onChange={(e) => handleChange('password', e.target.value)}
            {...abledInputProps}
          />

          <CommonInput
            text="새로운 비밀번호 입력"
            placeholder="새로운 비밀번호를 입력하세요"
            value={userInfo.newPassword}
            onChange={(e) => handleChange('newPassword', e.target.value)}
            {...abledInputProps}
          />

          <CommonInput
            text="비밀번호 확인"
            placeholder="비밀번호 확인"
            value={userInfo.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            {...abledInputProps}
          />

          <CommonInput
            value={userInfo.email}
            text="이메일"
            placeholder="이메일을 입력하세요"
            onChange={(e) => handleChange('email', e.target.value)}
            {...abledInputProps}
          />

          <CommonInput
            value={userInfo.Target_Expenditure_Amout}
            text="이번 달 목표 지출금액"
            placeholder="이번 달 목표 지출금액을 입력하세요"
            onChange={(e) =>
              handleChange('Target_Expenditure_Amout', e.target.value)
            }
            {...abledInputProps}
          />

          <Root2>
            캐릭터 선택
            <ImageGallery images={images} />
          </Root2>

          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        </>
      )}

      <Button>
        <CustomButton
          text={isEditing ? '수정' : '저장'}
          onClick={isEditing ? toggleEdit : save}
          {...commonButtonProps}
        />

        <CustomButton
          text={isEditing ? '회원 탈퇴' : '취소'}
          onClick={isEditing ? deleteId : cancelEdit}
          {...commonButtonProps}
        />
      </Button>
    </Root>
  );
};

export default CheckUserInfo;
