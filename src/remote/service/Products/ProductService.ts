import axios from 'axios';
import type { Product } from '../../../types';

const API_URL = 'http://localhost:8085/api/v1/products';

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
};