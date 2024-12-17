import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  createProduct,
  editProduct,
  removeProduct,
  fetchProductById,
} from "./productActions";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};
const handleFulfilled = (state, action, callback) => {
  state.loading = false;
  callback(state, action);
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        handleFulfilled(state, action, (state, action) => {
          state.products = action.payload;
        });
      })
      .addCase(fetchProducts.rejected, handleRejected);

    builder
      .addCase(createProduct.pending, handlePending)
      .addCase(createProduct.fulfilled, (state, action) => {
        handleFulfilled(state, action, (state, action) => {
          state.products.push(action.payload);
        });
      })
      .addCase(createProduct.rejected, handleRejected);

    builder
      .addCase(editProduct.pending, handlePending)
      .addCase(editProduct.fulfilled, (state, action) => {
        handleFulfilled(state, action, (state, action) => {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        });
      })
      .addCase(editProduct.rejected, handleRejected);

    builder
      .addCase(removeProduct.pending, handlePending)
      .addCase(removeProduct.fulfilled, (state, action) => {
        handleFulfilled(state, action, (state, action) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        });
      })
      .addCase(removeProduct.rejected, handleRejected);

    builder
      .addCase(fetchProductById.pending, handlePending)
      .addCase(fetchProductById.fulfilled, (state, action) => {
        handleFulfilled(state, action, (state, action) => {
          const existingProduct = state.products.find(
            (product) => product.id === action.payload.id
          );
          if (existingProduct) {
            Object.assign(existingProduct, action.payload);
          } else {
            state.products.push(action.payload);
          }
        });
      })
      .addCase(fetchProductById.rejected, handleRejected);
  },
});

const productReducer = productSlice.reducer;

export default productReducer;
