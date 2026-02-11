import { Plus, Minus, Tag, X } from 'lucide-react';
import { FoodItem } from './FoodCard';

export interface CartItem extends FoodItem {
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderSummary({ cartItems, onUpdateQuantity, onRemoveItem, isOpen, onClose }: OrderSummaryProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharges = subtotal > 0 ? 40 : 0;
  const gst = subtotal * 0.05;
  const total = subtotal + deliveryCharges + gst;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Order Summary Panel */}
      <div
        className={`fixed lg:sticky top-0 right-0 h-screen lg:h-auto bg-white shadow-xl z-50 lg:z-0 transition-transform duration-300 lg:transform-none w-full sm:w-96 lg:w-full ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-orange-600 font-medium">₹{item.price}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 bg-white rounded-lg border">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 hover:bg-gray-100 rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary and Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-3 bg-white">
              {/* Coupon */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Apply coupon code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span>₹{deliveryCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (5%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-orange-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
