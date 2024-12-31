import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccessful(state, action) {
      state.user = action.payload.data;
      state.isLoggedIn = true;
    },

    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },

    updateUserProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload.data };
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
