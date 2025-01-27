import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteUser } from '../../apis/userApi';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import {
  EMAIL_REGEX_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
  SPENDINGTARGET_REGEX_MESSAGE,
} from '../../common/Message';
import { logoutUser, updateUserProfile } from '../../redux/actions/userAction';
import { useDispatch } from 'react-redux';
import theme from '../../theme/theme';
import SearchAddressDialog from '../auth/modal/SearchAddressDialog';
import PasswordDialog from './PasswordDialog';
import Profile from './Profile';
import CommonDialog from '../../common/CommonDialog';

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
  width: 100%;
  margin-bottom: 15px;
`;

const DeleteButtonContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ButtonWrapper = styled.div`
  position: relative;
  margin-left: 15px;
`;

const InputUserIdBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CheckUserInfo = ({ users }) => {
  console.log(users);
  const [profileImage, setProfileImage] = useState(users.profile);
  const [previewImage, setPreviewImage] = useState(users.profile);
  const [isEditing, setIsEditing] = useState(true);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({
    ...users,
    originPassword: '',
  });

  useEffect(() => {
    setUserInfo({
      userNum: users.userNum,
      userId: users.userId || '',
      originPassword: '',
      email: users.email || '',
      name: users.name || '',
      address: users.address || '',
      detailAddress: users.detailAddress || '',
      postcode: users.postcode || '',
      spendingTarget: users.spendingTarget || 0,
      profile: users.profile || '',
      createdAt: users.createdAt || '',
    });

    setPreviewImage(users.profile);

    if (!isShowDialog) {
      document.getElementById('root').removeAttribute('inert');
    }
  }, [users, isShowDialog]);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileDelete = () => {
    setProfileImage('temp_profile');
    setPreviewImage(null);
    console.log('profileImage: ' + profileImage);
    console.log('previewImage: ' + previewImage);
  };

  const handleAddressSelect = (address) => {
    setUserInfo((prev) => ({ ...prev, address }));
    setIsAddressModalOpen(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setPasswordError('');
  };

  const cancelEdit = () => {
    setProfileImage(users.profile);
    setPreviewImage(users.profile);

    setUserInfo({
      userNum: users.userNum,
      userId: users.userId || '',
      originPassword: '',
      email: users.email || '',
      name: users.name || '',
      address: users.address || '',
      detailAddress: users.detailAddress || '',
      postcode: users.postcode || '',
      spendingTarget: users.spendingTarget || '',
      profile: users.profile || '',
      createdAt: users.createdAt || '',
    });

    setIsEditing(!isEditing);
  };

  const isFormValid = () => {
    for (const key in userInfo) {
      if ((userInfo[key] + '').trim() === '') {
        return false;
      }
    }
    return true;
  };

  const navigate = useNavigate();

  const inputRegexs = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[*@#$%^&+=!]).{8,}$/,
    spendingTarget: /^[0-9]*$/,
  };

  const save = async () => {
    let isInvalid = true;

    if (!isFormValid()) {
      setPasswordError('모든 정보를 입력해주세요!');
      isInvalid = false;
    } else if (users.password !== userInfo.originPassword) {
      setPasswordError(PASSWORD_MISMATCH_MESSAGE);
      isInvalid = false;
    }

    Object.keys(userInfo).forEach((field) => {
      if (field === 'email' && !inputRegexs.email.test(userInfo.email)) {
        setPasswordError(EMAIL_REGEX_MESSAGE);
        isInvalid = false;
      } else if (
        field === 'spendingTarget' &&
        !inputRegexs.spendingTarget.test(userInfo.spendingTarget)
      ) {
        setPasswordError(SPENDINGTARGET_REGEX_MESSAGE);
        isInvalid = false;
      }
    });

    if (!isInvalid) return;

    const updatedUserInfo = {
      ...userInfo,
      password: userInfo.originPassword,
      originPassword: undefined,
    };

    const formData = new FormData();
    formData.append('userInfo', JSON.stringify(updatedUserInfo));
    if (profileImage instanceof File) {
      formData.append('profileImage', profileImage);
    } else {
      formData.append('profileText', profileImage);
    }

    try {
      await dispatch(updateUserProfile(formData));
      navigate(0);
    } catch (error) {
      console.error('유저 정보 변경 오류', error);
    }
  };

  const dispatch = useDispatch();

  const checkDeleteId = () => {
    setIsDeleteDialog(true);
  };

  const deleteId = async () => {
    navigate('/');
    dispatch(logoutUser());
    await deleteUser(userInfo.userNum);
  };

  const disabledInputProps = {
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
  };

  const handleInputChange = (e, field) => {
    setUserInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const commonButtonProps = {
    width: '100px',
    height: '38px',
  };

  const nonEditField = [
    { title: '아이디', value: users.userId },
    { title: '이름', value: users.name },
    { title: '이메일', value: users.email },
    { title: '일일 목표 지출금액', value: users.spendingTarget },
    { title: '주소', value: users.address },
    { title: '상세주소', value: users.detailAddress },
  ];

  const editField = [
    {
      name: 'name',
      text: '이름',
      placeholder: '이름을 입력하세요',
      disabled: true,
    },
    {
      name: 'email',
      text: '이메일',
      placeholder: '이메일을 입력하세요',
      disabled: false,
    },
    {
      name: 'spendingTarget',
      text: '일일 목표 지출금액',
      placeholder: '일일 목표 지출금액을 입력하세요',
      disabled: false,
    },
  ];

  return (
    <Root>
      {isEditing ? (
        <Section>
          <Profile
            profileImage={profileImage}
            onImageChange={handleProfileChange}
            isEditing={isEditing}
          />

          {nonEditField.map((field, index) => (
            <InnerSection key={index}>
              <TitleStyle>{field.title}</TitleStyle>
              <TextStyle>{field.value}</TextStyle>
              <StyledHr />
            </InnerSection>
          ))}
        </Section>
      ) : (
        <>
          <Profile
            profileImage={previewImage}
            onImageChange={handleProfileChange}
            isEditing={isEditing}
          />
          <DeleteButtonContainer>
            <CommonButton
              width="50px"
              height="30px"
              text="프로필 삭제"
              fontSize="10px"
              color={theme.color.blue}
              background="transparent"
              $borderRadius="4px"
              $borderColor={theme.color.blue}
              $hoverBk="transparent"
              $hoverColor={theme.color.blue}
              onClick={handleProfileDelete}
            />
          </DeleteButtonContainer>
          <InnerSection>
            <CommonInput
              value={userInfo.userId}
              text="아이디"
              placeholder="아이디를 입력하세요"
              type="text"
              onChange={(e) => handleChange('userId', e.target.value)}
              {...disabledInputProps}
            />
            <StyledHr />
          </InnerSection>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsShowDialog(true);
            }}
          >
            <InputUserIdBox>
              <CommonInput
                placeholder="기존 비밀번호를 입력하세요"
                text="기존 비밀번호"
                type="password"
                value={userInfo.originPassword}
                {...abledInputProps}
                width="100%"
                onChange={(e) => handleInputChange(e, 'originPassword')}
                autoComplete="off"
              />
              <ButtonWrapper>
                <CommonButton
                  width="100px"
                  height="40px"
                  text="변경"
                  fontSize={theme.fontSize.base}
                  type="submit"
                />
              </ButtonWrapper>
            </InputUserIdBox>
          </form>

          <InnerSection>
            <StyledHr />
          </InnerSection>

          {editField.map((field, index) => (
            <InnerSection key={index}>
              <CommonInput
                value={userInfo[field.name]}
                text={field.text}
                placeholder={field.placeholder}
                type={field.type}
                onChange={(e) => handleChange(field.name, e.target.value)}
                {...(field.disabled ? disabledInputProps : abledInputProps)}
              />
              <StyledHr />
            </InnerSection>
          ))}

          <InnerSection>
            <InputUserIdBox>
              <CommonInput
                placeholder="주소를 입력하세요"
                text="주소"
                value={userInfo.address}
                {...abledInputProps}
                width="100%"
                onChange={(e) => handleInputChange(e, 'address')}
              />
              <ButtonWrapper>
                <CommonButton
                  width="100px"
                  height="40px"
                  text="주소검색"
                  fontSize={theme.fontSize.base}
                  onClick={() => setIsAddressModalOpen(true)}
                />
              </ButtonWrapper>
            </InputUserIdBox>

            <StyledHr />
          </InnerSection>

          <InnerSection>
            <CommonInput
              placeholder="상세 주소를 입력하세요"
              text="상세 주소"
              value={userInfo.detailAddress}
              onChange={(e) => handleChange('detailAddress', e.target.value)}
              {...abledInputProps}
            />
            <StyledHr />
          </InnerSection>

          {passwordError && <ErrorText>{passwordError}</ErrorText>}

          <SearchAddressDialog
            open={isAddressModalOpen}
            setModalVisible={setIsAddressModalOpen}
            onCompletePost={handleAddressSelect}
            setFormData={setUserInfo}
          />
        </>
      )}

      <Button>
        <CommonButton
          text={isEditing ? '수정' : '저장'}
          onClick={isEditing ? toggleEdit : save}
          {...commonButtonProps}
        />

        <CommonButton
          text={isEditing ? '회원 탈퇴' : '취소'}
          onClick={isEditing ? checkDeleteId : cancelEdit}
          {...commonButtonProps}
        />
      </Button>

      <PasswordDialog
        isShowDialog={isShowDialog}
        onClose={() => {
          document.body.focus();
          document.getElementById('root').setAttribute('inert', true);
          setIsShowDialog(false);
        }}
        password={users.password}
        userInfo={userInfo}
      />

      <CommonDialog
        open={isDeleteDialog}
        text="탈퇴"
        onClose={() => setIsDeleteDialog(false)}
        onClick={deleteId}
        cancelBtn={true}
        children={<p>정말로 탈퇴하시겠습니까?</p>}
      />
    </Root>
  );
};

export default CheckUserInfo;
