import { createSlice } from "@reduxjs/toolkit";
import { AuthLoginResponse } from "../types";

const initialState: AuthLoginResponse = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setLogin } = authSlice.actions;

export default authSlice.reducer;
