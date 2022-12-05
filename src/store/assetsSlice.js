import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
};

let assetsSlice = createSlice({
  name: "assetsSlice",
  initialState: initialState,
  reducers: {
    setAssets(state, action) {
      state.assets = action.payload;
    },
  },
});

export const assetsSliceActions = assetsSlice.actions;

export default assetsSlice;
