import axios from 'axios';
import { Product } from '../types/product';

const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data;
};