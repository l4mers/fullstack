import { createSlice } from "@reduxjs/toolkit";

const userMenuInfoSlice = createSlice({
  name: "userMenuInfo",
  initialState: {
    userMenuInfo: null,
  },
  reducers: {
    setUserMenuInfo: (state, action) => {
      state.userMenuInfo = action.payload;
    },
    setUserAvatar: (state, action) => {
      if (state.userMenuInfo) {
        state.userMenuInfo.avatar = action.payload;
      }
    },
  },
});

export const { setUserMenuInfo, setUserAvatar } = userMenuInfoSlice.actions;
export default userMenuInfoSlice.reducer;
