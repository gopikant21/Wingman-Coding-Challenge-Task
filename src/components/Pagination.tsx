import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, selectTotalPages } from '../store/productsSlice';
import { RootState } from '../store/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.products.currentPage);
  const totalPages = useSelector(selectTotalPages);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed dark:text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white'
          }`}
        >
          {index + 1}
        </button>
      ))}
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed dark:text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};