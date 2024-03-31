import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// ! Get token from cookie
console.log("%c GET TOKEN FROM COOKIE", "color: lime; font-weight: bold;");
console.log(document.cookie);

const initialAuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;

      state.user = user;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
