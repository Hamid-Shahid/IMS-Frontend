import toast from "react-hot-toast";
import axiosInstance from "../axios/index";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const register = createAsyncThunk(
  "authentication/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/register", credentials);
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response.data.message || "Error in registration");
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "authentication/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/login", credentials);
      sessionStorage.setItem("session", data.data.accessToken);
      toast.success(data.message);
      return data.data.user;
    } catch (error) {
      toast.error("Error in Signing In");
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "authentication/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/logout");
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error("Error in Signing Out");
      return rejectWithValue(error.message);
    }
  }
);
