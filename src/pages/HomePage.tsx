import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold text-primary mb-6">Добро пожаловать в "Аптека Онлайн"</h1>
      <p className="text-lg text-slate-600 mb-8">
        Система управления аптечными запасами и продажами.
      </p>
      <div className="space-x-4">
        <Link to="/products">
          <Button size="lg">Перейти к препаратам</Button>
        </Link>
        {/* <Link to="/sales/new">
          <Button size="lg" variant="secondary">Новая продажа</Button>
        </Link> */}
      </div>
    </div>
  );
};

export default HomePage;