import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        customerName: user?.username || user?.email || 'Customer',
        phone: '123-456-7890',
        address: '123 Sweet Street, Candy City',
        items,
        total: getTotalPrice(),
        orderId: 'ORD-' + Date.now()
      };
      clearCart();
      navigate('/order-confirmation', { state: orderData });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {items.map(item => (
              <div key={item._id} className="flex justify-between py-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Card Number" className="w-full p-3 border rounded" />
              <div className="flex gap-4">
                <input type="text" placeholder="MM/YY" className="flex-1 p-3 border rounded" />
                <input type="text" placeholder="CVV" className="flex-1 p-3 border rounded" />
              </div>
              <input type="text" placeholder="Cardholder Name" className="w-full p-3 border rounded" />
            </div>
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `Pay $${getTotalPrice().toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;