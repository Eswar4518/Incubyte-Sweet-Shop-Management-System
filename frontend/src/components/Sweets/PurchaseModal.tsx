import React from 'react';
import { Sweet } from '../../api/sweetsApi';

interface PurchaseModalProps {
  sweet: Sweet | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  sweet,
  isOpen,
  onClose,
  onConfirm,
  isLoading
}) => {
  if (!isOpen || !sweet) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 animate-bounce-in">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Confirm Purchase
          </h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-lg text-gray-800">{sweet.name}</h3>
            {sweet.category && (
              <p className="text-sm text-gray-600 mb-2">{sweet.category}</p>
            )}
            <p className="text-2xl font-bold gradient-text">₹{sweet.price}</p>
            <p className="text-sm text-gray-600">
              {sweet.quantity} items available
            </p>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to purchase this sweet?
          </p>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 btn-gradient px-6 py-3"
            >
              {isLoading ? '⏳ Processing...' : '🛍️ Confirm Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;