import { FoodCard, FoodItem } from './FoodCard';
import { Pizza, Beef, Drumstick, Coffee, Cake, Utensils } from 'lucide-react';

interface FoodMenuProps {
  foodItems: FoodItem[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onAddToCart: (item: FoodItem) => void;
}

const categories = [
  { id: 'all', name: 'All', icon: null },
  { id: 'biryani', name: 'Biryani', icon: Utensils },
  { id: 'pizza', name: 'Pizza', icon: Pizza },
  { id: 'burgers', name: 'Burgers', icon: Beef },
  { id: 'starters', name: 'Starters', icon: Drumstick },
  { id: 'beverages', name: 'Beverages', icon: Coffee },
  { id: 'desserts', name: 'Desserts', icon: Cake },
];

export function FoodMenu({ foodItems, selectedCategory, onCategoryChange, onAddToCart }: FoodMenuProps) {
  const filteredItems = selectedCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  return (
    <section id="menu" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Our Menu</h2>
          <p className="text-gray-600">Choose from our delicious selection</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}