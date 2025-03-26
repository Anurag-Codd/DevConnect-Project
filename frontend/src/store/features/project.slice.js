import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: [],
  member: [],
  error: null,
  isLoading: false,
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/project/project-list");
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const newProject = createAsyncThunk(
  "project/newProject",
  async (cretentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("project/new-project", { ...cretentials });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.admin = action.payload.admin;
        state.member = action.payload.member;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
