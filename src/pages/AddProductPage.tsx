import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import * as api from '../services/api';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<Omit<Product, '_id' | 'current_stock'>>({
    name: '',
    international_name: '',
    manufacturer: '',
    form: '',
    dosage: '',
    packaging: '',
    barcode: '',
    needs_prescription: false,
    retail_price: 0,
    // category_id: '', // Если есть категории
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setProductData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
        setProductData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    }
    else {
      setProductData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Валидация (очень простая)
      if (!productData.name || !productData.manufacturer || productData.retail_price <= 0) {
        setError("Заполните обязательные поля: Название, Производитель, Цена.");
        setLoading(false);
        return;
      }
      await api.addProduct(productData);
      navigate('/products'); // Перенаправить на список после добавления
    } catch (err) {
      setError('Не удалось добавить препарат. Попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-semibold text-slate-700 mb-6">Добавить новый препарат</h1>
      
      {error && <p className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <Input label="Название препарата (обязательно)" name="name" value={productData.name} onChange={handleChange} required />
        <Input label="МНН" name="international_name" value={productData.international_name} onChange={handleChange} />
        <Input label="Производитель (обязательно)" name="manufacturer" value={productData.manufacturer} onChange={handleChange} required />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Лекарственная форма" name="form" value={productData.form} onChange={handleChange} placeholder="таблетки, мазь..." />
          <Input label="Дозировка" name="dosage" value={productData.dosage} onChange={handleChange} placeholder="500мг, 5%..."/>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Фасовка" name="packaging" value={productData.packaging} onChange={handleChange} placeholder="№10, 100мл..."/>
            <Input label="Штрих-код" name="barcode" value={productData.barcode} onChange={handleChange} />
        </div>

        <Input label="Розничная цена (руб, обязательно)" name="retail_price" type="number" step="0.01" min="0" value={productData.retail_price} onChange={handleChange} required />
        
        <div className="flex items-center">
          <input
            id="needs_prescription"
            name="needs_prescription"
            type="checkbox"
            checked={productData.needs_prescription}
            onChange={handleChange}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="needs_prescription" className="ml-2 block text-sm text-gray-900">
            Требуется рецепт
          </label>
        </div>
        
        {/* Если есть категории:
        <div>
          <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
          <select id="category_id" name="category_id" value={productData.category_id} onChange={handleChange} className="...">
            <option value="">Выберите категорию</option>
            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div>
        */}

        <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => navigate('/products')} disabled={loading}>
                Отмена
            </Button>
            <Button type="submit" disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить препарат'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;