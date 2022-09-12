import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../helpers/network";
import axios, { CancelToken as ICancelToken } from "axios";

const { CancelToken } = axios;

const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  FAILED: "failed",
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: STATUS.IDLE,
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncCart.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(getAsyncCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = STATUS.IDLE;
    });
    builder.addCase(getAsyncCart.rejected, (state, action) => {
      state.status = STATUS.FAILED;
    });
    builder.addCase(updateAsyncCart.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(updateAsyncCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = STATUS.IDLE;
    });
    builder.addCase(updateAsyncCart.rejected, (state, action) => {
      state.status = STATUS.FAILED;
    });
    builder.addCase(removeAsyncCart.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(removeAsyncCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = STATUS.IDLE;
    });
    builder.addCase(removeAsyncCart.rejected, (state, action) => {
      state.status = STATUS.FAILED;
    });
  },
});

export const { getCart, setStatus } = cartSlice.actions;
export default cartSlice.reducer;

export const getAsyncCart = createAsyncThunk("cart/getAsyncCart", async () => {
  const url = `/wp-json/uruvak/v1/cart`;
  const source = CancelToken.source();
  const promise = fetcher();
  const response = await promise.get(url, {
    cancelToken: source.token,
  });
  promise.cancel = () => {
    source.cancel("Operation canceled by the user.");
  };
  return response.data;
});

export const updateAsyncCart = createAsyncThunk(
  "cart/updateAsyncCart",
  async (data) => {
    const url = `/wp-json/uruvak/v1/cart/update/item/quantity`;
    const source = CancelToken.source();
    const promise = fetcher();
    const response = await promise.post(url, data, {
      cancelToken: source.token,
    });
    promise.cancel = () => {
      source.cancel("Operation canceled by the user.");
    };
    return response.data;
  }
);

export const removeAsyncCart = createAsyncThunk(
  "cart/removeAsyncCart",
  async (data) => {
    const url = `/wp-json/uruvak/v1/cart/remove/item`;
    const source = CancelToken.source();
    const promise = fetcher();
    const response = await promise.post(url, data, {
      cancelToken: source.token,
    });
    promise.cancel = () => {
      source.cancel("Operation canceled by the user.");
    };
    return response.data;
  }
);
