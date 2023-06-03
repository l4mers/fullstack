import { createSlice } from "@reduxjs/toolkit";

export const venuesSlice = createSlice({
  name: "venues",
  initialState: {
    filteredVenues: [],
    venueSearch: "",
    startDate: "",
    endDate: "",
    guestValue: "",
  },
  reducers: {
    setFilteredVenues: (state, action) => {
      state.filteredVenues = action.payload;
    },
    setVenueSearch: (state, action) => {
      state.venueSearch = action.payload;
    },
    setVenueStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setVenueEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setVenueGuestValue: (state, action) => {
      state.guestValue = action.payload;
    },
  },
});

export const {
  setFilteredVenues,
  setVenueSearch,
  setVenueStartDate,
  setVenueEndDate,
  setVenueGuestValue,
} = venuesSlice.actions;

export default venuesSlice.reducer;
