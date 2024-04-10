import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: {},
  loading: false,
  error: null,
}

const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    productPageLoading(state) {
      state.loading = true;
    },
    productPageSuccess(state, action) {
      state.loading = false;
      state.item = action.payload;
    },
    productPageError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export const {productPageLoading, productPageSuccess, productPageError} = productPageSlice.actions;
export default productPageSlice.reducer;