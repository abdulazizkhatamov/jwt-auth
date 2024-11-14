// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    user: null
  },
  reducers: {
    authenticate: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
    }
  }
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
