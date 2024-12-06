import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import { toggleDarkMode, selectDarkMode } from '../store/productsSlice';

export const DarkModeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );
};