import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  isLoggedIn: sessionStorage.getItem('user') ? true : false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccessful(state, action) {
      state.user = action.payload.data;
      state.isLoggedIn = true;

      sessionStorage.setItem('user', JSON.stringify(action.payload.data));
    },

    logout(state) {
      state.user = null;
      state.isLoggedIn = false;

      sessionStorage.removeItem('user');
    },

    updateUserProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload.data };
      }

      sessionStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
