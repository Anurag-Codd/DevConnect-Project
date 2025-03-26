import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user.slice";
import postSlice from "./features/post.slice";
import projectSlice from "./features/project.slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    project:projectSlice
  },
});

export default store;
