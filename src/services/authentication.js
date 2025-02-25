import toast from "react-hot-toast";
import axiosInstance from "../axios/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Register a new user
export const register = createAsyncThunk(
  "authentication/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/register", credentials);
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in registration");
      return rejectWithValue(error.message);
    }
  }
);

// Sign in an existing user
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

// Logout user
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

// Fetch users with pagination
export const getUsersByPagination = createAsyncThunk(
  "users/getUsersByPagination",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/users/user-detail?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
      return rejectWithValue(error.message);
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/users/${userId}`);
      toast.success("User deleted successfully");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
      return rejectWithValue(error.message);
    }
  }
);
