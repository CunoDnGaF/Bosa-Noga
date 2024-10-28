import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    topSalesLoading(state) {
      state.loading = true;
    },
    topSalesSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    topSalesError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export const {topSalesLoading, topSalesSuccess, topSalesError} = topSalesSlice.actions;
export default topSalesSlice.reducer;