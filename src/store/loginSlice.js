import { createSlice } from "@reduxjs/toolkit";

let User = JSON.parse(window.localStorage.getItem("user"));
if (!User) User = {};

const initialState = {
  user: User,
};

let loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const loginSliceActions = loginSlice.actions;

export default loginSlice;
