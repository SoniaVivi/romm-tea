import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../posts/postSlice";
import usersReducer from "../users/userSlice";

export default configureStore({
  reducer: {
    post: postsReducer,
    user: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
