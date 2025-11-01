import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../components/categorypages/productSlice.js";

export const store = configureStore({
  reducer: {
    products: productReducer, 
  },
});
