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

      const allPost = [...posts, ...questions, ...collaborations].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
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

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const res = axiosInstance.delete(`/post/delete-post/${id}`);
      console.log(res.data);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const addLike = createAsyncThunk(
  "post/addLike",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/post/like/${id}`);
      return { postId: id, likes: res.data.likes };
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
export const dislike = createAsyncThunk(
  "post/dislike",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/post/dislike/${id}`);
      console.log(res.data);
      return { postId: id, dislikes: res.data.dislikes };
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateLikeState: (state, action) => {
      const { postId, likes } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        post.likes = likes;
      }
    },
    updateDislikeState: (state, action) => {
      const { postId, dislikes } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        post.dislikes = dislikes;
      }
    },
  },
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
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        const post = state.posts.find((post) => post._id === postId);
        if (post) {
          post.likes = likes;
        }
      })
      .addCase(addLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(dislike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dislike.fulfilled, (state, action) => {
        const { postId, dislikes } = action.payload;
        const post = state.posts.find((post) => post._id === postId);
        if (post) {
          post.dislikes = dislikes;
        }
      })
      .addCase(dislike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { updateLikeState, updateDislikeState } = postSlice.actions;
export default postSlice.reducer;
