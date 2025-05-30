import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  max = 10
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= 1}
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="px-4 py-2 text-center w-12">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= max}
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;