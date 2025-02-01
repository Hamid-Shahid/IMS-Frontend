import { createSlice } from "@reduxjs/toolkit";
import {
  createSale,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSale,
  getSalesByPagination, // Import the new async thunk
} from "../services/sale";

const initialState = {
  sales: [],
  sale: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalSales: 0,
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getAllSales
    builder
      .addCase(getAllSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(getAllSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getSaleById
    builder
      .addCase(getSaleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSaleById.fulfilled, (state, action) => {
        state.loading = false;
        state.sale = action.payload;
      })
      .addCase(getSaleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle createSale
    builder
      .addCase(createSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = [...state.sales, action.payload];
      })
      .addCase(createSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateSale
    builder
      .addCase(updateSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSale.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle deleteSale
    builder
      .addCase(deleteSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = state.sales.filter(
          (sale) => sale.saleId !== action.payload
        );
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getSalesByPagination
    builder
      .addCase(getSalesByPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesByPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload.sales;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalSales = action.payload.totalSales;
      })
      .addCase(getSalesByPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default saleSlice.reducer;
