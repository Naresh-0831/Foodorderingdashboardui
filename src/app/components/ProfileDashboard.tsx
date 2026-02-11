import { User, MapPin, Phone, Mail, Clock, Package, Heart, Settings, LogOut } from 'lucide-react';

interface ProfileDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const recentOrders = [
  {
    id: 'ORD-2026-1234',
    date: 'Feb 10, 2026',
    items: 'Chicken Biryani, Coke',
    total: 298,
    status: 'Delivered',
  },
  {
    id: 'ORD-2026-1233',
    date: 'Feb 08, 2026',
    items: 'Margherita Pizza, French Fries',
    total: 298,
    status: 'Delivered',
  },
  {
    id: 'ORD-2026-1232',
    date: 'Feb 05, 2026',
    items: 'Chicken Burger, Chocolate Cake',
    total: 268,
    status: 'Delivered',
  },
];

const savedAddresses = [
  {
    id: 1,
    label: 'Home',
    address: '123 Marine Drive, Mumbai, Maharashtra 400002',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    address: '456 BKC, Bandra East, Mumbai, Maharashtra 400051',
    isDefault: false,
  },
];

export function ProfileDashboard({ isOpen, onClose }: ProfileDashboardProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-8 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Rahul Sharma</h2>
                <p className="text-orange-100">rahul.sharma@email.com</p>
                <p className="text-orange-100 flex items-center mt-1">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 98765 43210
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Package className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">42</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Heart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">18</p>
            <p className="text-sm text-gray-600">Favorites</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Active Orders</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6 space-y-6">
          {/* Recent Orders */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-orange-600" />
              Recent Orders
            </h3>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.items}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">₹{order.total}</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full mt-1">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Addresses */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-orange-600" />
              Saved Addresses
            </h3>
            <div className="space-y-3">
              {savedAddresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{address.label}</span>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{address.address}</p>
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-600 hover:text-orange-600 transition-colors">
                + Add New Address
              </button>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-orange-600" />
              Account Settings
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-gray-900">Edit Profile</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-gray-900">Payment Methods</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-gray-900">Notifications</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <span className="flex items-center">
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
