import { createSlice } from "@reduxjs/toolkit";
import {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorsByPagination, // import the new pagination thunk
} from "../services/vendor";

const initialState = {
  vendors: [],
  vendor: null,
  loading: false,
  error: null,
  currentPage: 1,       // Track the current page
  totalPages: 1,        // Track total pages for pagination
  totalVendors: 0,      // Track total vendors count
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getAllVendors
    builder
      .addCase(getAllVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(getAllVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getVendorById
    builder
      .addCase(getVendorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorById.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
      })
      .addCase(getVendorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle createVendor
    builder
      .addCase(createVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = [...state.vendors, action.payload];
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateVendor
    builder
      .addCase(updateVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle deleteVendor
    builder
      .addCase(deleteVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = state.vendors.filter(
          (vendor) => vendor._id !== action.payload
        );
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getVendorsByPagination
    builder
      .addCase(getVendorsByPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorsByPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload.vendors; // Store the vendors
        state.currentPage = action.payload.currentPage; // Update currentPage
        state.totalPages = action.payload.totalPages; // Update totalPages
        state.totalVendors = action.payload.totalVendors; // Update totalVendors
      })
      .addCase(getVendorsByPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vendorSlice.reducer;
