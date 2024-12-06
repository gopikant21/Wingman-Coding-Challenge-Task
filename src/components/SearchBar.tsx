import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/productsSlice';

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="relative w-full max-w-xl mx-auto ">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full px-4 py-2 pl-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};