import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/index";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products`);
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductsByPagination = createAsyncThunk(
  "products/getProductsByPagination",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products/product-detail`,{
        params:{page,limit},
      });
      return data; // Ensure your API returns `{ products, totalPages, currentPage }`
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
      return rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data.product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/products/add-product`,
        product
      );
      toast.success(data.message);
      return data.product;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/products/${id}`, product);
      toast.success(data.message);
      return data.updatedProduct;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/products/${id}`);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);
