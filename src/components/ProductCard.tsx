import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          ({product.rating.count})
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pt-[100%] bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </p>
          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {product.category}
          </span>
        </div>
        {renderStars(product.rating.rate)}
        
        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                <span>Show description</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
          
          <div
            className={`mt-2 text-sm text-gray-600 dark:text-gray-400 transition-all duration-200 ${
              isExpanded ? 'block' : 'hidden'
            }`}
          >
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
};