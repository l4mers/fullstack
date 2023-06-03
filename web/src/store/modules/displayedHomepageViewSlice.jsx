import { createSlice } from '@reduxjs/toolkit';

const displayedHomepageViewSlice = createSlice({
  name: 'displayedHomepageView',
  initialState: {
    selectedView: 'Booking',
  },
  reducers: {
    setSelectedView: (state, action) => {
      state.selectedView = action.payload;
    },
  },
});

export const { setSelectedView } = displayedHomepageViewSlice.actions;
export default displayedHomepageViewSlice.reducer;
