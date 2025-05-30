import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CustomerInfo, PaymentInfo } from '../types';
import { createOrder, sendOrderConfirmationEmail } from '../services/api';
import FormInput from '../components/FormInput';
import OrderSummary from '../components/OrderSummary';
import Button from '../components/Button';
import { 
  validateEmail, 
  validatePhone, 
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateZipCode,
  formatCardNumber,
  formatExpiryDate
} from '../utils/validation';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItem, clearCart } = useCart();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  // Validation errors
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  
  // Handle input changes
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    if (id === 'cardNumber') {
      setPaymentInfo(prev => ({
        ...prev,
        [id]: formatCardNumber(value)
      }));
    } else if (id === 'expiryDate') {
      setPaymentInfo(prev => ({
        ...prev,
        [id]: formatExpiryDate(value)
      }));
    } else {
      setPaymentInfo(prev => ({
        ...prev,
        [id]: value
      }));
    }
    
    // Clear error when typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };
  
  // Validate form fields on blur
  const validateField = (field: string, value: string) => {
    let error = '';
    
    switch (field) {
      case 'email':
        if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!validatePhone(value)) {
          error = 'Please enter a valid 10-digit phone number';
        }
        break;
      case 'zipCode':
        if (!validateZipCode(value)) {
          error = 'Please enter a valid zip code (e.g., 12345 or 12345-6789)';
        }
        break;
      case 'cardNumber':
        if (!validateCardNumber(value)) {
          error = 'Please enter a valid 16-digit card number';
        }
        break;
      case 'expiryDate':
        if (!validateExpiryDate(value)) {
          error = 'Please enter a valid expiry date (MM/YY) in the future';
        }
        break;
      case 'cvv':
        if (!validateCVV(value)) {
          error = 'Please enter a valid 3-digit CVV';
        }
        break;
      default:
        if (!value.trim()) {
          error = 'This field is required';
        }
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    
    return !error;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If no cart item, redirect to home
    if (!cartItem) {
      navigate('/');
      return;
    }
    
    // Validate all fields
    let isValid = true;
    
    // Customer info validation
    Object.entries(customerInfo).forEach(([field, value]) => {
      if (!validateField(field, value)) {
        isValid = false;
      }
    });
    
    // Payment info validation
    Object.entries(paymentInfo).forEach(([field, value]) => {
      if (!validateField(field, value)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      return;
    }
    
    // Submit order
    setIsSubmitting(true);
    
    try {
      const order = await createOrder(
        customerInfo,
        paymentInfo,
        [cartItem]
      );
      
      // Send confirmation email
      await sendOrderConfirmationEmail(order);
      
      // Navigate to thank you page with order ID
      navigate(`/thank-you/${order.id}`);
      
      // Clear cart
      clearCart();
    } catch (error) {
      console.error('Error processing order:', error);
      setErrors({
        form: 'An error occurred while processing your order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If no cart item, redirect to home
  if (!cartItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
        <Button onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
      
      {errors.form && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{errors.form}</p>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Customer Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="fullName"
                  label="Full Name"
                  value={customerInfo.fullName}
                  onChange={handleCustomerInfoChange}
                  onBlur={() => validateField('fullName', customerInfo.fullName)}
                  error={errors.fullName}
                  required
                />
                
                <FormInput
                  id="email"
                  label="Email Address"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleCustomerInfoChange}
                  onBlur={() => validateField('email', customerInfo.email)}
                  error={errors.email}
                  required
                />
                
                <FormInput
                  id="phone"
                  label="Phone Number"
                  value={customerInfo.phone}
                  onChange={handleCustomerInfoChange}
                  onBlur={() => validateField('phone', customerInfo.phone)}
                  error={errors.phone}
                  placeholder="e.g., 1234567890"
                  required
                />
                
                <FormInput
                  id="address"
                  label="Address"
                  value={customerInfo.address}
                  onChange={handleCustomerInfoChange}
                  onBlur={() => validateField('address', customerInfo.address)}
                  error={errors.address}
                  required
                />
                
                <FormInput
                  id="city"
                  label="City"
                  value={customerInfo.city}
                  onChange={handleCustomerInfoChange}
                  onBlur={() => validateField('city', customerInfo.city)}
                  error={errors.city}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    id="state"
                    label="State"
                    value={customerInfo.state}
                    onChange={handleCustomerInfoChange}
                    onBlur={() => validateField('state', customerInfo.state)}
                    error={errors.state}
                    required
                  />
                  
                  <FormInput
                    id="zipCode"
                    label="Zip Code"
                    value={customerInfo.zipCode}
                    onChange={handleCustomerInfoChange}
                    onBlur={() => validateField('zipCode', customerInfo.zipCode)}
                    error={errors.zipCode}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Information</h2>
              
              <div className="space-y-4">
                <FormInput
                  id="cardNumber"
                  label="Card Number"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentInfoChange}
                  onBlur={() => validateField('cardNumber', paymentInfo.cardNumber)}
                  error={errors.cardNumber}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    id="expiryDate"
                    label="Expiry Date"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentInfoChange}
                    onBlur={() => validateField('expiryDate', paymentInfo.expiryDate)}
                    error={errors.expiryDate}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                  
                  <FormInput
                    id="cvv"
                    label="CVV"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentInfoChange}
                    onBlur={() => validateField('cvv', paymentInfo.cvv)}
                    error={errors.cvv}
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Complete Purchase
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <OrderSummary
            items={[cartItem]}
            className="sticky top-6"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;