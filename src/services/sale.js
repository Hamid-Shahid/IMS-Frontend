import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/index";

export const getAllSales = createAsyncThunk(
  "sales/getAllSales",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/sales`);
      return data.sales;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSalesByPagination = createAsyncThunk(
  "sales/getSalesByPagination",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/sales/sales-detail/`, {
        params: { page, limit },
      });
      return {
        sales: data.sales,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalSales: data.totalSales,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getSaleById = createAsyncThunk(
  "sales/getSalesById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/sales/${id}`);
      return data.sale;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSale = createAsyncThunk(
  "sales/createSale",
  async (sale, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/sales/add-sale`, sale);
      toast.success(data.message);
      return data.sale;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateSale = createAsyncThunk(
  "sales/updateSale",
  async ({ id, sale }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/sales/${id}`, sale);
      toast.success(data.message);
      return data.updatedSale;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSale = createAsyncThunk(
  "sales/deleteSale",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/sales/${id}`);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error)
      return rejectWithValue(error.message);
    }
  }
);
