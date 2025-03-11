import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user.slice";
import postSlice from "./features/post.slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
});

export default store;
