import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../users/userSlice";
import optionReducer from "./optionSlice";
import { postSlice } from "./postSlice";

export default configureStore({
  reducer: {
    [postSlice.reducerPath]: postSlice.reducer,
    user: usersReducer,
    option: optionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postSlice.middleware),
});
