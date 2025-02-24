import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/index";

export const getAllProductions = createAsyncThunk(
  "productions/getAllProductions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/productions`);
      return data.productions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductionsByPagination = createAsyncThunk(
  "productions/getProductionsByPagination",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/productions/production-detail`, {
        params: { page, limit },
      });
      return data; // Ensure your API returns `{ productions, totalPages, currentPage }`
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch productions");
      return rejectWithValue(error.message);
    }
  }
);

export const getProductionById = createAsyncThunk(
  "productions/getProductionById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/productions/${id}`);
      return data.production;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduction = createAsyncThunk(
  "orders/createProduction",
  async (production, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/productions/add-production`,
        production
      );
      toast.success(data.message);
      return data.productions;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduction = createAsyncThunk(
  "orders/updateProduction",
  async ({ id, production }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/productions/${id}`,
        production
      );
      toast.success(data.message);
      return data.updatedProduction;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduction = createAsyncThunk(
  "orders/deleteProduction",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/productions/${id}`);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);
