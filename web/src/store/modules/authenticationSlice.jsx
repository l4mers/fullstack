import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthentication } = authenticationSlice.actions;

export const selectIsAuthenticated = (state) =>
  state.authentication.isAuthenticated;

export default authenticationSlice.reducer;
