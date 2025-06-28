
import { Category, CATEGORIES } from '../types/forum';

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === 'all'
            ? 'bg-gray-800 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All Posts
      </button>
      {CATEGORIES.map(category => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
