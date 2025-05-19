// src/services/api.ts (фронтенд)
import type { Product } from '../types'; // Убедитесь, что этот тип соответствует модели на бэкенде

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getProducts = async (searchTerm?: string): Promise<Product[]> => {
  let url = `${API_BASE_URL}/products`;
  if (searchTerm) {
    // Параметр для поиска на бэкенде (убедитесь, что бэкенд его обрабатывает)
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch products' }));
    console.error('API Error:', errorData);
    throw new Error(errorData.message || 'Не удалось загрузить препараты');
  }
  return response.json();
};

export type CreateProductData = Omit<Product, '_id' | 'current_stock' | 'createdAt' | 'updatedAt'>;

export const addProduct = async (productData: CreateProductData): Promise<Product> => {
  // current_stock не передается, бэкенд использует default
  const payload = { ...productData }; // Просто копируем productData

  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  // ... остальная часть функции
  if (!response.ok) {
     const errorData = await response.json().catch(() => ({ message: 'Failed to add product' }));
     console.error('API Error:', errorData);
     throw new Error(errorData.message || 'Не удалось добавить препарат');
   }
   return response.json();
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to delete product' }));
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Не удалось удалить препарат');
    }
    return response.json(); // Бэкенд возвращает { message: 'Препарат удален' }
};

// Добавьте getProductById и updateProduct аналогично, если они нужны