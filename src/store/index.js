import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import currentTeamSlice from "./currentTeamSlice";
import assetsSlice from "./assetsSlice";

let store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    currentTeam: currentTeamSlice.reducer,
    assets: assetsSlice.reducer,
  },
});

export default store;
