import { createSlice } from '@reduxjs/toolkit';

const carouselIndexSlice = createSlice({
  name: 'carouselIndex',
  initialState: {
    currentIndex: 1,
  },
  reducers: {
    setCarouselIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
  },
});

export const { setCarouselIndex } = carouselIndexSlice.actions;
export default carouselIndexSlice.reducer;
