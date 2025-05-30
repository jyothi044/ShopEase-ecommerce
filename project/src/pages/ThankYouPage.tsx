import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../services/api';
import { Order } from '../types';
import { formatCurrency } from '../utils/helpers';
import Button from '../components/Button';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const ThankYouPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (id) {
          const orderData = await getOrder(id);
          setOrder(orderData);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);
  
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }
  
  // Transaction status information
  const statusInfo = {
    approved: {
      icon: <CheckCircle className="h-12 w-12 text-green-600" />,
      title: 'Payment Approved',
      message: 'Your payment has been approved and your order is being processed.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    declined: {
      icon: <XCircle className="h-12 w-12 text-red-600" />,
      title: 'Payment Declined',
      message: 'Your payment was declined. Please try a different payment method.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    error: {
      icon: <AlertTriangle className="h-12 w-12 text-amber-500" />,
      title: 'Payment Error',
      message: 'There was an error processing your payment. Please try again later.',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    }
  };
  
  const status = statusInfo[order.status];
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Status Banner */}
      <div className={`mb-8 p-6 ${status.bgColor} border ${status.borderColor} rounded-lg flex items-center`}>
        {status.icon}
        <div className="ml-4">
          <h2 className={`text-lg font-semibold ${status.color}`}>{status.title}</h2>
          <p className="text-gray-700">{status.message}</p>
        </div>
      </div>
      
      {/* Order Information */}
      <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmation</h1>
          <span className="text-gray-500">Order #{order.orderNumber}</span>
        </div>
        
        <div className="border-b border-gray-200 mb-6 pb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          
          {order.items.map((item, index) => (
            <div key={index} className="flex mb-4">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.title}</h3>
                    <p className="ml-4">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.selectedVariant.name}: {item.selectedVariant.value}
                  </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <p>Subtotal</p>
              <p>{formatCurrency(order.subtotal)}</p>
            </div>
            <div className="flex justify-between text-base font-medium">
              <p>Total</p>
              <p>{formatCurrency(order.total)}</p>
            </div>
          </div>
        </div>
        
        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1">{order.customer.fullName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1">{order.customer.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1">{order.customer.phone}</dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
            <address className="not-italic">
              <p>{order.customer.fullName}</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.state} {order.customer.zipCode}</p>
            </address>
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
          <p>Card: {order.payment.cardNumber}</p>
        </div>
      </div>
      
      <div className="text-center">
        <Button onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;