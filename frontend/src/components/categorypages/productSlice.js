import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`${API_URL}/api/allproducts`); 
    // console.log(response.data);
    return response.data.products; // ye payload mein reducer ko milega
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],       // all products
    status: "idle",  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // synchronous reducers agar chahiye toh yahan define kar sakte ho
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"; // fetching start
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"; // fetching success
        state.items = action.payload; // store products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"; // fetching fail
        state.error = action.error.message; // error message
      });
  },
});

export default productSlice.reducer;
