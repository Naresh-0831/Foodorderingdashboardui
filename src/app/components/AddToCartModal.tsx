import { useState, useEffect } from 'react';
import { X, Plus, Minus, Star, MapPin, Phone } from 'lucide-react';
import { FoodItem } from './FoodCard';

interface AddToCartModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: FoodItem, quantity: number, customization: CustomizationData) => void;
}

export interface CustomizationData {
  size: string;
  spiceLevel: string;
  addOns: string[];
  specialInstructions: string;
  deliveryType: string;
  address?: {
    street: string;
    landmark: string;
    contact: string;
  };
}

const addOnsOptions = [
  { id: 'extra-cheese', name: 'Extra Cheese', price: 20 },
  { id: 'extra-sauce', name: 'Extra Sauce', price: 10 },
  { id: 'extra-toppings', name: 'Extra Toppings', price: 30 },
];

export function AddToCartModal({ item, isOpen, onClose, onConfirm }: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Medium');
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [deliveryType, setDeliveryType] = useState('Home Delivery');
  const [address, setAddress] = useState({ street: '', landmark: '', contact: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateItemPrice = () => item.price * quantity;
  
  const calculateAddOnsPrice = () => {
    return selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOnsOptions.find((a) => a.id === addOnId);
      return sum + (addOn?.price || 0) * quantity;
    }, 0);
  };

  const calculateTotal = () => calculateItemPrice() + calculateAddOnsPrice();

  const handleConfirm = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const customization: CustomizationData = {
      size,
      spiceLevel,
      addOns: selectedAddOns,
      specialInstructions,
      deliveryType,
    };

    if (deliveryType === 'Home Delivery') {
      customization.address = address;
    }

    onConfirm(item, quantity, customization);
    
    // Reset form
    setQuantity(1);
    setSize('Medium');
    setSpiceLevel('Medium');
    setSelectedAddOns([]);
    setSpecialInstructions('');
    setDeliveryType('Home Delivery');
    setAddress({ street: '', landmark: '', contact: '' });
    setIsLoading(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-[420px] max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-gray-900">Customize Your Order</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Food Item Summary */}
          <div className="flex gap-4 p-4 bg-orange-50 rounded-xl">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-bold text-orange-600">₹{item.price}</span>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-700">{item.rating}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Quantity <span className="text-orange-600">*</span>
            </label>
            <div className="flex items-center justify-center space-x-4 bg-gray-100 rounded-xl p-3 w-fit mx-auto">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-orange-600 hover:text-white transition-colors shadow-sm"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="px-6 font-bold text-2xl text-gray-900 min-w-[60px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-orange-600 hover:text-white transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Size <span className="text-orange-600">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Small', 'Medium', 'Large'].map((s) => (
                <label
                  key={s}
                  className="relative cursor-pointer"
                >
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={(e) => setSize(e.target.value)}
                    className="peer sr-only"
                  />
                  <div className="py-3 px-4 text-center rounded-xl font-medium transition-all border-2 peer-checked:border-orange-600 peer-checked:bg-orange-50 peer-checked:text-orange-600 hover:border-orange-300 bg-white border-gray-200">
                    {s}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Add-ons
            </label>
            <div className="space-y-2">
              {addOnsOptions.map((addOn) => (
                <label
                  key={addOn.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border-2 border-transparent has-[:checked]:border-orange-600 has-[:checked]:bg-orange-50"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addOn.id)}
                      onChange={() => handleAddOnToggle(addOn.id)}
                      className="w-5 h-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
                    />
                    <span className="font-medium text-gray-900">{addOn.name}</span>
                  </div>
                  <span className="text-orange-600 font-semibold">+₹{addOn.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Spice Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Spice Level
            </label>
            <select
              value={spiceLevel}
              onChange={(e) => setSpiceLevel(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white font-medium"
            >
              <option value="Mild">🌶️ Mild</option>
              <option value="Medium">🌶️🌶️ Medium</option>
              <option value="Spicy">🌶️🌶️🌶️ Spicy</option>
            </select>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Special Instructions
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any specific request?"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Delivery Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Delivery Type <span className="text-orange-600">*</span>
            </label>
            <div className="space-y-2">
              {['Dine-In', 'Takeaway', 'Home Delivery'].map((type) => (
                <label
                  key={type}
                  className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border-2 border-transparent has-[:checked]:border-orange-600 has-[:checked]:bg-orange-50"
                >
                  <input
                    type="radio"
                    name="deliveryType"
                    value={type}
                    checked={deliveryType === type}
                    onChange={(e) => setDeliveryType(e.target.value)}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-3 font-medium text-gray-900">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Address Fields */}
          {deliveryType === 'Home Delivery' && (
            <div className="space-y-4 p-4 bg-orange-50 rounded-xl border-2 border-orange-200 animate-in slide-in-from-top duration-300">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                Delivery Address
              </h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="Enter your street address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Landmark
                </label>
                <input
                  type="text"
                  value={address.landmark}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                  placeholder="Nearby landmark"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={address.contact}
                    onChange={(e) => setAddress({ ...address, contact: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border-2 border-orange-200">
            <h4 className="font-semibold text-gray-900 mb-3">Price Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Item Price (×{quantity})</span>
                <span className="font-medium">₹{calculateItemPrice()}</span>
              </div>
              {selectedAddOns.length > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Add-ons</span>
                  <span className="font-medium">₹{calculateAddOnsPrice()}</span>
                </div>
              )}
              <div className="border-t-2 border-orange-300 pt-2 flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-orange-600">₹{calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 rounded-b-2xl">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all active:scale-95"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
