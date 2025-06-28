
import { School } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-red-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <School className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">The Bison's Corner</h1>
              <p className="text-blue-100 text-sm">Howard University Community</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Welcome, Anonymous Bison!</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
