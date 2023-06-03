import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
  },
  reducers: {
    SET_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default loaderSlice.reducer;

const { SET_LOADING } = loaderSlice.actions;

export const setLoadingState = (loadingStatus) => (dispatch) => {
  dispatch(SET_LOADING(loadingStatus));
};
