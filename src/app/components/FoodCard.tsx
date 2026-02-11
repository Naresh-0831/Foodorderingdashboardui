import { Star, Plus } from 'lucide-react';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface FoodCardProps {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
}

export function FoodCard({ item, onAddToCart }: FoodCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">{item.rating}</span>
          </div>
          <span className="text-xl font-bold text-orange-600">₹{item.price}</span>
        </div>
        
        <button
          onClick={() => onAddToCart(item)}
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}