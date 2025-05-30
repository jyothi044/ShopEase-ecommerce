import { Product } from '../types';

export const products: Product[] = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    description: "Experience unparalleled sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and supremely comfortable ear cushions for all-day listening. The perfect companion for music lovers and professionals alike.",
    price: 299.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Electronics",
    rating: 4.8,
    reviews: 1250,
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Midnight Black", "Arctic White", "Navy Blue", "Rose Gold"]
      }
    ],
    inventory: 50
  },
  {
    id: "2",
    title: "Classic Leather Sneakers",
    description: "Handcrafted Italian leather sneakers that combine style with comfort. Features cushioned insoles and durable rubber outsoles for lasting comfort and style.",
    price: 159.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Shoes",
    rating: 4.6,
    reviews: 850,
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["7", "8", "9", "10", "11", "12"]
      }
    ],
    inventory: 100
  },
  {
    id: "3",
    title: "Premium Wool Sweater",
    description: "Luxuriously soft merino wool sweater perfect for any occasion. Features a classic fit and ribbed details at the neck, cuffs, and hem.",
    price: 129.99,
    image: "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Clothing",
    rating: 4.7,
    reviews: 632,
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["S", "M", "L", "XL"]
      }
    ],
    inventory: 75
  },
  {
    id: "4",
    title: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring, GPS, and 14-day battery life. Perfect for athletes and fitness enthusiasts.",
    price: 199.99,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Electronics",
    rating: 4.5,
    reviews: 1876,
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Black", "Silver", "Rose Gold"]
      }
    ],
    inventory: 60
  },
  {
    id: "5",
    title: "Designer Leather Wallet",
    description: "Genuine leather wallet with RFID protection and multiple card slots. Sleek design meets practical functionality.",
    price: 79.99,
    image: "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Accessories",
    rating: 4.9,
    reviews: 425,
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Brown", "Black", "Tan"]
      }
    ],
    inventory: 120
  },
  {
    id: "6",
    title: "Running Shoes Elite",
    description: "Professional-grade running shoes with advanced cushioning technology and breathable mesh upper. Perfect for marathons and daily training.",
    price: 149.99,
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Shoes",
    rating: 4.7,
    reviews: 923,
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["7", "8", "9", "10", "11", "12"]
      }
    ],
    inventory: 85
  },
  {
    id: "7",
    title: "Vintage Denim Jacket",
    description: "Classic denim jacket with a modern twist. Features distressed details and a comfortable fit for everyday wear.",
    price: 89.99,
    image: "https://images.pexels.com/photos/1082526/pexels-photo-1082526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Clothing",
    rating: 4.6,
    reviews: 547,
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["S", "M", "L", "XL"]
      }
    ],
    inventory: 65
  },
  {
    id: "8",
    title: "Designer Sunglasses",
    description: "Premium sunglasses with UV protection and polarized lenses. Stylish design suitable for all face shapes.",
    price: 159.99,
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Accessories",
    rating: 4.8,
    reviews: 328,
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Black", "Tortoise", "Gold"]
      }
    ],
    inventory: 45
  },
  {
    id: "9",
    title: "Wireless Earbuds Pro",
    description: "True wireless earbuds with active noise cancellation and premium sound quality. Features touch controls and wireless charging.",
    price: 179.99,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Electronics",
    rating: 4.7,
    reviews: 1543,
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["White", "Black", "Navy"]
      }
    ],
    inventory: 70
  },
  {
    id: "10",
    title: "Leather Messenger Bag",
    description: "Premium leather messenger bag with laptop compartment and multiple organizer pockets. Perfect for professionals on the go.",
    price: 199.99,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Accessories",
    rating: 4.9,
    reviews: 276,
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Brown", "Black", "Cognac"]
      }
    ],
    inventory: 40
  },
  {
    id: "11",
    title: "Smart 4K TV",
    description: "65-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps. Experience stunning picture quality and smart features.",
    price: 899.99,
    image: "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Electronics",
    rating: 4.8,
    reviews: 892,
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["55\"", "65\"", "75\""]
      }
    ],
    inventory: 25
  },
  {
    id: "12",
    title: "Hiking Boots",
    description: "Waterproof hiking boots with superior grip and ankle support. Perfect for outdoor adventures and challenging terrain.",
    price: 189.99,
    image: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Shoes",
    rating: 4.7,
    reviews: 645,
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["7", "8", "9", "10", "11", "12"]
      }
    ],
    inventory: 55
  },
  {
    id: "13",
    title: "Cashmere Scarf",
    description: "Luxuriously soft 100% cashmere scarf. Perfect for adding elegance to any outfit while keeping warm.",
    price: 129.99,
    image: "https://images.pexels.com/photos/6624862/pexels-photo-6624862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Accessories",
    rating: 4.9,
    reviews: 234,
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Camel", "Gray", "Navy", "Burgundy"]
      }
    ],
    inventory: 30
  },
  {
    id: "14",
    title: "Dress Shirt",
    description: "Premium cotton dress shirt with wrinkle-resistant fabric. Perfect for professional settings and special occasions.",
    price: 79.99,
    image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Clothing",
    rating: 4.6,
    reviews: 487,
    variants: [
      {
        id: "size",
        name: "Size",
        options: ["S", "M", "L", "XL", "XXL"]
      }
    ],
    inventory: 80
  },
  {
    id: "15",
    title: "Gaming Laptop",
    description: "High-performance gaming laptop with RTX graphics and 144Hz display. Perfect for gaming and content creation.",
    price: 1499.99,
    image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Electronics",
    rating: 4.8,
    reviews: 756,
    variants: [
      {
        id: "storage",
        name: "Storage",
        options: ["512GB", "1TB", "2TB"]
      }
    ],
    inventory: 20
  }
];

export const getProduct = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};