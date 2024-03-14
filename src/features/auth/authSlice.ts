import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = {
        username: user.username,
        email: user.email,
        id: user._id,
        role: user.role,
      };
      //state.token = refreshToken;
    },

    logout: (state, action) => {
      console.log("[AuthSlice]: logout called");
      state.user = null;
      Cookies.remove("user");
      //state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
//export const selectCurrentToken = (state) => state.auth.token;
