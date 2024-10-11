import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload)
    },
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('token')
      state.token = ""
    },
  },
});

export const { setUser, setIsLoggedIn, setToken, setLogout } = authSlice.actions;
export default authSlice.reducer;
