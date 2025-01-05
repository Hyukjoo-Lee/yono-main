import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../apis/userApi';
import { userActions } from '../reducers/userReducer';

// 로그인
export const loginUser = createAsyncThunk(
  'user/login',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await userApi.login(formData);

      dispatch(userActions.loginSuccessful(response));
      return response;
    } catch (error) {
      console.error('로그인 실패: ', error);
      return rejectWithValue(error.response?.data || '로그인 오류');
    }
  },
);

// 로그아웃
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    dispatch(userActions.logout());
  },
);

export const updateUser = createAsyncThunk();
