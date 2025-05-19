import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsListPage from './pages/ProductsListPage';
import AddProductPage from './pages/AddProductPage';
// import EditProductPage from './pages/EditProductPage'; // Если будете добавлять редактирование

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Здесь будут рендериться дочерние роуты */}
      </main>
      <footer className="bg-slate-800 text-slate-300 text-center p-4 text-sm">
        © {new Date().getFullYear()} Аптека Онлайн. Все права защищены (демо-версия).
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsListPage />} />
          <Route path="products/new" element={<AddProductPage />} />
          {/* <Route path="products/edit/:productId" element={<EditProductPage />} /> */}
          {/* Добавьте другие маршруты здесь */}
          <Route path="*" element={<div className="text-center p-10 text-2xl">Страница не найдена</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;