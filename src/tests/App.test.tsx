import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice';
import App from '../App';

const createTestStore = () =>
  configureStore({
    reducer: {
      products: productsReducer,
    },
  });

describe('App Component', () => {
  beforeEach(() => {
    render(
      <Provider store={createTestStore()}>
        <App />
      </Provider>
    );
  });

  it('renders the header with title', () => {
    expect(screen.getByText('Product Catalog')).toBeInTheDocument();
  });

  it('renders the search bar', () => {
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('renders the sort select', () => {
    expect(screen.getByText('Price: Low to High')).toBeInTheDocument();
  });

  it('toggles dark mode', () => {
    const darkModeButton = screen.getByLabelText('Toggle dark mode');
    fireEvent.click(darkModeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});