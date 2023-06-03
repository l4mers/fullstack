import { createSlice } from '@reduxjs/toolkit';

const displayedDashboardViewSlice = createSlice({
  name: 'displayedDashboardView',
  initialState: {
    views: {
      'Confirmed Guests': '/images/dashboard/confirmed-guests.svg',
      'Managing Venues': '/images/dashboard/managing-venues.svg',
      'Pending Reviews': '/images/dashboard/pending-reviews.svg',
      'Upcoming Stays': '/images/dashboard/upcoming-stays.svg',
    },
    selectedView: 'Confirmed Guests',
  },
  reducers: {
    setSelectedView: (state, action) => {
      state.selectedView = action.payload;
    },
  },
});

export const { setSelectedView } = displayedDashboardViewSlice.actions;
export default displayedDashboardViewSlice.reducer;
