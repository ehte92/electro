import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../helpers/network";
import axios, { CancelToken as ICancelToken } from "axios";

const { CancelToken } = axios;

const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  FAILED: "failed",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: {},
    sort: [],
    filters: [],
    max_pages: 0,
    status: STATUS.IDLE,
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncProduct.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(getAsyncProduct.fulfilled, (state, action) => {
      // state.data = action.payload.data;
      if (!Object.keys(state.data).length) {
        Object.assign(state.data, action.payload.data);
      }
      state.sort = action.payload.sort;
      state.filters = action.payload.filters;
      state.max_pages = action.payload.max_pages;
      state.status = STATUS.IDLE;
    });
    builder.addCase(getAsyncProduct.rejected, (state, action) => {
      state.status = STATUS.FAILED;
    });
    builder.addCase(getMoreAsyncProduct.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(getMoreAsyncProduct.fulfilled, (state, action) => {
      const data = action.payload.data;
      const prevState = state.data;
      Object.entries(action.payload.data).forEach(([key, value]) => {
        state.data[key] = value;
      });
      state.sort = action.payload.sort;
      state.filters = action.payload.filters;
      state.max_pages = action.payload.max_pages;
      state.status = STATUS.IDLE;
    });
    builder.addCase(getMoreAsyncProduct.rejected, (state, action) => {
      state.status = STATUS.FAILED;
    });
  },
});

export const { getProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

export const getAsyncProduct = createAsyncThunk(
  "product/getAsyncProduct",
  async (apiAddress) => {
    const url = apiAddress;
    const source = CancelToken.source();
    const promise = fetcher();
    const response = await promise.get(url, {
      cancelToken: source.token,
    });
    promise.cancel = () => {
      source.cancel();
    };
    return response.data;
  }
);

export const getMoreAsyncProduct = createAsyncThunk(
  "product/getMoreAsyncProduct",
  async (apiAddress) => {
    const url = apiAddress;
    const source = CancelToken.source();
    const promise = fetcher();
    const response = await promise.get(url, {
      cancelToken: source.token,
    });
    promise.cancel = () => {
      source.cancel();
    };
    return response.data;
  }
);
