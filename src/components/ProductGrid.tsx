import React from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';
import { selectPaginatedProducts, selectProductsStatus, selectProductsError } from '../store/productsSlice';
import { Loader } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const products = useSelector(selectPaginatedProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};