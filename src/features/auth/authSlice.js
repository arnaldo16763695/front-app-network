import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("tokenNetwork")
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.token = action.payload;
    },
    removeAuth: (state) => {
      state.token = null;
    },
  },
});

export const { addAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
