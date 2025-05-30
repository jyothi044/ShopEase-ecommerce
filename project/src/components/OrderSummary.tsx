import React from 'react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/helpers';

interface OrderSummaryProps {
  items: CartItem[];
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, className = '' }) => {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal; // In a real app, we'd add tax, shipping, etc.

  return (
    <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      {items.map((item, index) => (
        <div key={index} className="flex justify-between mb-4">
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">
              {item.selectedVariant.name}: {item.selectedVariant.value}
            </p>
            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
          </div>
          <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
        </div>
      ))}
      
      <div className="border-t border-gray-200 my-4 pt-4">
        <div className="flex justify-between mb-2">
          <p>Subtotal</p>
          <p>{formatCurrency(subtotal)}</p>
        </div>
        <div className="flex justify-between font-medium text-lg">
          <p>Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;