import { CustomerInfo, Order, PaymentInfo, CartItem } from '../types';
import { generateOrderNumber, simulateTransaction } from '../utils/helpers';

// Simulated database
let orders: Order[] = [];

export const createOrder = async (
  customer: CustomerInfo, 
  payment: PaymentInfo, 
  items: CartItem[]
): Promise<Order> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
      const total = subtotal; // In a real app, we'd add tax, shipping, etc.
      
      const status = simulateTransaction();
      
      const newOrder: Order = {
        id: crypto.randomUUID(),
        orderNumber: generateOrderNumber(),
        customer,
        payment: {
          ...payment,
          // Mask card number for security
          cardNumber: `**** **** **** ${payment.cardNumber.slice(-4)}`,
        },
        items,
        subtotal,
        total,
        status,
        createdAt: new Date().toISOString()
      };
      
      // Add to our "database"
      orders.push(newOrder);
      
      // Return the created order
      resolve(newOrder);
    }, 1500); // 1.5 second delay to simulate network
  });
};

export const getOrder = async (id: string): Promise<Order | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = orders.find(order => order.id === id);
      resolve(order || null);
    }, 500);
  });
};

export const sendOrderConfirmationEmail = async (order: Order): Promise<void> => {
  // This would normally connect to Mailtrap.io
  // For this simulation, we'll just log to console
  console.log(`Sending ${order.status} email to ${order.customer.email} for order ${order.orderNumber}`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Email sent successfully');
      resolve();
    }, 1000);
  });
};