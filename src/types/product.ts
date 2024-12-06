export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'rating-asc';

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string;
  sortBy: SortOption;
  currentPage: number;
  itemsPerPage: number;
  darkMode: boolean;
}