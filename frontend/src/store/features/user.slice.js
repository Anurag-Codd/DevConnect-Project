import axiosInstance from "@/lib/axiosInstance";
import { auth } from "@/lib/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isAuthorized: false,
};

export const signup = createAsyncThunk(
  "user/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const { username, email, password } = credentials;
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const uid = response.user.uid;

      const res = await axiosInstance.post("/auth/signup", { uid, username, email });
      return res.data;
    } catch (error) {
      console.error("Signup Error:", error);
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Signup failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const response = await signInWithEmailAndPassword(auth, email, password);
      const uid = response.user.uid;

      const res = await axiosInstance.post("/auth/login", { uid, email });
      return res.data;
    } catch (error) {
      console.error("Login Error:", error);
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return "Logout successful";
    } catch (error) {
      console.error("Logout Error:", error);
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Logout failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthorized = !!action.payload;
      state.error = null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorized = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorized = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthorized = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, setIsLoading } = userSlice.actions;

export default userSlice.reducer;
