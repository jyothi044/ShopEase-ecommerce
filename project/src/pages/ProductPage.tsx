import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { getAllCategories, getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import QuantitySelector from '../components/QuantitySelector';
import { formatCurrency } from '../utils/helpers';

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const categories = getAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  
  const products = getProductsByCategory(selectedCategory);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<{
    name: string;
    value: string;
  } | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedVariant({
      name: product.variants[0].name,
      value: product.variants[0].options[0]
    });
  };

  const handleIncrement = () => {
    if (selectedProduct && quantity < selectedProduct.inventory) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedProduct) {
      setSelectedVariant({
        name: selectedProduct.variants[0].name,
        value: e.target.value
      });
    }
  };

  const handleBuyNow = () => {
    if (selectedProduct && selectedVariant) {
      addToCart(
        selectedProduct,
        quantity,
        selectedVariant.name,
        selectedVariant.value
      );
      navigate('/checkout');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Selection */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleProductSelect(product)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(product.price)}
                </span>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">{product.rating}</span>
                  <span className="ml-2 text-gray-400">({product.reviews})</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {product.inventory} items available
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedProduct.title}
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full rounded-lg"
                  />
                </div>

                <div>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">
                      {selectedProduct.rating}
                    </span>
                    <span className="ml-2 text-gray-400">
                      ({selectedProduct.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-3xl font-bold text-indigo-600 mb-6">
                    {formatCurrency(selectedProduct.price)}
                  </p>

                  <div className="mb-6">
                    <label
                      htmlFor="variant"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {selectedProduct.variants[0].name}
                    </label>
                    <select
                      id="variant"
                      value={selectedVariant?.value}
                      onChange={handleVariantChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {selectedProduct.variants[0].options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <p className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </p>
                    <QuantitySelector
                      quantity={quantity}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                      max={selectedProduct.inventory}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedProduct.inventory} items available
                    </p>
                  </div>

                  <Button variant="primary" fullWidth onClick={handleBuyNow}>
                    <div className="flex items-center justify-center">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Buy Now
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;