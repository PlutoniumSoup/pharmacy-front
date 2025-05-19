import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import * as api from '../services/api';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Spinner from '../components/common/Spinner';
import { PlusCircle, Search, Edit3, Trash2 } from 'lucide-react'; // Иконки

const ProductsListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProducts(searchTerm);
      setProducts(data);
    } catch (err) {
      setError('Не удалось загрузить препараты. Попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  // Опционально: Удаление продукта (для полноты CRUD)
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот препарат?')) {
      try {
        await api.deleteProduct(id);
        fetchProducts(); // Обновить список
      } catch (err) {
        alert('Ошибка при удалении препарата.');
      }
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-slate-700">Список препаратов</h1>
        <Link to="/products/new">
          <Button>
            <PlusCircle size={20} className="mr-2" />
            Добавить препарат
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex items-center bg-white p-3 rounded-md shadow">
        <Search size={20} className="text-gray-400 mr-2" />
        <Input
          type="text"
          placeholder="Поиск по названию или МНН..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none focus:ring-0 flex-grow"
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Spinner size="lg" />
        </div>
      )}
      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
      
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-slate-500 py-10">Препараты не найдены.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">МНН</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Производитель</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена (руб.)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Остаток</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Рецепт</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Действия</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-sky-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.international_name || '–'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.manufacturer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.retail_price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.current_stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.needs_prescription ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.needs_prescription ? 'Да' : 'Нет'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {/* <Link to={`/products/edit/${product._id}`}>
                      <Button variant="secondary" size="sm" className="!p-2"> <Edit3 size={16}/> </Button>
                    </Link> */}
                    <Button variant="danger" size="sm" className="!p-2" onClick={() => product._id && handleDeleteProduct(product._id)}>
                       <Trash2 size={16}/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsListPage;