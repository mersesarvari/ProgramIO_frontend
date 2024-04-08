import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// ! Get token from cookie
console.log("%c GET TOKEN FROM COOKIE", "color: lime; font-weight: bold;");
console.log(document.cookie);

const initialAddressState = {
  address: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialAddressState,
  reducers: {
    setAddress: (state, action) => {
      const { address } = action.payload;

      state.address = address;
    },
    clearAddress: (state) => {
      state.address = null;
    },
  },
});

export const { setAddress, clearAddress } = addressSlice.actions;

export default addressSlice.reducer;

export const selectCurrentAddress = (state: RootState) => state.address.address;
