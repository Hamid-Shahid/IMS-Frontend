import { createSlice } from "@reduxjs/toolkit";
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  getMaterialsByPagination, // Added import
} from "../services/material";

const initialState = {
  materials: [],
  material: null,
  loading: false,
  error: null,
  currentPage: 1, // For pagination
  totalPages: 1,
  totalMaterials: 0,
};

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getAllMaterials
    builder
      .addCase(getAllMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload;
      })
      .addCase(getAllMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getMaterialsByPagination
    builder
      .addCase(getMaterialsByPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMaterialsByPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload.materials;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalMaterials = action.payload.totalMaterials;
      })
      .addCase(getMaterialsByPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getMaterialById
    builder
      .addCase(getMaterialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMaterialById.fulfilled, (state, action) => {
        state.loading = false;
        state.material = action.payload;
      })
      .addCase(getMaterialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle createMaterial
    builder
      .addCase(createMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = [...state.materials, action.payload];
      })
      .addCase(createMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateMaterial
    builder
      .addCase(updateMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMaterial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle deleteMaterial
    builder
      .addCase(deleteMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = state.materials.filter(
          (material) => material._id !== action.payload
        );
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default materialSlice.reducer;
