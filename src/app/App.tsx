import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FoodMenu } from './components/FoodMenu';
import { OrderSummary, CartItem } from './components/OrderSummary';
import { OrderStatus } from './components/OrderStatus';
import { Footer } from './components/Footer';
import { FoodItem } from './components/FoodCard';
import { AddToCartModal, CustomizationData } from './components/AddToCartModal';
import { ProfileDashboard } from './components/ProfileDashboard';

// Food items data
const foodItems: FoodItem[] = [
  // Biryani
  {
    id: '9',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken and authentic spices',
    price: 249,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1630851840633-f96999247032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYmlyeWFuaSUyMGluZGlhbiUyMGZvb2R8ZW58MXx8fHwxNzcwNzA3MzU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'biryani',
  },
  {
    id: '10',
    name: 'Mutton Biryani',
    description: 'Rich and flavorful biryani with succulent mutton pieces',
    price: 299,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1691171047345-dbcd78402f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXR0b24lMjBiaXJ5YW5pJTIwZGVsaWNpb3VzfGVufDF8fHx8MTc3MDc5MjUxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'biryani',
  },
  {
    id: '11',
    name: 'Veg Biryani',
    description: 'Mixed vegetable biryani with fragrant basmati rice',
    price: 199,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1581894408375-cc0738fef8b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWclMjBiaXJ5YW5pJTIwdmVnZXRhcmlhbnxlbnwxfHx8fDE3NzA3OTI1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'biryani',
  },
  // Pizza
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    price: 199,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1664309641932-0e03e0771b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcwNzQ1Mjg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'pizza',
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Delicious pizza loaded with pepperoni and cheese',
    price: 249,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1630281483897-32ae5a2f7915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMGRlbGljaW91c3xlbnwxfHx8fDE3NzA3NTYxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'pizza',
  },
  // Burgers
  {
    id: '3',
    name: 'Chicken Burger',
    description: 'Juicy grilled chicken burger with lettuce and mayo',
    price: 149,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1584944868902-d06d1ba6ec55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVyZ2VyJTIwZ291cm1ldHxlbnwxfHx8fDE3NzA3MzA1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'burgers',
  },
  {
    id: '4',
    name: 'Veg Burger',
    description: 'Fresh veggie patty with tomatoes and special sauce',
    price: 129,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1585238341267-1cfec2046a55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdnaWUlMjBidXJnZXIlMjBmcmVzaHxlbnwxfHx8fDE3NzA3OTE1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'burgers',
  },
  // Starters
  {
    id: '5',
    name: 'French Fries',
    description: 'Crispy golden fries with seasoning',
    price: 99,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1717294978892-cef673e1d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGdvbGRlbnxlbnwxfHx8fDE3NzA3OTE1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
  },
  {
    id: '6',
    name: 'Fried Chicken',
    description: 'Crispy fried chicken pieces with herbs and spices',
    price: 179,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1672856399624-61b47d70d339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBjcmlzcHl8ZW58MXx8fHwxNzcwNzMxOTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
  },
  {
    id: '12',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes marinated in Indian spices',
    price: 189,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYSUyMGluZGlhbnxlbnwxfHx8fDE3NzA3OTI1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
  },
  {
    id: '13',
    name: 'Spring Rolls',
    description: 'Crispy vegetable spring rolls with sweet chili sauce',
    price: 129,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1768701544400-dfa8ca509d10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjByb2xscyUyMGFwcGV0aXplcnxlbnwxfHx8fDE3NzA3Nzk0MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
  },
  // Beverages
  {
    id: '7',
    name: 'Coke',
    description: 'Chilled refreshing Coca-Cola',
    price: 49,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1636403724733-0fa0f7acb324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NhJTIwY29sYSUyMGRyaW5rfGVufDF8fHx8MTc3MDcyOTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'beverages',
  },
  {
    id: '14',
    name: 'Mango Lassi',
    description: 'Refreshing traditional Indian yogurt drink with mango',
    price: 79,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1655074084308-901ea6b88fd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMGxhc3NpJTIwZHJpbmt8ZW58MXx8fHwxNzcwNzkyNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'beverages',
  },
  // Desserts
  {
    id: '8',
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake slice',
    price: 119,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzA3Nzc2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts',
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCartClick = (item: FoodItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item: FoodItem, quantity: number, customization: CustomizationData) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
    toast.success(`${item.name} added to cart!`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Item removed from cart!`);
  };

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      <Header 
        cartItemCount={totalItemCount} 
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
      />
      
      <Hero 
        heroImage="https://images.unsplash.com/photo-1598546937882-4fa25fa29418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjByZXN0YXVyYW50JTIwaGVyb3xlbnwxfHx8fDE3NzA3OTE1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080" 
      />

      <div className="lg:flex lg:max-w-7xl lg:mx-auto lg:gap-8 lg:px-4 lg:py-8">
        <div className="lg:flex-1">
          <FoodMenu
            foodItems={foodItems}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onAddToCart={handleAddToCartClick}
          />
        </div>

        <div className="lg:w-96 lg:sticky lg:top-20 lg:self-start">
          <OrderSummary
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </div>

      {cartItems.length > 0 && (
        <OrderStatus
          orderId="ORD-2026-1234"
          currentStatus={2}
          estimatedTime="30 minutes"
        />
      )}

      <Footer />

      {/* Add to Cart Modal */}
      <AddToCartModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddToCart}
      />

      {/* Profile Dashboard */}
      <ProfileDashboard
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}