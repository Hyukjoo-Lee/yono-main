import React, { useState } from 'react';
import CustomButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import styled from 'styled-components';
import { ReactComponent as Profile } from '../../assets/images/Profile.svg';

const StyledHr = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 5px;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 350px;
  margin: 0 auto;
`;

const Section = styled.div`
  width: 100%;
`;

const InnerSection = styled.div`
  margin-bottom: 15px;
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
  margin-left: 5px;
`;

const TextStyle = styled.p`
  font-size: 16px;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-left: 5px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0;
  text-align: center;
  width: 100%;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f5f5f5;
  margin: 0 auto 20px;
  & svg {
    width: 70%;
    height: 70%;
  }
`;

const ProfileButton = styled.button`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translate(50%, 50%);
  z-index: 10;
  &:hover {
    background-color: #0056b3;
  }
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
    background: '#f5f5f5',
    width: '350px',
    $borderColor: 'transparent',
    $marginLeft: '10px',
    $focusBorderColor: 'transparent',
  };

  const abledInputProps = {
    width: '350px',
    background: 'transparent',
    $borderColor: 'transparent',
    $marginLeft: '10px',
    $focusBorderColor: 'transparent',
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
          <InnerSection>
            <TitleStyle>이름</TitleStyle>
            <TextStyle>{userName}</TextStyle>
            <StyledHr />
          </InnerSection>
          <InnerSection>
            <TitleStyle>닉네임</TitleStyle>
            <TextStyle>{nickname}</TextStyle>
            <StyledHr />
          </InnerSection>
          <InnerSection>
            <TitleStyle>아이디</TitleStyle>
            <TextStyle>{userId}</TextStyle>
            <StyledHr />
          </InnerSection>
          <InnerSection>
            <TitleStyle>이메일</TitleStyle>
            <TextStyle>{email}</TextStyle>
            <StyledHr />
          </InnerSection>
          <InnerSection>
            <TitleStyle>이번 달 목표 지출금액</TitleStyle>
            <TextStyle>{Target_Expenditure_Amout}</TextStyle>
          </InnerSection>
        </Section>
      ) : (
        <>
          <ProfileContainer>
            <Profile />
            <ProfileButton onClick={() => console.log('프로필 버튼 클릭!')}>
              +
            </ProfileButton>
          </ProfileContainer>

          <InnerSection>
            <CommonInput
              value={userInfo.userId}
              placeholder="아이디를 입력하세요"
              text="아이디"
              {...disabledIntputProps}
            />
            <StyledHr />
          </InnerSection>

          <InnerSection>
            <CommonInput
              text="기존 비밀번호 입력"
              placeholder="기존 비밀번호 입력하세요"
              value={userInfo.password}
              onChange={(e) => handleChange('password', e.target.value)}
              {...abledInputProps}
            />
            <StyledHr />
          </InnerSection>

          <InnerSection>
            <CommonInput
              text="새로운 비밀번호 입력"
              placeholder="새로운 비밀번호를 입력하세요"
              value={userInfo.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              {...abledInputProps}
            />
            <StyledHr />
          </InnerSection>

          <InnerSection>
            <CommonInput
              text="비밀번호 확인"
              placeholder="비밀번호 확인"
              value={userInfo.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              {...abledInputProps}
            />
            <StyledHr />
          </InnerSection>

          <InnerSection>
            <CommonInput
              value={userInfo.userName}
              text="이름"
              placeholder="이름을 입력하세요"
              {...disabledIntputProps}
            />
            <StyledHr />
          </InnerSection>

          <InnerSection>
            <CommonInput
              value={userInfo.email}
              text="이메일"
              placeholder="이메일을 입력하세요"
              onChange={(e) => handleChange('email', e.target.value)}
              {...abledInputProps}
            />
            <StyledHr />
          </InnerSection>

          <InnerSection>
            <CommonInput
              value={userInfo.Target_Expenditure_Amout}
              text="이번 달 목표 지출금액"
              placeholder="이번 달 목표 지출금액을 입력하세요"
              onChange={(e) =>
                handleChange('Target_Expenditure_Amout', e.target.value)
              }
              {...abledInputProps}
            />
            <StyledHr />
          </InnerSection>

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
