import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DefaultProfile } from '../../assets/images/Profile.svg';

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f5f5f5;
  margin: 0 auto 5px;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  & svg {
    width: 70%;
    height: 70%;
    object-fit: cover;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileButton = styled.button`
  position: absolute;
  bottom: 23px;
  right: 23px;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  // background-color: #4064e6;
  background-color: transparent;
  color: #4064e6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translate(50%, 50%);
  z-index: 10;
  &:hover {
    background-color: rgb(228, 233, 238);
  }
`;

const Profile = ({ profileImage, onImageChange, isEditing }) => (
  <ProfileContainer>
    <ProfileImage>
      {profileImage && profileImage !== 'temp_profile' ? (
        typeof profileImage === 'string' &&
        profileImage.startsWith('data:image') ? (
          <img src={profileImage} alt="Profile" />
        ) : (
          <img
            src={`${process.env.REACT_APP_API_URL}${profileImage}`}
            alt="Profile"
          />
        )
      ) : (
        <DefaultProfile />
      )}
    </ProfileImage>
    {!isEditing && (
      <>
        <ProfileButton
          htmlFor="profile-upload"
          onClick={() => document.getElementById('fileInput').click()}
        >
          <CameraAltRoundedIcon />
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={onImageChange}
          />
        </ProfileButton>
      </>
    )}
  </ProfileContainer>
);

export default Profile;
