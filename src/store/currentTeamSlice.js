import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTeam: "",
};

let currentTeamSlice = createSlice({
  name: "currentTeamSlice",
  initialState: initialState,
  reducers: {
    setTeam(state, action) {
      state.currentTeam = action.payload;
    },
  },
});

export const currentTeamSliceActions = currentTeamSlice.actions;

export default currentTeamSlice;
