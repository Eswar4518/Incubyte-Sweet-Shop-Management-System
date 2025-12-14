import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface OrderData {
  customerName: string;
  phone: string;
  address: string;
  items: any[];
  total: number;
  orderId: string;
}

const OrderConfirmationPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const orderData = location.state as OrderData;

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No Order Found</h2>
            <Link to="/" className="bg-purple-600 text-white px-6 py-3 rounded-lg">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Your order is being prepared for delivery</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Order ID:</span> {orderData.orderId}</p>
              <p><span className="font-medium">Customer:</span> {orderData.customerName}</p>
              <p><span className="font-medium">Phone:</span> {orderData.phone}</p>
              <p><span className="font-medium">Delivery Address:</span> {orderData.address}</p>
              <p><span className="font-medium">Total Amount:</span> ${orderData.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3">🚚 Delivery Status</h3>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-medium">Your order is being delivered to:</span>
            </div>
            <div className="mt-2 ml-7">
              <p className="font-medium">{orderData.customerName}</p>
              <p className="text-gray-600">{orderData.address}</p>
              <p className="text-gray-600">📞 {orderData.phone}</p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/" 
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;