import { createSlice } from "@reduxjs/toolkit";
import {
  createProduction,
  deleteProduction,
  getAllProductions,
  getProductionById,
  updateProduction,
} from "../services/production";

const initialState = {
  productions: [],
  production: null,
  loading: false,
  error: null,
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
