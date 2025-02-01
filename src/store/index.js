import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authentication from "../reducers/authentication";

// Slices
import sale from "../reducers/sale";
import order from "../reducers/order";
import vendor from "../reducers/vendor";
import product from "../reducers/product";
import material from "../reducers/material";
import production from "../reducers/production";

const rootReducer = combineReducers({
  authentication,
  material,
  vendor,
  order,
  sale,
  product,
  production,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.VITE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
