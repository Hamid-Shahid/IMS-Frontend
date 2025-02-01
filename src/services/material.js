import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/index";

export const getAllMaterials = createAsyncThunk(
  "materials/getAllMaterials",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/materials`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMaterialById = createAsyncThunk(
  "materials/getMaterialById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/materials/${id}`);
      return data.material;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMaterial = createAsyncThunk(
  "materials/createMaterial",
  async (material, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/materials/add-material`,
        material
      );
      toast.success(data.message);
      return data.material;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateMaterial = createAsyncThunk(
  "materials/updateMaterial",
  async ({id, material}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/materials/${id}`, material);
      toast.success(data.message);
      return data.updatedMaterial;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMaterial = createAsyncThunk(
  "materials/deleteMaterial",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/materials/${id}`);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response.data?.message);
      return rejectWithValue(error.message);
    }
  }
);
