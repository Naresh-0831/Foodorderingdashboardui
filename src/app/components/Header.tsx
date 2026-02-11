import { Search, ShoppingCart, User, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
}

export function Header({ cartItemCount, onCartClick, onProfileClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-600">🍔 FoodieExpress</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-900 hover:text-orange-600 transition-colors">Home</a>
            <a href="#menu" className="text-gray-600 hover:text-orange-600 transition-colors">Menu</a>
            <a href="#orders" className="text-gray-600 hover:text-orange-600 transition-colors">Orders</a>
            <a href="#cart" className="text-gray-600 hover:text-orange-600 transition-colors">Cart</a>
            <a href="#profile" className="text-gray-600 hover:text-orange-600 transition-colors">Profile</a>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for food items..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              onClick={onProfileClick}
              className="hidden md:block p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <User className="w-6 h-6" />
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for food items..."
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}