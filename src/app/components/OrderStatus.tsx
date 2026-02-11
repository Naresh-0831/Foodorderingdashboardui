import { Check, Package, Truck, CheckCircle } from 'lucide-react';

interface OrderStatusProps {
  orderId: string;
  currentStatus: number;
  estimatedTime: string;
}

const statusSteps = [
  { id: 1, name: 'Order Placed', icon: Package },
  { id: 2, name: 'Preparing', icon: Check },
  { id: 3, name: 'Out for Delivery', icon: Truck },
  { id: 4, name: 'Delivered', icon: CheckCircle },
];

export function OrderStatus({ orderId, currentStatus, estimatedTime }: OrderStatusProps) {
  return (
    <section id="orders" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Track Your Order</h2>
            <p className="text-gray-600">Order ID: <span className="font-semibold">{orderId}</span></p>
            <p className="text-sm text-orange-600 mt-1">Estimated Delivery: {estimatedTime}</p>
          </div>

          {/* Status Tracker */}
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-300">
              <div 
                className="h-full bg-orange-600 transition-all duration-500"
                style={{ width: `${((currentStatus - 1) / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>

            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statusSteps.map((step) => {
                const Icon = step.icon;
                const isCompleted = step.id <= currentStatus;
                const isCurrent = step.id === currentStatus;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                        isCompleted
                          ? 'bg-orange-600 text-white'
                          : 'bg-white text-gray-400 border-2 border-gray-300'
                      } ${isCurrent ? 'ring-4 ring-orange-200 scale-110' : ''}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <p
                      className={`text-xs sm:text-sm text-center font-medium ${
                        isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
