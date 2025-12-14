import React, { useState } from "react";
import { Sweet, restockSweet } from "../../api/sweetsApi";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

interface SweetCardProps {
  sweet: Sweet;
  onPurchase?: () => void;
  onDelete?: () => void;
  onRestock?: () => void;
  showAdminControls?: boolean;
}

const SweetCard: React.FC<SweetCardProps> = ({
  sweet,
  onPurchase,
  onDelete,
  onRestock,
  showAdminControls = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStock, setCurrentStock] = useState(sweet.quantity || 0);
  const { items, addToCart, updateQuantity } = useCart();
  
  const cartItem = items.find(item => item._id === sweet._id);
  const cartQuantity = cartItem?.quantity || 0;

  const isOutOfStock = currentStock <= 0;

  const handlePurchaseClick = async () => {
    if (!onPurchase || isOutOfStock) return;
    try {
      setIsLoading(true);
      setError("");
      await onPurchase();
    } catch (err: any) {
      setError(err?.message || "Failed to process purchase");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!onDelete) return;
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      setIsLoading(true);
      setError("");
      await onDelete();
    } catch (err: any) {
      setError(err?.message || "Failed to delete sweet");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestockClick = async () => {
    if (!onRestock) return;
    const quantity = prompt("Enter quantity to add:");
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      alert("Please enter a valid positive number");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      await restockSweet(sweet._id || sweet.id || "", Number(quantity));
      onRestock();
    } catch (err: any) {
      setError(err?.message || "Failed to restock sweet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sweet-card bg-transparent rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:border-purple-200">
      <div className="h-48 bg-white flex items-center justify-center overflow-hidden relative">
        <img 
          src={sweet.name.toLowerCase().includes('rasgulla') ? 'https://madhurasrecipe.com/wp-content/uploads/2023/10/Rasgulla-1.jpg' : sweet.name.toLowerCase().includes('gulab jamun') ? 'https://almondhouse.com/cdn/shop/files/1_IMG_9491_1e1968b7-b144-49ba-a4ed-2659e95a3bcb.jpg?v=1703680462&width=800' : sweet.name.toLowerCase().includes('laddu') ? 'https://vismaifood.com/storage/app/uploads/public/40c/1e6/695/thumb__700_0_0_0_auto.jpg' : (sweet.name.toLowerCase().includes('burfi') || sweet.name.toLowerCase().includes('barfi')) ? 'https://myheartbeets.com/wp-content/uploads/2020/11/pressure-cooker-milk-burfi.jpg' : sweet.name.toLowerCase().includes('kaju katli') ? 'https://static.toiimg.com/thumb/55048826.cms?width=1200&height=900' : sweet.name.toLowerCase().includes('rasmalai') ? 'https://www.spiceupthecurry.com/wp-content/uploads/2020/08/rasmalai-recipe-1.jpg' : sweet.name.toLowerCase().includes('sandesh') ? 'https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Sandesh-1300x867.jpg?v=1619103410' : sweet.name.toLowerCase().includes('mysore pak') ? 'https://indiasweethouse.in/cdn/shop/files/BadamMysorePak_eec04e7e-ba9b-41bd-90c1-e07dfeabef14.png?v=1724998308&width=990' : sweet.name.toLowerCase().includes('soan papdi') ? 'https://bombaysweets.in/cdn/shop/products/soanpapdi_new.png?v=1694672810&width=823' : sweet.name.toLowerCase().includes('chocolate cake') ? 'https://butternutbakeryblog.com/wp-content/uploads/2023/04/chocolate-cake-1024x1536.jpg' : sweet.name.toLowerCase().includes('strawberry cupcake') ? 'https://preppykitchen.com/wp-content/uploads/2022/07/Strawberry-Cupcakes-Feature.jpg' : sweet.name.toLowerCase().includes('rainbow lollipop') ? 'https://138398283.cdn6.editmysite.com/uploads/1/3/8/3/138398283/LWJF2R5U2Y2RHIQN4A5T7NYH.jpeg?width=2560&optimize=medium' : sweet.name.toLowerCase().includes('vanilla ice cream') ? 'https://www.allrecipes.com/thmb/bTcUVF3wiDRXkY0HQvQgpStGMlY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-8314-Vanilla-Ice-Cream-gw-ddmfs-beauty-4x3-b0f065ec1e7346abb82f4b3d2ad9907b.jpg' : sweet.name.toLowerCase().includes('chocolate chip cookies') ? 'https://butternutbakeryblog.com/wp-content/uploads/2023/10/pumpkin-chocolate-chip-cookies-1024x1536.jpg' : sweet.name.toLowerCase().includes('gummy bears') ? 'https://5.imimg.com/data5/SELLER/Default/2024/2/390208333/SF/WL/RH/132634672/gummy-bears-candy-1000x1000.png' : sweet.name.toLowerCase().includes('kulfi') ? 'https://www.sharmispassions.com/wp-content/uploads/2020/12/26786689323_0853a6524e_o.jpg' : sweet.name.toLowerCase().includes('peda') ? 'https://www.cookclickndevour.com/wp-content/uploads/2016/09/badusha-recipe-a.jpg' : sweet.name.toLowerCase().includes('halwa') ? 'https://www.sharmispassions.com/wp-content/uploads/2015/10/atta-halwa2.jpg' : sweet.name.toLowerCase().includes('kheer') ? 'https://i0.wp.com/onewholesomemeal.com/wp-content/uploads/2019/02/GUr-Waali-Kheer_Insta2.jpg?w=864&ssl=1' : 'https://sinfullyspicy.com/wp-content/uploads/2014/10/1-4.jpg'}
          alt={sweet.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement!;
            const fallback = document.createElement('div');
            fallback.className = 'text-6xl font-bold text-purple-600';
            fallback.textContent = sweet.name.charAt(0);
            parent.appendChild(fallback);
          }}
        />
      </div>
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {sweet.name}
          </h3>
          <span className="text-lg font-semibold text-amber-800">
            ₹{sweet.price}
          </span>
        </div>
        
        {sweet.category && (
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {sweet.category}
          </span>
        )}
        
        {sweet.description && (
          <p className="text-sm text-gray-900 mb-3 line-clamp-2">{sweet.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          {sweet.quantity !== undefined && (
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isOutOfStock 
                  ? 'bg-red-100 text-red-800' 
                  : currentStock <= 5 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
              }`}>
                {isOutOfStock ? '❌ Out of stock' : `📦 ${currentStock} left`}
              </span>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-100 flex gap-3">
        {!showAdminControls ? (
          // Customer view - Cart controls
          <div className="flex-1">
            {cartQuantity === 0 ? (
              <button
                type="button"
                disabled={isOutOfStock || isLoading}
                onClick={() => {
                  addToCart(sweet);
                  setCurrentStock(prev => prev - 1);
                }}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                  isOutOfStock || isLoading
                    ? "bg-gray-900 text-gray-900 cursor-not-allowed"
                    : "btn-gradient"
                }`}
              >
                {isOutOfStock ? "❌ Out of stock" : isLoading ? "⏳ Adding..." : "🛒 Add to Cart"}
              </button>
            ) : (
              <div className="flex gap-2">
                <div className="flex items-center justify-between bg-purple-100 rounded-lg p-2 flex-1">
                  <button
                    onClick={() => {
                      setCurrentStock(prev => prev + 1);
                      updateQuantity(sweet._id!, cartQuantity - 1);
                    }}
                    disabled={false}
                    className={`w-6 h-6 rounded-full font-bold text-sm ${
                      'bg-white text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    -
                  </button>
                  <span className="font-bold text-purple-700 text-sm">{cartQuantity}</span>
                  <button
                    onClick={() => {
                      if (currentStock <= 0) {
                        setError('No more stock available');
                        return;
                      }
                      setCurrentStock(prev => prev - 1);
                      updateQuantity(sweet._id!, cartQuantity + 1);
                    }}
                    disabled={currentStock <= 0}
                    className={`w-6 h-6 rounded-full font-bold text-sm ${
                      currentStock <= 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    +
                  </button>
                </div>
                <Link
                  to="/cart"
                  className="flex-1 py-2 px-3 bg-amber-800 text-white rounded-lg font-semibold hover:bg-amber-900 transition-colors text-sm text-center"
                >
                  🛒
                </Link>
              </div>
            )}
          </div>
        ) : null}

        {showAdminControls && (
          <>
            {onRestock && (
              <button
                type="button"
                disabled={isLoading}
                onClick={handleRestockClick}
                className="px-4 py-3 rounded-lg border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-bold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                📦 Restock
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                disabled={isLoading}
                onClick={handleDeleteClick}
                className="px-4 py-3 rounded-lg border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white font-bold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🗑️ Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SweetCard;
