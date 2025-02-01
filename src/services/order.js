import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/index";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/orders`);
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/orders/${id}`);
      return data.order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/orders/add-order`, order);
      toast.success(data.message);
      return data.order;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, order }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/orders/${id}`, order);
      toast.success(data.message);
      return data.updatedOrder;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/orders/${id}`);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const recieveOrder = createAsyncThunk(
  "orders/recieveOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/orders/receive/${id}`);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);
