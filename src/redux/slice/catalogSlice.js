import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  categories: [],
  catLoading: false,
  catError: null,
  activeCategory: '',
  searchValue: '',
  loadMore: true,
  loadMoreItems: [],
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    catalogLoading(state) {
      state.loading = true;
    },
    catalogSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    catalogError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    categoriesLoading(state) {
      state.catLoading = true;
    },
    categoriesSuccess(state, action) {
      state.catLoading = false;
      state.categories = action.payload;
    },
    categoriesError(state, action) {
      state.catLoading = false;
      state.catError = action.payload;
    },
    categoryChange(state, action) {
      state.activeCategory = action.payload;
      state.loadMoreItems = [];
      state.loadMore = true;
    },
    searchChange(state, action) {
      state.searchValue = action.payload;
    },
    loadMoreLoading(state) {
      state.loading = true;
    },
    loadMoreSuccess(state, action) {
      state.loading = false;
      state.loadMore = action.payload.length < 6 ? false : true;
      state.loadMoreItems = action.payload
    },
    loadMoreError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export const {catalogLoading, 
              catalogSuccess, 
              catalogError, 
              categoriesLoading, 
              categoriesSuccess, 
              categoriesError, 
              categoryChange,
              searchChange,
              loadMoreLoading,
              loadMoreError,
              loadMoreSuccess,
            } = catalogSlice.actions;

export default catalogSlice.reducer;