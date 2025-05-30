export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  variants: ProductVariant[];
  inventory: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariant: {
    name: string;
    value: string;
  };
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  payment: PaymentInfo;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: 'approved' | 'declined' | 'error';
  createdAt: string;
}