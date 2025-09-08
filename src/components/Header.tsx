
import { School, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white shadow-2xl border-b border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <School className="h-10 w-10 text-blue-300" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                The Bison's Tea
              </h1>
              <p className="text-blue-200 text-sm">
                Howard University Community
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">
              Welcome, Anonymous Bison!
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
