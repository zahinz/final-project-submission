import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  userData: {},
  token: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: initialAuthState,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = initialAuthState;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
