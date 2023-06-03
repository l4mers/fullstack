import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    details: "",
    isSuccessful: true,
    show: false,
  },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.details = action.payload.details;
      state.isSuccessful = action.payload.isSuccessful;
      state.show = true;
    },
    closeNotification: (state) => {
      state.show = false;
    },
  },
});

export const { setNotification, closeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
