import { createSlice } from "@reduxjs/toolkit";
import {
  register as registerService,
  signIn as signInService,
  logout,
} from "../services/authentication";

const initialState = {
  signIn: {
    user: null,
    loading: false,
    error: null,
  },
  register: {
    loading: false,
    error: null,
  },
  signOut: {
    loading: false,
    error: null,
  },
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerService.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(registerService.fulfilled, (state) => {
        state.register.loading = false;
      })
      .addCase(registerService.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload;
      });

    // SignIn
    builder
      .addCase(signInService.pending, (state) => {
        state.signIn.loading = true;
        state.signIn.error = null;
      })
      .addCase(signInService.fulfilled, (state, action) => {
        state.signIn.loading = false;
        state.signIn.user = action.payload;
      })
      .addCase(signInService.rejected, (state, action) => {
        state.signIn.loading = false;
        state.signIn.error = action.payload;
      });

    // Sign Out
    builder
      .addCase(logout.pending, (state) => {
        state.signOut.loading = true;
        state.signOut.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.signOut.loading = false;
        state.signIn.user = null;
        sessionStorage.removeItem("session");
      })
      .addCase(logout.rejected, (state, action) => {
        state.signOut.loading = false;
        state.signOut.error = action.payload;
      });
  },
});

export default authenticationSlice.reducer;
