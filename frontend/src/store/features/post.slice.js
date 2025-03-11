import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  error: null,
  isLoading: false,
};

export const allPost = createAsyncThunk(
  "post/allPost",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/post/all-post");
      const { posts, questions, collaborations } = res.data;

      const allPost = [...posts,...questions,...collaborations].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return allPost;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/post/create-post", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(allPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
