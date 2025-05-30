import { CartItem } from '../types';

export const generateOrderNumber = (): string => {
  const timestamp = new Date().getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${timestamp}-${random}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const simulateTransaction = (): 'approved' | 'declined' | 'error' => {
  const outcomes = ['approved', 'declined', 'error'] as const;
  const randomIndex = Math.floor(Math.random() * outcomes.length);
  return outcomes[randomIndex];
};

export const fadeInAnimation = "animate-[fadeIn_0.5s_ease-in-out]";
export const slideUpAnimation = "animate-[slideUp_0.5s_ease-in-out]";