import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState, SortOption } from '../types/product';
import { fetchProducts } from '../services/api';
import { RootState } from './store';

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  sortBy: 'price-asc',
  currentPage: 1,
  itemsPerPage: 8,
  darkMode: false,
};

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return await fetchProducts();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      });
  },
});

export const { setSearchQuery, setSortOption, setCurrentPage, toggleDarkMode } = productsSlice.actions;

export const selectFilteredAndSortedProducts = (state: RootState) => {
  const searchQuery = state.products.searchQuery.toLowerCase();
  let filtered = state.products.items.filter(product =>
    product.title.toLowerCase().includes(searchQuery)
  );

  switch (state.products.sortBy) {
    case 'price-asc':
      filtered = filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered = filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      filtered = filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    case 'rating-asc':
      filtered = filtered.sort((a, b) => a.rating.rate - b.rating.rate);
      break;
  }

  return filtered;
};

export const selectPaginatedProducts = (state: RootState) => {
  const filtered = selectFilteredAndSortedProducts(state);
  const { currentPage, itemsPerPage } = state.products;
  const start = (currentPage - 1) * itemsPerPage;
  return filtered.slice(start, start + itemsPerPage);
};

export const selectTotalPages = (state: RootState) => {
  const filtered = selectFilteredAndSortedProducts(state);
  return Math.ceil(filtered.length / state.products.itemsPerPage);
};

export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectDarkMode = (state: RootState) => state.products.darkMode;

export default productsSlice.reducer;