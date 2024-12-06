import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store/store";
import { fetchProductsAsync, selectDarkMode } from "./store/productsSlice";
import { SearchBar } from "./components/SearchBar";
import { ProductGrid } from "./components/ProductGrid";
import { SortSelect } from "./components/SortSelect";
import { Pagination } from "./components/Pagination";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { Store } from "lucide-react";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector(selectDarkMode);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
                Product Catalog
              </h1>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <SearchBar />
          <SortSelect />
        </div>
        <ProductGrid />
        <Pagination />
      </main>
    </div>
  );
}

export default App;
