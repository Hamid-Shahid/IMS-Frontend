import { createSlice } from "@reduxjs/toolkit";
import {
  createProduction,
  deleteProduction,
  getAllProductions,
  getProductionById,
  updateProduction,
  getProductionsByPagination, // Import the new action
} from "../services/production";

const initialState = {
  productions: [],
  production: null,
  loading: false,
  paginationLoading: false, // Separate loading state for pagination
  error: null,
  currentPage: 1, // Track the current page
  totalPages: 1, // Track the total number of pages
};

const productionSlice = createSlice({
  name: "production",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getAllProductions
    builder
      .addCase(getAllProductions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductions.fulfilled, (state, action) => {
        state.loading = false;
        state.productions = action.payload;
      })
      .addCase(getAllProductions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getProductionsByPagination
    builder
      .addCase(getProductionsByPagination.pending, (state) => {
        state.paginationLoading = true;
        state.error = null;
      })
      .addCase(getProductionsByPagination.fulfilled, (state, action) => {
        state.paginationLoading = false;
        state.productions = action.payload.productions; // Update productions
        state.currentPage = action.payload.currentPage; // Update current page
        state.totalPages = action.payload.totalPages; // Update total pages
      })
      .addCase(getProductionsByPagination.rejected, (state, action) => {
        state.paginationLoading = false;
        state.error = action.payload;
      });

    // Handle getProductionById
    builder
      .addCase(getProductionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductionById.fulfilled, (state, action) => {
        state.loading = false;
        state.production = action.payload;
      })
      .addCase(getProductionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle createProduction
    builder
      .addCase(createProduction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduction.fulfilled, (state, action) => {
        state.loading = false;
        state.productions = [...state.productions, action.payload];
      })
      .addCase(createProduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateProduction
    builder
      .addCase(updateProduction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduction.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update the specific production in the list
        state.productions = state.productions.map((production) =>
          production.productionId === action.payload.productionId
            ? action.payload
            : production
        );
      })
      .addCase(updateProduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle deleteProduction
    builder
      .addCase(deleteProduction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduction.fulfilled, (state, action) => {
        state.loading = false;
        state.productions = state.productions.filter(
          (production) => production.productionId !== action.payload
        );
      })
      .addCase(deleteProduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productionSlice.reducer;