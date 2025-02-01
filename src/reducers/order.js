import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrdersByPagination,
  recieveOrder,
  updateOrder,
} from "../services/order";

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalOrders: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getAllOrders
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getOrdersByPagination
    builder
      .addCase(getOrdersByPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(getOrdersByPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getOrderById
    builder
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle createOrder
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = [...state.orders, action.payload];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateOrder
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle deleteOrder
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle recieveOrder
    builder
      .addCase(recieveOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recieveOrder.fulfilled, (state, action) => {
        const newOrders = [...state.orders];
        const findIndex = newOrders.findIndex(
          (order) => order._id === action.payload
        );
        if (findIndex !== -1) {
          newOrders[findIndex].status = "Received";
          state.orders = newOrders;
        }
        state.loading = false;
      })
      .addCase(recieveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
