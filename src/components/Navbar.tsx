import { Link } from 'react-router-dom';
import { Pill } from 'lucide-react'; // Пример иконки

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold hover:opacity-80 transition-opacity">
          <Pill size={28} />
          <span>Аптека Онлайн</span>
        </Link>
        <div className="space-x-4">
          <Link to="/products" className="hover:text-primary-light transition-colors">Препараты</Link>
          <Link to="/products" className="hover:text-primary-light transition-colors">Продажи</Link>
          <Link to="/products" className="hover:text-primary-light transition-colors">Поступления</Link>
          <Link to="/products" className="hover:text-primary-light transition-colors">Рецепты</Link>
          <Link to="/products" className="hover:text-primary-light transition-colors">Отчеты</Link>
          <Link to="/products" className="hover:text-primary-light transition-colors">Справочники</Link>
          <Link to="/products" className="hover:text-primary-light transition-colors">Настройки</Link>
          <Link to="/products" className="hover:text-primary-light transition-colors">Выход</Link>
          {/* Добавьте другие ссылки по мере необходимости */}
          {/* <Link to="/sales" className="hover:text-primary-light transition-colors">Продажи</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


