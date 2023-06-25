import { createSlice } from "@reduxjs/toolkit";
const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
const initialState = {
  // token: localStorage.getItem("tokenNetwork")
  token: getCookie("token"),
  userName: getCookie("userName"),
  roleId: getCookie("roleId"),
  roleName: getCookie("roleName"),
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.roleId = action.payload.roleId;
      state.roleName = action.payload.roleName;
    },
    removeAuth: (state) => {
      state.token = null;
      state.userName = null;
      state.roleId = null;
      state.roleName = null;
    },
  },
});

export const { addAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
