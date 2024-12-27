import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ReactComponent as ProfileIcon } from '../../assets/images/Profile.svg';
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
  overflow: hidden;
  & svg {
    width: 70%;
    height: 70%;
  }
  & img {
    width: 100&;
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

const Profile = ({ profileImage, onImageChange }) => {
  return (
    <ProfileContainer>
      <ProfileImage>
        {profileImage ? (
          <img src={profileImage} alt="Profile" />
        ) : (
          <ProfileIcon />
        )}
      </ProfileImage>
      <ProfileButton
        component="label"
        htmlFor="profile-upload"
        onClick={() => console.log('프로필 버튼 클릭!')}
      >
        +
        <input
          type="file"
          id="profile-upload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={onImageChange}
        />
      </ProfileButton>
    </ProfileContainer>
  );
};

export default Profile;
