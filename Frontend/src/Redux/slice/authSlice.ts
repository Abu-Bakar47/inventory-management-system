import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  loginFn,
  registerationFn,
  type registerDetails,
} from "../../services/auth";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { toast } from "react-toastify";

export interface UserState {
  registrationStatus: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userDetails: UserDetails | null;
  loading: boolean;
  role: string | null;
  token: string | null;
  userId: string | null;
  email: string | null;
  mobile: string | null;
  isAuthenticated: boolean;
}

interface RegisterResponse {
  message: string;
  userId: string;
  email: string;
  registrationStatus: string;
}

interface UserDetails {
  userId: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
}

interface LoginResponse {
  user: UserDetails; 
  // accessToken: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export const registerThunk = createAsyncThunk<
  RegisterResponse,
  registerDetails,
  { rejectValue: string }
>("user/register", async (registerData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<RegisterResponse> = await registerationFn(
      registerData
    );
    // console.log("responseFromApi",response)
    toast.success("Registration successful!");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data);
      return rejectWithValue(error.response.data as string);
    }
    return rejectWithValue("An unknown error occurred during registration.");
  }
});

// Async thunk for login
export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginParams,
  { rejectValue: string }
>("user/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<LoginResponse> = await loginFn({
      email,
      password,
    });
    toast.success("Logged In successful!");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data);
      return rejectWithValue(error.response.data as string);
    }
    return rejectWithValue("An unknown error occurred during login.");
  }
});


const initialState: UserState = {
  role: null,
  token: localStorage.getItem("token") || null,
  userDetails: null,
  userId: null,
  email: null,
  mobile: null,
  loading: false,
  error: null,
  status: "idle",
  registrationStatus: null,
  isAuthenticated: false,
  // selectedStore:storeId
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.role = null),
        (state.token = null),
        (state.userDetails = null),
        (state.status = "idle"),
        (state.error = null),
        (state.isAuthenticated = false),
        localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          // console.log("action",action)
          state.status="succeeded";
          state.loading = false;
          state.registrationStatus = action.payload.registrationStatus;
          state.error = null;
        }
      )
      // for Login
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          // console.log("accessToken",action.payload.accessToken)
          state.status = "succeeded";
          state.loading = false;
          state.error = null;
          // state.token = action.payload.accessToken;
          state.userDetails = action.payload.user;
          state.isAuthenticated = true;
          // localStorage.setItem("token", action.payload.accessToken);
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.loading=false;
        state.error = action.payload ?? "An unknown error occurred";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
