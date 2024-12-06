import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption } from '../store/productsSlice';
import { RootState } from '../store/store';
import { SortOption } from '../types/product';

export const SortSelect: React.FC = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.products.sortBy);

  return (
    <select
      value={sortBy}
      onChange={(e) => dispatch(setSortOption(e.target.value as SortOption))}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-desc">Rating: High to Low</option>
      <option value="rating-asc">Rating: Low to High</option>
    </select>
  );
};