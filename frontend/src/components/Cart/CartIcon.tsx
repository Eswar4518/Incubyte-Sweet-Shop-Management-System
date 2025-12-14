import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartIcon: React.FC = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <Link to="/cart" className="relative p-2">
      <div className="relative">
        🛒
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;