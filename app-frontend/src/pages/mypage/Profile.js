import React from 'react';
import { ReactComponent as DefaultProfile } from '../../assets/images/Profile.svg';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f5f5f5;
  margin: 0 auto 40px;
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
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #4064e6;
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

const Profile = ({ profileImage, onProfileChange, isEditing }) => {
  console.log(`${process.env.REACT_APP_API_URL}${profileImage}`);
  return (
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
        <ProfileButton
          htmlFor="profile-upload"
          onClick={() => document.getElementById('fileInput').click()}
        >
          +
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={onProfileChange}
          />
        </ProfileButton>
      )}
    </ProfileContainer>
  );
};

export default Profile;
