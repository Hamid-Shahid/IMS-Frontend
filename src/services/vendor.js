import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/index";

export const getAllVendors = createAsyncThunk(
  "vendors/getAllVendors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/vendors`);
      return data.vendors;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVendorsByPagination = createAsyncThunk(
  "vendors/getVendorsByPagination",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/vendors/vendors-detail/`, {
        params: { page, limit },
      });
      return {
        vendors: data.vendors,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalVendors: data.totalVendors,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getVendorById = createAsyncThunk(
  "vendors/getVendorById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/vendors/${id}`);
      return data.vendor;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createVendor = createAsyncThunk(
  "vendors/createVendor",
  async (vendor, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/vendors/add-vendor`,
        vendor
      );
      toast.success(data.message);
      return data.vendor;
    } catch (error) {
      console.log(error)
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateVendor = createAsyncThunk(
  "vendors/updateVendor",
  async ({ id, vendor }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/vendors/${id}`, vendor);
      toast.success(data.message);
      return data.updatedVendor;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteVendor = createAsyncThunk(
  "vendors/deleteVendor",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/vendors/${id}`);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);
